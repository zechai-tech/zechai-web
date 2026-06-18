"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling past 90% of the viewport height (second section)
      if (window.scrollY > window.innerHeight * 0.9) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Initial check
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Franchise", href: "#why-zechai" },
    { name: "Locations", href: "#locations" },
    { name: "Contact", href: "#enquiry-form" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnquireScroll = () => {
    setIsOpen(false);
    const element = document.querySelector("#enquiry-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed left-1/2 top-5 z-[100] flex items-center justify-between w-[92%] max-w-4xl bg-[#F2E8C4] py-2.5 px-7 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-[#E8401C]/10"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            {/* Logo slot - clean brand logo */}
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="font-medium text-[#1A1A1A] hover:text-[#E8401C] transition-colors duration-200 font-semibold"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <button
                onClick={handleEnquireScroll}
                className="bg-[#E8401C] text-[#F2E8C4] font-display font-extrabold py-2.5 px-6 rounded-full transition-all duration-200 hover:scale-103 hover:bg-[#cf3515] active:scale-95 shadow-[0_4px_12px_rgba(232,64,28,0.15)] cursor-pointer"
              >
                Enquire Now
              </button>
            </div>

            {/* Hamburger Button - Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-[#1A1A1A] hover:text-[#E8401C] focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black md:hidden"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm z-[120] bg-[#F2E8C4] shadow-warm p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-[#1A1A1A] hover:text-[#E8401C]"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col space-y-6 flex-grow">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-display text-2xl font-bold text-[#1A1A1A] hover:text-[#E8401C] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-[#E8401C]/15">
                <button
                  onClick={handleEnquireScroll}
                  className="w-full bg-[#E8401C] text-[#F2E8C4] font-display text-lg font-bold py-3.5 px-6 rounded-full transition-all hover:bg-[#cf3515]"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
