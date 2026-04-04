export type Category = "Car" | "Watch" | "Travel" | "Beauty" | "Real Estate" | "Finance";

export interface Author {
  name: string;
  role: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  category: Category;
  author: Author;
  supervisor?: Author;
  publishedAt: string;
  readTime: number;
  heroImage: string;
  featured?: boolean;
  tags?: string[];
}
