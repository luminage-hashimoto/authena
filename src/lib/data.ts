import { Article } from "@/types";
import { articles as dummyArticles } from "./articles";

const useNotion = !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);

export async function getAllArticles(): Promise<Article[]> {
  if (useNotion) {
    try {
      const { getArticlesFromNotion } = await import("./notion");
      const articles = await getArticlesFromNotion();
      if (articles.length > 0) return articles;
    } catch (e) {
      console.error("[Notion] getAllArticles failed:", e);
    }
  }
  return dummyArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (useNotion) {
    try {
      const { getArticleFromNotion } = await import("./notion");
      const article = await getArticleFromNotion(slug);
      if (article) return article;
    } catch (e) {
      console.error("[Notion] getArticleBySlug failed:", e);
    }
  }
  return dummyArticles.find((a) => a.slug === slug);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.category === category);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.featured);
}
