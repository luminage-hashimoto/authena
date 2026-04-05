/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article, Category } from "@/types";

const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

async function notionFetch(endpoint: string, body?: object) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion API error: ${res.status} ${err}`);
  }
  return res.json();
}

function getText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t: any) => t.plain_text).join("");
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "url") return prop.url ?? "";
  if (prop.type === "number") return String(prop.number ?? 0);
  if (prop.type === "checkbox") return String(prop.checkbox);
  if (prop.type === "date") return prop.date?.start ?? "";
  if (prop.type === "multi_select") return prop.multi_select.map((s: any) => s.name).join(",");
  return "";
}

async function getTableRows(blockId: string): Promise<string> {
  const data = await notionFetch(`/blocks/${blockId}/children`);
  const rows = data.results ?? [];
  const htmlRows = rows.map((row: any, i: number) => {
    const cells = row.table_row?.cells ?? [];
    const tag = i === 0 ? "th" : "td";
    const cols = cells.map((cell: any) =>
      `<${tag}>${cell.map((t: any) => t.plain_text).join("")}</${tag}>`
    ).join("");
    return `<tr>${cols}</tr>`;
  });
  return `<table>${htmlRows.join("")}</table>`;
}

async function getPageContent(pageId: string): Promise<string> {
  const data = await notionFetch(`/blocks/${pageId}/children`);
  const blocks = data.results ?? [];

  const richText = (items: any[]) =>
    items.map((t: any) => {
      let text = t.plain_text;
      if (t.annotations?.bold) text = `<strong>${text}</strong>`;
      if (t.annotations?.italic) text = `<em>${text}</em>`;
      return text;
    }).join("");

  const htmlParts: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "heading_1":
        htmlParts.push(`<h2>${richText(block.heading_1.rich_text)}</h2>`);
        break;
      case "heading_2":
        htmlParts.push(`<h2>${richText(block.heading_2.rich_text)}</h2>`);
        break;
      case "heading_3":
        htmlParts.push(`<h3>${richText(block.heading_3.rich_text)}</h3>`);
        break;
      case "paragraph": {
        const text = richText(block.paragraph.rich_text);
        if (text) htmlParts.push(`<p>${text}</p>`);
        break;
      }
      case "bulleted_list_item":
        htmlParts.push(`<p>・${richText(block.bulleted_list_item.rich_text)}</p>`);
        break;
      case "numbered_list_item":
        htmlParts.push(`<p>${richText(block.numbered_list_item.rich_text)}</p>`);
        break;
      case "quote":
        htmlParts.push(`<blockquote>${richText(block.quote.rich_text)}</blockquote>`);
        break;
      case "divider":
        htmlParts.push(`<hr>`);
        break;
      case "table": {
        const tableHtml = await getTableRows(block.id);
        htmlParts.push(tableHtml);
        break;
      }
      default:
        break;
    }
  }

  return htmlParts.join("\n");
}

export async function getArticlesFromNotion(): Promise<Article[]> {
  const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "PublishedAt", direction: "descending" }],
  });

  const articles: Article[] = [];

  for (const page of data.results ?? []) {
    const props = page.properties;
    const body = await getPageContent(page.id);
    const tagsRaw = getText(props["Tags"]);

    articles.push({
      id: page.id,
      slug: getText(props["Slug"]),
      title: getText(props["Title"]),
      subtitle: getText(props["Subtitle"]) || undefined,
      excerpt: getText(props["Excerpt"]),
      body,
      category: getText(props["Category"]) as Category,
      author: {
        name: getText(props["Author"]) || "Authena編集部",
        role: "編集部",
      },
      supervisor: getText(props["Supervisor"])
        ? {
            name: getText(props["Supervisor"]),
            role: getText(props["SupervisorRole"]) || "監修",
          }
        : undefined,
      publishedAt: getText(props["PublishedAt"]),
      readTime: Number(getText(props["ReadTime"])) || 5,
      heroImage: getText(props["HeroImage"]),
      featured: getText(props["Featured"]) === "true",
      tags: tagsRaw ? tagsRaw.split(",").map((t: string) => t.trim()) : [],
    });
  }

  return articles;
}

export async function getArticleFromNotion(slug: string): Promise<Article | undefined> {
  const articles = await getArticlesFromNotion();
  return articles.find((a) => a.slug === slug);
}
