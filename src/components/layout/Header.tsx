"use client";

import Link from "next/link";
import { useState } from "react";

const categories = ["Car", "Watch", "Travel", "Beauty", "Real Estate", "Finance"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-base border-b border-gold/20 sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <p className="font-dm text-[10px] tracking-widest2 text-muted uppercase">
            Operated by Luminage Inc.
          </p>
          <p className="font-dm text-[10px] tracking-widest2 text-muted uppercase hidden md:block">
            Luxury Intelligence for the Discerning
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-cormorant text-3xl tracking-widest text-ink font-light leading-none group-hover:text-gold transition-colors duration-300">
            Authena
          </span>
          <span className="font-noto text-[9px] tracking-widest3 text-gold mt-0.5">
            オーセナ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/articles?category=${encodeURIComponent(cat)}`}
              className="font-dm text-xs tracking-widest text-muted hover:text-gold transition-colors duration-200 uppercase"
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span
            className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-gold/20 bg-base">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/articles?category=${encodeURIComponent(cat)}`}
                className="font-dm text-xs tracking-widest text-muted hover:text-gold transition-colors uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
