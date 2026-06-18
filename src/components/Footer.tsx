"use client";

import Logo from "./Logo";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#140f0e] text-white pt-16 pb-8 border-t border-[#E8401C]/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <div className="mb-4 self-start inline-block">
              <Logo />
            </div>
            <p className="text-[#F2E8C4] font-display text-xl font-bold mb-4">
              "One Cup Every Day"
            </p>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Elevating Kerala's street tea culture into a scalable, high-performing QSR franchise network. Built to move, designed to grow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#E8401C] mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, "#about")}
                  className="text-gray-400 hover:text-[#E8401C] transition-colors text-sm font-medium"
                >
                  About Zé Chai
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleScrollTo(e, "#menu")}
                  className="text-gray-400 hover:text-[#E8401C] transition-colors text-sm font-medium"
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#why-zechai"
                  onClick={(e) => handleScrollTo(e, "#why-zechai")}
                  className="text-gray-400 hover:text-[#E8401C] transition-colors text-sm font-medium"
                >
                  Franchise Model
                </a>
              </li>
              <li>
                <a
                  href="#locations"
                  onClick={(e) => handleScrollTo(e, "#locations")}
                  className="text-gray-400 hover:text-[#E8401C] transition-colors text-sm font-medium"
                >
                  Store Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#E8401C] mb-4 uppercase tracking-wider">
              Connect With Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://instagram.com/zechai.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-[#F2E8C4] border border-white/10 px-4 py-2.5 rounded-[8px] transition-all text-sm font-bold shadow-md hover:scale-103 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @zechai.in
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                <span className="block font-bold text-[#E8401C] uppercase text-xs tracking-wider mb-1">Franchise Inquiry</span>
                <span className="font-semibold text-white">hello@zechai.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <p className="text-gray-500 text-xs font-medium">
            copyright © Zé Chai 2025. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-medium">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
