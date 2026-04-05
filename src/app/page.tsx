import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ui/ArticleCard";
import { getAllArticles } from "@/lib/data";

export const dynamic = "force-dynamic";

const categories = [
  { name: "Car", ja: "クルマ", icon: "◈" },
  { name: "Watch", ja: "時計", icon: "◎" },
  { name: "Travel", ja: "旅", icon: "◉" },
  { name: "Beauty", ja: "美容", icon: "◇" },
  { name: "Real Estate", ja: "不動産", icon: "◆" },
  { name: "Finance", ja: "資産", icon: "◈" },
];

export default async function HomePage() {
  const allArticles = await getAllArticles();
  const featuredArticles = allArticles.filter((a) => a.featured);
  const featured = featuredArticles.length > 0 ? featuredArticles : allArticles;
  const [hero, ...subFeatured] = featured;

  if (!hero) return null;
  const recentArticles = allArticles.slice(3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src={hero.heroImage}
          alt={hero.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          {/* Catchphrase */}
          <p className="font-noto text-base/70 text-xs tracking-widest mb-8 uppercase">
            上質な消費には、上質な情報がいる。
          </p>

          <Link href={`/articles/${hero.slug}`} className="group block max-w-3xl">
            <span className="font-dm text-[10px] tracking-widest2 text-gold uppercase">
              {hero.category}
            </span>
            <h1 className="font-cormorant text-3xl md:text-5xl text-base font-light leading-tight mt-2 group-hover:text-gold transition-colors duration-300">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="font-noto text-sm text-base/60 mt-2">{hero.subtitle}</p>
            )}
            <p className="font-noto text-sm text-base/50 mt-4 leading-relaxed line-clamp-2 max-w-xl">
              {hero.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="font-dm text-xs tracking-widest text-gold uppercase">
                Read Article
              </span>
              <span className="text-gold text-lg group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Strip */}
      <section className="border-y border-gold/20 bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-gold/20">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/articles?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center py-6 gap-1 hover:bg-gold/5 transition-colors"
              >
                <span className="font-dm text-xs tracking-widest text-muted group-hover:text-gold transition-colors uppercase">
                  {cat.name}
                </span>
                <span className="font-noto text-[10px] text-muted/60">{cat.ja}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-1">
              Featured
            </p>
            <h2 className="font-cormorant text-2xl font-light">注目の記事</h2>
          </div>
          <Link
            href="/articles"
            className="font-dm text-xs tracking-widest text-muted hover:text-gold transition-colors uppercase flex items-center gap-2"
          >
            All Articles <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subFeatured.map((article) => (
            <ArticleCard key={article.id} article={article} variant="large" />
          ))}
        </div>
      </section>

      {/* Divider with tagline */}
      <section className="py-16 border-y border-gold/15">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-cormorant text-xl md:text-2xl font-light text-ink leading-relaxed">
            1,000万円の買い物に、口コミサイトは使わない。
          </p>
          <p className="font-noto text-xs text-muted mt-4 leading-loose">
            それでも、信頼できる情報源はどこにあるのか。
          </p>
          <div className="w-8 h-px bg-gold mx-auto mt-6" />
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-1">
              Latest
            </p>
            <h2 className="font-cormorant text-2xl font-light">最新記事</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-3 font-dm text-xs tracking-widest uppercase border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-base transition-all duration-300"
          >
            記事一覧を見る
          </Link>
        </div>
      </section>

      {/* About Strip */}
      <section className="bg-ink py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-6">
            About Authena
          </p>
          <p className="font-cormorant text-2xl md:text-3xl font-light text-base leading-relaxed">
            実際に所有し、体験し続けている者の視点から。
          </p>
          <p className="font-noto text-sm text-base/50 mt-6 leading-loose">
            1,000万円の買い物に、口コミサイトは使わない。それでも、信頼できる情報源はどこにあるのか。Authenaは、実際に所有し、体験し続けている者の視点から、富裕層の意志決定に必要な情報だけを届けるメディアです。
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-gold/40" />
            <p className="font-dm text-[10px] tracking-widest text-gold uppercase">
              Operated by Luminage Inc.
            </p>
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>
      </section>
    </>
  );
}
