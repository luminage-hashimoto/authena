import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";

interface Props {
  article: Article;
  variant?: "default" | "large" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (variant === "large") {
    return (
      <Link href={`/articles/${article.slug}`} className="group block">
        <div className="relative overflow-hidden aspect-[16/9]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="font-dm text-[10px] tracking-widest2 text-gold uppercase">
              {article.category}
            </span>
            <h2 className="font-cormorant text-2xl md:text-3xl text-base font-light mt-2 leading-snug">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="font-noto text-xs text-base/60 mt-1">{article.subtitle}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-noto text-sm text-muted leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="font-dm text-[10px] tracking-wide text-muted">
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-gold/40">—</span>
            <span className="font-dm text-[10px] tracking-wide text-muted">
              {article.readTime} min read
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-4">
        <div className="relative overflow-hidden w-20 h-20 flex-shrink-0">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-dm text-[9px] tracking-widest text-gold uppercase">
            {article.category}
          </span>
          <h3 className="font-cormorant text-base text-ink font-light leading-tight mt-0.5 line-clamp-2 group-hover:text-gold transition-colors">
            {article.title}
          </h3>
          <p className="font-dm text-[10px] text-muted mt-1">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="font-dm text-[9px] tracking-widest bg-gold text-base px-2 py-1 uppercase">
            {article.category}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-cormorant text-xl text-ink font-light leading-snug group-hover:text-gold transition-colors duration-200">
          {article.title}
        </h3>
        {article.subtitle && (
          <p className="font-noto text-[11px] text-muted mt-1">{article.subtitle}</p>
        )}
        <p className="font-noto text-sm text-muted leading-relaxed mt-2 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gold/10">
          <span className="font-dm text-[10px] tracking-wide text-muted">
            {formatDate(article.publishedAt)}
          </span>
          <span className="text-gold/40">·</span>
          <span className="font-dm text-[10px] tracking-wide text-muted">
            {article.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
