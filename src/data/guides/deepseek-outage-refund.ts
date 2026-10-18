import type { GuideContent } from "./types";

// target keyword: deepseek refund
// 词族：deepseek compensation / deepseek credit refund / deepseek platform refund /
//       deepseek api refund / deepseek refund policy / deepseek refund reddit /
//       deepseek outage refund
// 事实来源：reference/topics/30-deepseek-outage-oct2026.md
export const deepseekOutageRefund: GuideContent = {
  slug: "deepseek-outage-refund",
  category: "PRICING & COST",
  title: "DeepSeek Outage Refund: The 7-Day Credit Explained",
  seoTitle: "DeepSeek Outage Refund: The 7-Day Credit",
  readTime: "10 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek refunded all API spend from Oct 8-14, 2026 as bonus credit after the Oct 15 outage. How much you get, how it is deducted, and what it never covers.",
  notice:
    "The refund window covers October 8-14, 2026 only, and it lands as bonus credit on API accounts automatically. Nothing to file, nothing to claim[3][4].",
  toc: [
    { id: "step-1", label: "Step 1: What DeepSeek Actually Refunded" },
    { id: "step-2", label: "Step 2: Why It Is the Week Before, Not the Outage" },
    { id: "step-3", label: "Step 3: How to Work Out Your Own Number" },
    { id: "step-4", label: "Step 4: Bonus Credit vs Cash, and the Deduction Order" },
    { id: "step-5", label: "Step 5: Reading Your Billing Page Without Guessing" },
    { id: "step-6", label: "Step 6: What the Refund Does Not Cover" },
    { id: "step-7", label: "Step 7: This Is a Pattern, Not a One-Off" },
    { id: "step-8", label: "Step 8: The Two Things DeepSeek Did Not Say" },
    { id: "step-9", label: "Step 9: What to Do Before the Next Outage" },
    { id: "step-10", label: "Step 10: Your Four-Item Checklist" },
  ],
  steps: [
    {
      num: "01",
      title: "What DeepSeek Actually Refunded",
      description:
        "On October 15, 2026, DeepSeek's chat, App and API services were partially down for 4 hours 52 minutes, hitting the chat product, the V4-Pro API and the V4.1-Flash API at once[8]. That evening the company announced compensation, and the shape of it is unusual enough that most coverage got it wrong[1][4].",
      paragraphs: [
        "The terms, in plain terms: the refund applies to API accounts, and the amount is every dollar of spend on that account between October 8 and October 14, 2026, returned in full as bonus credit[3][4]. The Chinese-language notice carried by The Paper states it directly: spend over the seven days from October 8 to October 14 is returned in full in the form of bonus credit, per account[3].",
        "Three words carry the weight. Per account means the calculation is scoped to the account, not to how long your specific job waited during the incident. Seven days means the window is a calendar week of consumption, which is far more generous than an hour-by-hour pro-rata of a 4 hour 52 minute outage would be. Bonus credit means you get platform credit, in the form of a grant, rather than cash back to your card[3][4].",
        "It is automatic. There is no ticket to open, no form to submit, no support email to send, and no proof of downtime to attach. The grant is applied to the account, and the outage notice itself said DeepSeek had gone through the system and removed various single points of dependency as part of the fix — a statement about reliability, not about the refund mechanism[2][6].",
        "One thing worth stating early, because it determines whether this page is useful to you at all: this is an API compensation. If you only used the free chat web interface or the mobile app, the refund terms as reported describe API account spend, and there is no published cash or credit remedy for chat-only users[3][4]. The rest of this guide is written for people with an API key and a bill.",
      ],
      list: [
        "Who: API accounts, per account rather than per incident[3][4]",
        "What: 100% of spend returned, in the form of bonus credit rather than cash[3][4]",
        "When: consumption from October 8 through October 14, 2026[3]",
        "How: automatic grant, no ticket or claim required[3][4]",
        "Outage duration behind it: 4 hours 52 minutes on October 15, 2026[8]",
      ],
      note: "Treat the notice as the baseline fact and your billing page as the final authority. If the two disagree, the billing page is what you can actually spend.",
    },
    {
      num: "02",
      title: "Why It Is the Week Before, Not the Outage",
      description:
        "The single most common misreading is that DeepSeek paid people for the hours of downtime. It did not. It refunded a full week of spend that happened before the outage, which is a different and much larger concession[3][4][5].",
      paragraphs: [
        "The arithmetic makes the difference obvious. The incident lasted 4 hours 52 minutes, or roughly 2.9% of a week[8]. A duration-based remedy would hand back about 3% of your weekly spend. A window-based remedy hands back all of it. Reported coverage from the developer press described it in exactly these terms: the API was partly down for 4h52m and DeepSeek is refunding a week of spend as credit[5].",
        "There is a logic to refunding the period before the failure. What actually costs you money as a developer is not the 4 hours you could not call the API — it is the work you had queued up against a provider you had budgeted for, and the fact that a five-hour hole forced you to re-plan a week you had already paid for. DeepSeek chose to compensate the week rather than the hole, and the compensation lands as credit, which also means the money stays inside the platform.",
        "The consequence you should internalize: this refund is proportional to your invoice, not to your frustration. If your account spent nothing between October 8 and October 14, you get nothing, because there is no spend to return[3][4]. If your account is dormant, already topped up, or barely used, the refund is zero or near zero regardless of how badly the outage hurt your day.",
        "The reverse is also true. Heavy consumers were the winners here, and reports put individual returns at the level of several thousand yuan for the largest users[3][4]. If you were running batch jobs, agent loops or large-scale evaluation traffic through DeepSeek that week, the grant is real money, not a token apology. If you are a hobbyist, it is a small line item and you should plan your infrastructure accordingly. The refund is a function of your bill, not of the incident.",
      ],
      table: {
        headers: ["Question", "What people assume", "What the terms say"],
        rows: [
          ["What period is refunded?", "The hours the API was down", "Consumption from Oct 8 to Oct 14, 2026[3][4]"],
          ["How is it calculated?", "Downtime hours times hourly rate", "Total account spend in the window, returned in full[3][4]"],
          ["Paid as cash?", "Cash back to payment method", "Bonus credit on the account[3][4]"],
          ["Do I need to claim it?", "File a ticket with proof", "Automatic grant, no claim[3][4]"],
          ["What if I spent nothing?", "Still get something", "Zero, there is no spend to return[3][4]"],
        ],
      },
      note: "If you are comparing this to other providers' outage credits, compare the basis before the number. A credit computed from downtime minutes and a credit computed from a seven-day invoice are not the same unit.",
    },
    {
      num: "03",
      title: "How to Work Out Your Own Number",
      description:
        "You can estimate your refund from a single figure: your API spend on the account between October 8 and October 14, 2026. Call that amount X. Your grant is X, and the only thing that can reduce it is not having spent it in the first place[3][4].",
      paragraphs: [
        "Worked example, small team. Suppose your production account burned X = 180 dollars across the seven days, mostly V4.1-Flash traffic with a slice of V4-Pro for hard tasks. The grant is 180 dollars of bonus credit. If your normal weekly consumption is also around 180 dollars, the practical effect is that the following week costs you nothing out of pocket — you effectively get one week of quota back, after the fact. That is the same as saying your cash runway on this account extends by about one week.",
        "Worked example, large consumer. Suppose X = 4,000 dollars because you were running a batch pipeline plus agent traffic all week. The grant is 4,000 dollars of credit. At that scale, the grant is equivalent to a full month of a mid-sized team's inference budget. Reports of individual returns in the thousands of yuan sit in exactly this range and are consistent with the window-based rule rather than with any per-hour calculation[3][4].",
        "Worked example, light user. Suppose X = 3 dollars. The grant is 3 dollars. This is the case where the refund is administratively real but financially irrelevant, and where building a single-provider dependency on DeepSeek is the more expensive decision than any refund. If you are in this bucket, read Step 9 instead of Step 3.",
        "Worked example, mixed account. Suppose your total was 500 dollars, but 350 of it was paid for by promotional or free credit granted earlier, and 150 came from topped-up cash. Here the published terms stop being specific: the notice describes returning the consumption amount for the window, and does not say whether promotional balance that was consumed inside the window is included in the returned amount. Estimating this case requires your own billing page, not a rule of thumb, and the honest answer is that you should not assume either way. Step 5 covers how to check.",
      ],
      table: {
        headers: ["Window spend (X)", "Bonus credit granted", "Practical meaning if a normal week is also X"],
        rows: [
          ["$3", "$3", "Small line item; refund is not your real problem"],
          ["$50", "$50", "About one week of light production traffic free"],
          ["$180", "$180", "One week of spend returned; runway extends by a week"],
          ["$1,000", "$1,000", "A month of small-team inference budget"],
          ["$4,000", "$4,000", "Several thousand dollars back as usable credit"],
        ],
      },
      note: "Pull X from your usage and billing view over October 8 to October 14 inclusive, then compare it to the credit line that appears on the account. If the two numbers match, the grant is correctly applied. If they do not, the difference is usually promotional balance, which is addressed in Step 8[3][4].",
    },
    {
      num: "04",
      title: "Bonus Credit vs Cash, and the Deduction Order",
      description:
        "Here is the detail with the most practical consequence, and it is the one most write-ups skip. When an account holds both topped-up balance and granted balance, charges are drawn from the granted balance first[3][4].",
      paragraphs: [
        "Read that again in cash-flow terms, because it changes what the refund does for you. The grant sits in a bonus bucket. Every subsequent API call is billed against the bonus bucket before it touches the cash you paid in. So the refund does not put money back on your card — it puts a buffer in front of your money. Your cash balance stays untouched until the bonus credit is exhausted[3][4].",
        "That ordering has three concrete consequences. First, your effective runway extends: if you normally top up monthly and the grant equals a week of spend, your next top-up arrives later than it otherwise would. Second, your cash is preserved rather than returned, which matters if you account for prepaid balance as a real asset on a small team's books — the balance you already paid for is still there, still spendable. Third, the grant is genuinely temporary in effect: it is consumed automatically by your normal traffic, so there is nothing to preserve and no decision to make about when to use it.",
        "The distinction between credit and cash is worth being blunt about. Bonus credit is not withdrawable. It cannot be refunded to a card, it cannot be transferred, and it is only spendable on the platform that granted it. So a 180-dollar grant is not the same as 180 dollars in your bank account; it is 180 dollars of future inference you had already planned to buy. For most teams that is fine, because the spend was going to happen anyway. If your reason for wanting compensation was that you were planning to leave DeepSeek entirely, credit does not serve that goal, and no provider hands out outage compensation in cash.",
        "The ordering rule also means the grant has a natural consumption rate. If your traffic continues at the same level, a grant equal to one week of spend disappears in roughly one week of normal operation. Do not model it as a permanent balance increase. Model it as a delay of your next payment.",
      ],
      table: {
        headers: ["Account state before grant", "Weekly spend", "Grant", "What happens next"],
        rows: [
          ["$0 cash + $0 bonus", "$180", "$180 bonus", "Next $180 of usage is free; top-up is delayed a week"],
          ["$500 cash + $0 bonus", "$180", "$180 bonus", "Cash stays at $500; bonus absorbs usage until exhausted"],
          ["$500 cash + $100 bonus", "$180", "$180 bonus", "Bonus totals $280 and is consumed before any cash is touched"],
          ["$20 cash + $0 bonus", "$3", "$3 bonus", "Bonus covers roughly a week of light traffic"],
        ],
      },
      note: "Because granted balance is spent first, the refund effectively delays your next top-up instead of reducing a past one. If you budget on a monthly cycle, that is the number to put in the plan: your next payment moves out by roughly the size of the grant divided by your weekly burn.",
    },
    {
      num: "05",
      title: "Reading Your Billing Page Without Guessing",
      description:
        "Everything above rests on published terms reported in the press. The authoritative record for your account is your own billing page, and checking it takes about two minutes[3][4].",
      paragraphs: [
        "Start with the consumption figure for the window. Find the usage view, set the range to October 8 through October 14 inclusive, and note the total consumed amount. That figure is X, and it is the number the grant is derived from. Do not estimate X from memory or from a monthly average, because a spike week and a quiet week produce very different grants and the rule is tied to actual consumption, not to a typical week[3][4].",
        "Then find the credit entry. Look for the balance breakdown on the account: a good platform view separates paid balance from granted or bonus balance, and the grant should appear as its own entry with its own amount. Compare that amount to X. If they match, the refund was applied at the stated rule. If the credit is smaller, the most likely explanations are that part of the window was covered by promotional balance, or that some consumption fell outside the window boundary — which is why the boundary check matters more than the total.",
        "Third, check the direction of the deduction. Watch one or two days of normal usage after the grant lands and confirm that the granted balance decreases while the paid balance holds steady. That is the deduction order rule in action, and confirming it once means you can trust your own model of the runway instead of re-deriving it every month[3][4].",
        "Finally, keep a note of the date the grant appeared and its amount. If a provider applies an outage credit and you later dispute a charge or question a balance change, the note is your baseline. It also gives you a factual answer the next time a thread on a forum asks what DeepSeek actually refunded — a claim you can support beats a screenshot of someone else's account.",
      ],
      list: [
        "Set the usage range to Oct 8 through Oct 14 inclusive and read off the consumed total",
        "Record that total as X before you look at any credit entry, so you are not anchored",
        "Locate the granted or bonus balance entry and compare it to X line by line",
        "Confirm the deduction order by watching granted balance fall while paid balance holds",
        "Write down the grant date and amount as your baseline for future disputes",
      ],
      note: "If you see no credit entry at all, check whether the account was active inside the window before assuming the grant was missed. An account with zero consumption between October 8 and October 14 generates a zero grant, not a missing one[3][4].",
    },
    {
      num: "06",
      title: "What the Refund Does Not Cover",
      description:
        "The compensation is generous on its own terms and narrow on purpose. Understanding the boundary tells you which losses were never on the table[3][4][5].",
      paragraphs: [
        "It does not cover the requests your product failed to answer. If your users hit an error during the incident and were served an apology message, the value of that lost interaction — the conversion, the retained session, the promised response — does not come back as credit. The grant returns your inference spend, not your product's outcome. That gap is yours to absorb, and it is the main reason a refund should never be treated as outage insurance.",
        "It does not cover the retry pileup. A five-hour failure window in a system without a circuit breaker produces a queue of retries that all fire when the service returns, and the tokens those redelivered attempts consume are ordinary billable consumption. If your own consumption for the week after the incident spiked because of replay traffic, that spike is not part of the returned window and is not separately credited. In fact, if the retry storm happened to fall between October 8 and October 14 in an earlier incident, it would count as spend and be returned — but for the October 15 incident, the recovery traffic falls outside the window.",
        "It does not cover the cost of engineering time. The hours your team spent diagnosing 5xx responses, flipping to a fallback, validating outputs and replaying failed jobs are real cost and are not compensated by any provider. The same goes for the eval re-run you owe yourself after temporarily routing traffic to a different model, because structured output drifts when the model behind your extraction layer changes.",
        "It does not cover customer-support load or churn. If the outage reached your users, your support queue absorbed the damage, and no credit on the DeepSeek account reduces that. This is the argument for treating single-provider dependency as a cost line of its own: the provider's remedy repairs your account balance, while the incident's real damage lands on your product. Read the refund as a goodwill gesture with a clear boundary, and budget for the part behind the boundary.",
      ],
      list: [
        "Lost user interactions and conversions during the outage: not covered",
        "Retry and replay traffic generated after recovery: not covered by the window rule",
        "Engineering hours spent diagnosing, failing over and validating: never covered",
        "Support load, churn and reputation damage: never covered",
        "Eval re-runs after temporarily routing to another model: on your account",
      ],
      note: "The refund returns your spend; it does not restore your service level. If your product has a customer-facing availability promise, the remedy for the incident has to come from your own architecture, not from the provider's credit line.",
    },
    {
      num: "07",
      title: "This Is a Pattern, Not a One-Off",
      description:
        "If you are deciding how to weigh DeepSeek's reliability, the June 2026 precedent is more informative than the October grant alone. In June 2026, DeepSeek automatically granted bonus credit to accounts after a cache billing system error, covering roughly May 13 to June 9[3][4][5].",
      paragraphs: [
        "Note the shape of that precedent, because it is the same shape as October. The trigger was a billing defect rather than an availability failure, the remedy was an automatic grant with no claim process, the mechanism was bonus credit rather than cash, and the window was a defined calendar range of consumption rather than an hour count. Two very different root causes produced the same remedy design[3][4].",
        "That consistency is the useful signal. It means you can reasonably expect DeepSeek's answer to a future incident to look like this one: an account-scoped, window-based, automatic bonus credit. You should not expect cash, you should not expect per-hour compensation, and you should not expect a support-ticket process — the company has now demonstrated twice that it prefers to fix the balance sheet directly rather than open a claims queue[3][5].",
        "For planning purposes this cuts two ways. The optimistic read is that provable, provider-side mistakes tend to result in credit without argument, which makes deep usage less risky than a strict reading of the uptime numbers suggests. The sober read is that credit is a remedy for spend, not for the dependency, and it arrives after your users have already experienced the incident. A provider that reliably pays you back still leaves you with the reliability exposure.",
        "The operational conclusion is to treat the refund as a partial hedge, and to treat the reliability data as the thing you actually plan on. The status page has shown V4-Pro API uptime around 99.91 percent and V4.1-Flash API around 99.47 percent across the July to October 2026 window, and one media count put the number of incidents since September at thirteen[7]. Those numbers, not the credit policy, are what should drive your fallback design. For the incident-by-incident picture, see [[deepseek-down|the outage tracker]] and [[deepseek-server-busy|the server busy guide]].",
      ],
      note: "The pattern gives you one planning assumption worth writing down: assume outages are compensated in credit on a consumption window, and assume nothing else is compensated at all.",
    },
    {
      num: "08",
      title: "The Two Things DeepSeek Did Not Say",
      description:
        "The published terms are specific about the window, the form and the mechanism, and silent on two questions that matter to anyone modelling the credit. Do not fill the silence with an assumption[3][4].",
      paragraphs: [
        "The first open question is expiry. The notices describe a bonus credit grant and do not state whether the granted balance carries an expiration date or persists indefinitely. Some platforms expire promotional balances after a fixed period, others do not, and DeepSeek has not made the answer explicit in the coverage of the October terms[3][4]. The practical test is your own balance view: if the granted entry shows an expiry date or a note, that governs. If it does not, do not assume it will still be there a year from now, and do not build a plan that depends on spending it slowly.",
        "The second open question is whether free or promotional quota consumed inside the window counts toward the returned amount. The rule as reported is that spend over October 8 to October 14 is returned in full as bonus credit[3]. Whether consumption that was originally covered by an earlier promotional grant is treated as spend for this purpose is not stated. There are plausible arguments in both directions, and the published wording does not settle it.",
        "Given both gaps, the correct posture is the same for each: your billing page is the arbiter, and the safe assumption is the conservative one. Treat the grant as spendable only while you can see it in the balance view, and treat promotional consumption as outside the refund until the credited number on your account proves otherwise. If the credited amount does exceed what you expected from paid spend alone, you have learned that promotional consumption was included — an empirically derived answer that will apply the next time DeepSeek issues a credit.",
        "This is not a criticism of the terms so much as a description of their scope. Outage compensation notices on this scale are written to state what the provider did, not to publish a complete accounting policy, and both of the gaps above are normal for the genre. The failure mode to avoid is the one where a developer reads a confident forum summary, assumes an answer, and budget-plans against it. Assume nothing, read your own page, and you will never be wrong about your own balance.",
      ],
      note: "Two unresolved items, one posture: check the expiry on your granted balance entry, and treat the treatment of promotional consumption as unknown until your own credit figure resolves it[3][4].",
    },
    {
      num: "09",
      title: "What to Do Before the Next Outage",
      description:
        "A refund is a remedy after the fact. The incident itself is the argument for making LLM calls survivable, and the failure pattern here is specific enough to design against[8].",
      paragraphs: [
        "The first rule is that a single provider is a single point of failure, and it is the only point of failure that matters when it fails. Configure a second provider with a different base URL and a different model, and test the path before you need it. A fallback that has never served production traffic is a hypothesis, not a fallback. Provider switching on the client side is the same mechanism that makes multi-model setups manageable at all, and it is what lets you treat an incident as a routing event rather than an outage[5].",
        "The second rule is to fail over only on errors that mean the provider is unavailable. Network-level failures, HTTP 429 and any status of 500 or above are failover candidates. Other 4xx responses are your bug: a malformed request will fail identically on the second provider, and blindly retrying it just doubles your error volume. The [[deepseek-api-error-codes|error codes reference]] lays out which statuses deserve a retry and which deserve a fix.",
        "The third rule is a timeout plus a circuit breaker. A five-hour outage should trip a breaker within minutes, not accumulate a queue of pending requests that all fire on recovery. Set an explicit timeout, cap retries, and let the breaker route traffic to the fallback while the primary is unhealthy. The point of the breaker is not just to preserve availability — it is to prevent the retry pileup that turns one provider's outage into your own traffic spike.",
        "The fourth rule is to own the recovery work. Cache results that can be reproduced, queue non-urgent jobs so they can be replayed deliberately rather than automatically, and record which provider served each request so you can identify the outputs that need review. If you routed traffic to a fallback model for a few hours, re-run your evaluation on the affected slice, because structured output drifts when the model changes and silently drifted extractions are expensive to unpick later[5].",
      ],
      code: `// Fail over only when the provider is the problem,
// and break the circuit before retries become a flood.
const FAILOVER_STATUS = (status) =>
  status === undefined || status === 429 || status >= 500;

async function callWithFallback(request) {
  try {
    return await callPrimary(request, { timeoutMs: 20000, maxRetries: 1 });
  } catch (err) {
    if (!FAILOVER_STATUS(err.status)) throw err; // your bug, fix it
    logFallover({ provider: "primary", status: err.status });
    return await callSecondary(request, { timeoutMs: 20000, maxRetries: 1 });
  }
}`,
      list: [
        "Add a second provider with a different base URL and a different model, and exercise it on real traffic",
        "Fail over on network errors, 429 and 5xx only; fix other 4xx instead of retrying",
        "Set an explicit timeout, cap retries, and trip a breaker in minutes rather than hours",
        "Cache reproducible results and queue non-urgent jobs for deliberate replay",
        "Re-run evals on anything served by the fallback model before you trust the output",
        "Watch the status page and your own error rate instead of waiting for user reports",
      ],
      note: "If you are pricing the fallback, remember that the models on either side of the swap may not cost the same. Check current rates in [[v4-1-flash-pricing|the V4.1 Flash pricing breakdown]] and [[flash-pricing|the V4 Flash pricing guide]] before you assume a failover window is cheap.",
    },
    {
      num: "10",
      title: "Your Four-Item Checklist",
      description:
        "Everything in this guide reduces to four actions, three of which take minutes. Do them in order and the refund stops being a story you read about and becomes a number you know[3][4].",
      list: [
        "Verify the grant: open the billing page, read consumption for Oct 8 through Oct 14 inclusive, and compare it to the credit entry on the account",
        "Remember the deduction order: granted balance is spent before paid balance, so your refund delays the next top-up instead of reducing a past payment",
        "Audit the damage: list the jobs that failed or were replayed during and after the incident, and decide which need a deliberate re-run rather than an automatic retry",
        "Decide on a second provider: if the outage cost you more than the refund is worth, add a fallback path and a circuit breaker before the next incident, not after it",
      ],
      paragraphs: [
        "The one-line summary: DeepSeek returned a week of API spend as usable credit, automatically, on a consumption window rather than an outage duration, and credited it in a form that gets spent before your own money does. That is a genuinely generous remedy for a 4 hour 52 minute incident, and it is also a remedy with a clear boundary — it repairs your invoice, not your availability[3][4][5].",
        "So use it for what it is. Confirm the number on your own page, treat the credit as a delay in your next payment, and spend the saved budget on the fallback path that would have made the incident a routing event instead of an incident. The models and prices you would fail over to are worth checking too: the [[deepseek-v4-1-flash-1017|V4.1-Flash-1017 checkpoint]] is the current Flash line, and the setup details for a second integration path live in [[v4-1-flash-api-setup|the API setup guide]] and [[harness-error-fix|the Harness error fix guide]].",
      ],
      note: "If you arrived here from a forum thread claiming DeepSeek paid people for the downtime hours, the correction is in Step 2: the refund is based on a seven-day consumption window, not on the 4 hour 52 minute incident[3][4][5][8].",
    },
  ],
  prevGuide: { title: "DeepSeek Server Busy: When the API Is Overloaded", slug: "deepseek-server-busy" },
  nextGuide: { title: "DeepSeek API Error Codes Explained", slug: "deepseek-api-error-codes" },
  relatedGuides: [
    { title: "DeepSeek Server Busy: When the API Is Overloaded", slug: "deepseek-server-busy" },
    { title: "DeepSeek API Error Codes Explained", slug: "deepseek-api-error-codes" },
    { title: "DeepSeek Down: Status, Causes and What to Do", slug: "deepseek-down" },
    { title: "DeepSeek V4.1 Flash Pricing: Peak and Off-Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek V4 Flash Pricing: What It Costs per Token", slug: "flash-pricing" },
  ],
  sources: [
    { label: "SCMP: DeepSeek offers user refunds after suffering another major outage", url: "https://www.scmp.com/tech/big-tech/article/3371047/deepseek-offers-user-refunds-after-suffering-another-major-outage" },
    { label: "CGTN: DeepSeek offers compensation after restoring from service outage (Oct 15, 2026)", url: "https://news.cgtn.com/news/2026-10-15/DeepSeek-offers-compensation-after-restoring-from-service-outage-1RgrRBZHn9u/share_amp.html" },
    { label: "The Paper: DeepSeek outage compensation notice, Oct 8-14 spend returned as bonus credit", url: "https://www.thepaper.cn/newsDetail_forward_34257131" },
    { label: "IT之家: DeepSeek outage and compensation coverage", url: "https://www.ithome.com/1/013/533.htm" },
    { label: "dev.to: DeepSeek's API was partly down for 4h52m — it's refunding a week of spend as credit", url: "https://dev.to/gabrielanhaia/deepseeks-api-was-partly-down-for-4h52m-its-refunding-a-week-of-spend-as-credit-3p6j" },
    { label: "explainx: DeepSeek 5-hour API outage and the 7-day credit refund (Oct 15, 2026)", url: "https://explainx.ai/blog/deepseek-5-hour-api-outage-7-day-credit-refund-october-15-2026" },
    { label: "Caixin Global: DeepSeek restores services after nearly five-hour outage", url: "https://www.caixinglobal.com/2026-10-16/deepseek-restores-services-after-nearly-five-hour-outage-102493794.html" },
    { label: "DeepSeek Status: incident record for the October 15, 2026 partial outage", url: "https://status.deepseek.com/incidents/7116348214287" },
  ],
};
