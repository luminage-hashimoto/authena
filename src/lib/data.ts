import { Article } from "@/types";
import { articles as dummyArticles } from "./articles";

const useNotion = !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);

export async function getAllArticles(): Promise<Article[]> {
  if (useNotion) {
    const { getArticlesFromNotion } = await import("./notion");
    return getArticlesFromNotion();
  }
  return dummyArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (useNotion) {
    const { getArticleFromNotion } = await import("./notion");
    return getArticleFromNotion(slug);
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
