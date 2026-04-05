import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAllArticles } from "@/lib/data";
import ArticleCard from "@/components/ui/ArticleCard";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.heroImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const related = allArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-6 pb-10 md:pb-14">
            <Link
              href={`/articles?category=${encodeURIComponent(article.category)}`}
              className="font-dm text-[10px] tracking-widest2 text-gold uppercase hover:text-gold-light transition-colors"
            >
              {article.category}
            </Link>
            <h1 className="font-cormorant text-2xl md:text-4xl text-base font-light leading-tight mt-2">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="font-noto text-sm text-base/60 mt-2">{article.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="border-b border-gold/15 bg-base">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="font-dm text-[10px] tracking-widest text-muted uppercase">
              執筆
            </span>
            <span className="font-noto text-xs text-ink">{article.author.name}</span>
          </div>
          {article.supervisor && (
            <div className="flex items-center gap-2">
              <span className="font-dm text-[10px] tracking-widest text-muted uppercase">
                監修
              </span>
              <span className="font-noto text-xs text-ink">
                {article.supervisor.name}（{article.supervisor.role}）
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <span className="font-dm text-[10px] text-muted">
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-gold/40">·</span>
            <span className="font-dm text-[10px] text-muted">
              {article.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Lead */}
        <p className="font-noto text-base md:text-lg text-ink leading-loose border-l-2 border-gold pl-5 mb-12">
          {article.excerpt}
        </p>

        {/* Body */}
        <div
          className="prose-authena"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gold/15 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-dm text-[10px] tracking-wide text-muted border border-gold/30 px-3 py-1 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author box */}
        <div className="mt-10 p-6 border border-gold/20 bg-gold/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="font-cormorant text-gold font-light">A</span>
            </div>
            <div>
              <p className="font-dm text-[10px] tracking-widest text-gold uppercase mb-1">
                Writer
              </p>
              <p className="font-noto text-sm font-medium text-ink">
                {article.author.name}
              </p>
              {article.supervisor && (
                <p className="font-noto text-xs text-muted mt-1">
                  監修：{article.supervisor.name}（{article.supervisor.role}）
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-gold/15 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-1">
                Related
              </p>
              <h2 className="font-cormorant text-2xl font-light">
                {article.category}の記事
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="border-t border-gold/15 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/articles"
            className="font-dm text-xs tracking-widest text-muted hover:text-gold transition-colors uppercase flex items-center gap-2"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </article>
  );
}
