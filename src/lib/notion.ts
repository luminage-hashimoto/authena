/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { Article, Category } from "@/types";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// MarkdownをシンプルなHTMLに変換
function mdToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .split(/\n\n+/)
    .map((block) => {
      if (block.startsWith("<h")) return block;
      if (block.trim() === "") return "";
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

// Notionのプロパティからテキストを取得するヘルパー
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

export async function getArticlesFromNotion(): Promise<Article[]> {
  const dataSourceId = process.env.NOTION_DATABASE_ID!;

  const response = await (notion as any).dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "PublishedAt", direction: "descending" }],
  });

  const articles: Article[] = [];

  for (const page of response.results) {
    if (page.object !== "page") continue;
    const props = (page as any).properties;

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);
    const body = mdToHtml(mdString.parent);

    const tagsRaw = getText(props["Tags"]);
    const tags = tagsRaw ? tagsRaw.split(",").map((t: string) => t.trim()) : [];

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
      tags,
    });
  }

  return articles;
}

export async function getArticleFromNotion(slug: string): Promise<Article | undefined> {
  const articles = await getArticlesFromNotion();
  return articles.find((a) => a.slug === slug);
}
