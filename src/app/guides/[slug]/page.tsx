import { notFound } from "next/navigation";
import { GuideDetail, GuideContent } from "@/components/guide/GuideDetail";

const guidesDatabase: Record<string, GuideContent> = {
  "api-integration": {
    slug: "api-integration",
    category: "BEGINNER API GUIDE",
    title: "Zero-Friction DeepSeek V4 Official API Setup Guide",
    readTime: "4 MIN READ",
    updatedAt: "AUG 1, 2026",
    summary: "This step-by-step tutorial guides beginners and developers through registering an official DeepSeek account, generating your first API Key, configuring base URLs, and handling rate limits.",
    toc: [
      { id: "step-1", label: "Step 1: Sign Up & Generate API Key" },
      { id: "step-2", label: "Step 2: Configure Environment Variables" },
      { id: "step-3", label: "Step 3: Test API Connection" },
      { id: "step-4", label: "Step 4: Handling 429 Rate Limits" }
    ],
    steps: [
      {
        num: "01",
        title: "Sign Up & Generate API Key",
        description: "Navigate to the official DeepSeek API Portal (platform.deepseek.com). Create your account, verify your email, and go to 'API Keys' -> 'Create new secret key'. Save your key securely.",
        note: "Never commit your API key directly into git repositories! Store it in `.env.local`."
      },
      {
        num: "02",
        title: "Configure Environment Variables",
        description: "Set your environment variable `DEEPSEEK_API_KEY` in your terminal or inside your project's `.env.local` file.",
        code: `export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"`
      },
      {
        num: "03",
        title: "Test API Connection (Python / OpenAI SDK)",
        description: "DeepSeek V4 API is 100% OpenAI compatible. You can use the standard `openai` library simply by changing the `base_url` to `https://api.deepseek.com/v1`.",
        code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com/v1"
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello DeepSeek V4!"}]
)

print(response.choices[0].message.content)`
      },
      {
        num: "04",
        title: "Handling 429 Rate Limits with Exponential Backoff",
        description: "During peak hours, high-concurrency requests might trigger a 429 (Too Many Requests) response. Implement simple retries with exponential backoff.",
        note: "Using tenacity or standard backoff libraries ensures 99.99% request delivery without crashing your server."
      }
    ],
    nextGuide: {
      title: "V4 Flash Token Pricing & Cost Benchmark",
      slug: "pricing-strategy"
    }
  },

  "pricing-strategy": {
    slug: "pricing-strategy",
    category: "COST EFFICIENCY",
    title: "DeepSeek V4 Flash Token Pricing & Cost Benchmark",
    readTime: "6 MIN READ",
    updatedAt: "AUG 1, 2026",
    summary: "Learn how DeepSeek V4 Flash charges for input and output tokens, and compare real-world API bills against GPT-4o and Claude 3.5 Sonnet.",
    toc: [
      { id: "step-1", label: "Step 1: Understanding Token Pricing" },
      { id: "step-2", label: "Step 2: Cost Benchmark vs GPT-4o" },
      { id: "step-3", label: "Step 3: Best Budget Practices" }
    ],
    steps: [
      {
        num: "01",
        title: "Understanding Token Pricing ($0.07 / 1M Input)",
        description: "DeepSeek V4 Flash offers one of the lowest token prices in the industry. Input tokens cost $0.07 per 1M, while output tokens cost $0.28 per 1M.",
        note: "Context caching automatically reduces input costs by 50% for repeated system prompts."
      },
      {
        num: "02",
        title: "Cost Benchmark vs OpenAI & Anthropic",
        description: "For 50 Million Tokens per month: GPT-4o costs ~$125.00/mo, Claude 3.5 Sonnet costs ~$150.00/mo, while DeepSeek V4 Flash costs only ~$3.50/mo.",
        code: `# Cost comparison for 50M Tokens
DeepSeek V4 Flash: $3.50 USD
OpenAI GPT-4o:     $125.00 USD
Claude 3.5 Sonnet: $150.00 USD`
      },
      {
        num: "03",
        title: "Best Budget Practices",
        description: "Always specify max_tokens in your API payload and use system prompts effectively to avoid unnecessary token consumption."
      }
    ],
    prevGuide: {
      title: "Zero-Friction DeepSeek V4 Official API Setup Guide",
      slug: "api-integration"
    },
    nextGuide: {
      title: "Connecting DeepSeek V4 Flash to Cursor & Cline IDE",
      slug: "cursor-setup"
    }
  },

  "cursor-setup": {
    slug: "cursor-setup",
    category: "CURSOR & IDE",
    title: "Connecting DeepSeek V4 Flash to Cursor & Cline IDE",
    readTime: "5 MIN READ",
    updatedAt: "AUG 1, 2026",
    summary: "A step-by-step tutorial on configuring Cursor IDE and VS Code extensions to use DeepSeek V4 Flash for ultra-fast inline code completion.",
    toc: [
      { id: "step-1", label: "Step 1: Open Cursor Settings" },
      { id: "step-2", label: "Step 2: Add Custom OpenAI Base URL" },
      { id: "step-3", label: "Step 3: Test Code Completion" }
    ],
    steps: [
      {
        num: "01",
        title: "Open Cursor Settings",
        description: "Open Cursor IDE, press `Cmd + ,` (or `Ctrl + ,`), and navigate to `Cursor Settings` -> `Models`.",
        note: "Make sure you have Cursor updated to version 0.30 or higher."
      },
      {
        num: "02",
        title: "Add Custom OpenAI Base URL",
        description: "Under OpenAI API Key, toggle 'Override OpenAI Base URL' and type `https://api.deepseek.com/v1`. Then paste your DeepSeek API Key into the OpenAI Key field.",
        code: `Base URL: https://api.deepseek.com/v1
Model Name: deepseek-v4-flash`
      },
      {
        num: "03",
        title: "Test Code Completion",
        description: "Open any project file and press `Cmd + K` or `Ctrl + K`. Type a prompt such as 'Create a Next.js button component'. DeepSeek V4 Flash will generate response in sub-300ms."
      }
    ],
    prevGuide: {
      title: "DeepSeek V4 Flash Token Pricing & Cost Benchmark",
      slug: "pricing-strategy"
    }
  }
};

export async function generateStaticParams() {
  return Object.keys(guidesDatabase).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guidesDatabase[slug];

  if (!guide) {
    notFound();
  }

  return <GuideDetail guide={guide} />;
}
