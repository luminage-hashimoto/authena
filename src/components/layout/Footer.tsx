import Link from "next/link";

const categories = ["Car", "Watch", "Travel", "Beauty", "Real Estate", "Finance"];

export default function Footer() {
  return (
    <footer className="bg-ink text-base/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="font-cormorant text-2xl tracking-widest text-base font-light">
                Authena
              </p>
              <p className="font-noto text-[9px] tracking-widest3 text-gold mt-0.5">
                オーセナ
              </p>
            </div>
            <p className="font-noto text-xs leading-relaxed text-base/50 mt-4">
              上質な消費には、上質な情報がいる。
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-4">
              Categories
            </p>
            <nav className="flex flex-col gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/articles?category=${encodeURIComponent(cat)}`}
                  className="font-dm text-xs tracking-wide text-base/50 hover:text-gold transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <p className="font-dm text-[10px] tracking-widest2 text-gold uppercase mb-4">
              About
            </p>
            <p className="font-noto text-xs leading-loose text-base/50">
              1,000万円の買い物に、口コミサイトは使わない。それでも、信頼できる情報源はどこにあるのか。Authenaは、実際に所有し、体験し続けている者の視点から、富裕層の意志決定に必要な情報だけを届けるメディアです。
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-base/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-dm text-[10px] tracking-widest text-base/30 uppercase">
            Operated by Luminage Inc.
          </p>
          <p className="font-dm text-[10px] tracking-widest text-base/30 uppercase">
            © {new Date().getFullYear()} Authena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
