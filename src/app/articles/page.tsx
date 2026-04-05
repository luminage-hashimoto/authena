import { Metadata } from "next";
import ArticleCard from "@/components/ui/ArticleCard";
import { getAllArticles, getArticlesByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

const categories = ["Car", "Watch", "Travel", "Beauty", "Real Estate", "Finance"];

export const metadata: Metadata = {
  title: "記事一覧",
  description: "Authenaの全記事一覧。Car / Watch / Travel / Beauty / Real Estate / Finance",
};

interface Props {
  searchParams: { category?: string };
}

export default async function ArticlesPage({ searchParams }: Props) {
  const activeCategory = searchParams.category;
  const articles = activeCategory
    ? await getArticlesByCategory(activeCategory)
    : await getAllArticles();

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-gold/20 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-2">
            {activeCategory ? activeCategory : "All"}
          </p>
          <h1 className="font-cormorant text-3xl md:text-4xl font-light">
            {activeCategory ? activeCategory : "記事一覧"}
          </h1>
          <p className="font-noto text-sm text-muted mt-2">
            {articles.length}本の記事
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-[73px] z-40 bg-base border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            <a
              href="/articles"
              className={`font-dm text-[10px] tracking-widest uppercase px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                !activeCategory
                  ? "border-gold text-gold"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              All
            </a>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/articles?category=${encodeURIComponent(cat)}`}
                className={`font-dm text-[10px] tracking-widest uppercase px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "border-gold text-gold"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-2xl font-light text-muted">
              記事が見つかりませんでした
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
