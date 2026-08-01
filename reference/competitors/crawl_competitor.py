#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
crawl_competitor.py — 竞争站内容爬取器（竞争研究用，礼貌限速）
用法: python crawl_competitor.py <base_url> <output_dir> [--limit N]
输出: output_dir/pages/<slug>.md（每页标题/摘要/正文/链接）+ output_dir/index.csv（汇总表）
依赖: requests, beautifulsoup4（建议 venv）
"""
import sys, os, re, csv, time, json, html as htmllib
from urllib.parse import urlparse, urljoin, unquote
import requests
from bs4 import BeautifulSoup

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
HEADERS = {"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"}
SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def fetch(url, timeout=25, tries=3):
    for i in range(tries):
        try:
            r = SESSION.get(url, timeout=timeout)
            if r.status_code == 200:
                return r
        except requests.RequestException:
            pass
        time.sleep(2 * (i + 1))
    return None


def get_sitemap_urls(base, outfile):
    """从 sitemap_index.xml 递归收集所有 URL（post/page/custom）"""
    idx = ["sitemap_index.xml", "sitemap.xml", "sitemap-index.xml", "sitemapindex.xml"]
    urls, seen = [], set()
    for name in idx:
        r = fetch(urljoin(base + "/", name))
        if r and ("xml" in r.headers.get("Content-Type", "") or "<" in r.text[:500]):
            soup = BeautifulSoup(r.text, "html.parser")
            locs = [l.get_text(strip=True) for l in soup.find_all("loc")]
            if locs:
                for loc in locs:
                    if loc in seen:
                        continue
                    seen.add(loc)
                    if "sitemap" in loc and loc.endswith(".xml") and not loc.endswith("sitemap_index.xml"):
                        sub = fetch(loc)
                        if sub:
                            sub_soup = BeautifulSoup(sub.text, "html.parser")
                            urls.extend(l.get_text(strip=True) for l in sub_soup.find_all("loc") if l.get_text(strip=True).startswith("http"))
                    elif loc.startswith("http"):
                        urls.append(loc)
                break
    urls = list(dict.fromkeys(urls))  # 去重保序
    with open(outfile, "w", encoding="utf-8") as f:
        f.write("\n".join(urls))
    print(f"[sitemap] 收集到 {len(urls)} 个 URL -> {outfile}")
    return urls


def clean_text(s):
    return re.sub(r"\s+", " ", s).strip()


def extract_links(soup, base_host, url):
    internal, external = [], []
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("javascript:"):
            continue
        anchor = clean_text(a.get_text())
        full = urljoin(url, href)
        host = urlparse(full).netloc
        if host == base_host:
            internal.append((full, anchor))
        else:
            external.append((full, anchor))
    return internal, external


def render_body(article):
    """把 article 内容转成简化 markdown（h2/h3、段落、列表、代码块、表格、链接）"""
    out = []
    for el in article.find_all(["h2", "h3", "h4", "p", "li", "pre", "table", "blockquote", "img", "a"], recursive=True):
        # 跳过嵌套元素（只处理顶层）
        if el.parent and el.parent.name in ("h2", "h3", "h4", "p", "li", "pre", "table", "blockquote"):
            continue
        if el.name in ("h2", "h3", "h4"):
            level = "#" * (int(el.name[1]) + 1)
            txt = clean_text(el.get_text())
            if txt:
                out.append(f"\n{level} {txt}")
        elif el.name == "p":
            txt = clean_text(el.get_text())
            if txt:
                out.append(txt)
        elif el.name == "li":
            txt = clean_text(el.get_text())
            if txt:
                out.append(f"- {txt}")
        elif el.name == "pre":
            code = el.get_text("\n")
            out.append(f"\n```\n{code.strip()}\n```")
        elif el.name == "table":
            rows = []
            for tr in el.find_all("tr"):
                cells = [clean_text(td.get_text()) for td in tr.find_all(["td", "th"])]
                if cells:
                    rows.append(" | ".join(cells))
            if rows:
                out.append("\n" + "\n".join(rows))
        elif el.name == "blockquote":
            txt = clean_text(el.get_text())
            if txt:
                out.append(f"\n> {txt}")
        elif el.name == "img":
            alt = el.get("alt") or ""
            src = el.get("src") or ""
            out.append(f"\n![{alt}]({src})")
    return "\n\n".join(out)


def parse_page(url, base_host):
    r = fetch(url)
    if not r:
        return None
    soup = BeautifulSoup(r.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript", "form", "aside"]):
        tag.decompose()

    title = clean_text(soup.title.get_text()) if soup.title else ""
    meta = soup.find("meta", attrs={"name": "description"})
    desc = meta.get("content", "").strip() if meta else ""
    canon = soup.find("link", rel="canonical")
    canonical = canon.get("href", "").strip() if canon else url

    pub = soup.find("meta", attrs={"property": "article:published_time"})
    mod = soup.find("meta", attrs={"property": "article:modified_time"})
    published = pub.get("content", "").strip() if pub else ""
    modified = mod.get("content", "").strip() if mod else ""
    section = soup.find("meta", attrs={"property": "article:section"})
    category = section.get("content", "").strip() if section else ""

    article = soup.find("article") or soup.find("main") or soup.find("div", class_=re.compile("entry-content|post-content|content")) or soup
    body_md = render_body(article)
    # 字数统计（正文 + 标题）
    all_text = clean_text(article.get_text(" "))
    wordcount = len(all_text.split())

    h1 = clean_text(article.find("h1").get_text()) if article.find("h1") else ""
    h2s = [clean_text(h.get_text()) for h in article.find_all("h2")][:40]
    h3s = [clean_text(h.get_text()) for h in article.find_all("h3")][:40]
    code_blocks = len(article.find_all("pre"))
    internal, external = extract_links(soup, base_host, url)

    return {
        "url": url, "title": title, "desc": desc, "canonical": canonical,
        "published": published, "modified": modified, "category": category,
        "h1": h1, "h2s": h2s, "h3s": h3s, "wordcount": wordcount,
        "code_blocks": code_blocks, "internal_links": internal,
        "external_links": external, "body": body_md,
    }


def slugify(url, base):
    path = urlparse(url).path
    if path in ("", "/"):
        return "home"
    parts = [p for p in path.split("/") if p and p not in ("category", "tag", "author")]
    name = unquote(parts[-1]) if parts else "page"
    return re.sub(r"[^a-zA-Z0-9_-]", "-", name)[:80] or "page"


def save_md(page, outdir):
    slug = slugify(page["url"], None)
    fm = []
    fm.append(f"# {page['title']}")
    fm.append("")
    fm.append(f"- **URL**: {page['url']}")
    fm.append(f"- **Published**: {page['published']}")
    fm.append(f"- **Modified**: {page['modified']}")
    fm.append(f"- **Category**: {page['category']}")
    fm.append(f"- **Word count**: {page['wordcount']}")
    fm.append(f"- **Code blocks**: {page['code_blocks']}")
    if page["desc"]:
        fm.append(f"- **Description**: {page['desc']}")
    fm.append("")
    fm.append("## H1")
    fm.append(page["h1"] or "")
    if page["h2s"]:
        fm.append("\n## H2 目录")
        for h in page["h2s"]:
            fm.append(f"- {h}")
    fm.append("\n## 正文")
    fm.append(page["body"])
    if page["internal_links"]:
        fm.append("\n## 内部链接")
        for u, a in page["internal_links"][:30]:
            fm.append(f"- [{a or '(no anchor)'}]({u})")
    if page["external_links"]:
        fm.append("\n## 外部链接")
        for u, a in page["external_links"][:20]:
            fm.append(f"- [{a or '(no anchor)'}]({u})")
    with open(os.path.join(outdir, slug + ".md"), "w", encoding="utf-8") as f:
        f.write("\n".join(fm))
    return slug


def main():
    base = sys.argv[1].rstrip("/")
    outdir = sys.argv[2]
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])
    pages_dir = os.path.join(outdir, "pages")
    os.makedirs(pages_dir, exist_ok=True)
    base_host = urlparse(base).netloc

    urls_file = os.path.join(outdir, "urls.txt")
    urls = get_sitemap_urls(base, urls_file)
    if not urls:
        print("[!] sitemap 为空，尝试从首页解析链接")
        r = fetch(base)
        if r:
            soup = BeautifulSoup(r.text, "html.parser")
            urls = [urljoin(base, a["href"]) for a in soup.find_all("a", href=True) if urlparse(urljoin(base, a["href"])).netloc == base_host]
            urls = list(dict.fromkeys(urls))
    if limit:
        urls = urls[:limit]

    rows, done, fail = [], 0, []
    for i, u in enumerate(urls):
        try:
            page = parse_page(u, base_host)
            if not page:
                fail.append((u, "fetch-fail"))
                continue
            slug = save_md(page, pages_dir)
            rows.append({
                "url": u, "slug": slug, "title": page["title"], "category": page["category"],
                "published": page["published"], "wordcount": page["wordcount"],
                "code_blocks": page["code_blocks"], "internal_links": len(page["internal_links"]),
                "external_links": len(page["external_links"]),
            })
            done += 1
            print(f"[{done}/{len(urls)}] {page['wordcount']:>5}w {page['category'][:18]:<18} {page['title'][:55]}")
        except Exception as e:
            fail.append((u, str(e)))
        time.sleep(0.3)

    with open(os.path.join(outdir, "index.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["url", "slug", "title", "category", "published", "wordcount", "code_blocks", "internal_links", "external_links"])
        w.writeheader()
        w.writerows(rows)
    print(f"\n✅ 完成: {done} 页成功, {len(fail)} 页失败")
    for u, e in fail[:15]:
        print(f"   FAIL {u}: {e}")
    print(f"📁 输出: {outdir}/pages/*.md + index.csv")


if __name__ == "__main__":
    main()
