"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function MenuStrip() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      icon: (
        <svg
          className="w-8 h-8 stroke-[#E8401C] group-hover:stroke-[#F2E8C4] transition-colors duration-300"
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 14h16v10a4 4 0 01-4 4H10a4 4 0 01-4-4V14z" />
          <path d="M22 17h2a3 3 0 010 6h-2" />
          <path d="M10 6c0-2 2-2 2-4M14 6c0-2 2-2 2-4M18 6c0-2 2-2 2-4" />
        </svg>
      ),
      name: "Chai Classics",
      description: "Signature cardamom milk tea, black Kattan, and traditional Kerala tea brews.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 stroke-[#E8401C] group-hover:stroke-[#F2E8C4] transition-colors duration-300"
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 14l2-8M16 14V6M24 14l-2-8" />
          <path d="M6 14h20l-2 14H8L6 14z" />
        </svg>
      ),
      name: "Zé Beast Loaded Fries",
      description: "Crispy double-fried potatoes loaded with street spices & house-made hot sauces.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 stroke-[#E8401C] group-hover:stroke-[#F2E8C4] transition-colors duration-300"
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 10h16l-2 18H10L8 10z" />
          <line x1="6" y1="10" x2="26" y2="10" />
          <line x1="19" y1="4" x2="14" y2="22" />
        </svg>
      ),
      name: "Cold Beverages",
      description: "Chilled spice-infused iced teas, thick kulhad shakes, and iced cold coffee.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 stroke-[#E8401C] group-hover:stroke-[#F2E8C4] transition-colors duration-300"
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="12" width="24" height="14" rx="2" />
          <path d="M10 12V8a6 6 0 0112 0v4" />
          <line x1="4" y1="19" x2="28" y2="19" />
        </svg>
      ),
      name: "Street Snacks",
      description: "Samosas, bun-omlettes, sweet Kozhikodan bites, and crisp tea cookies.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 stroke-[#E8401C] group-hover:stroke-[#F2E8C4] transition-colors duration-300"
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4h8v6l4 10a4 4 0 01-4 4H12a4 4 0 01-4-4l4-10V4z" />
          <path d="M20 10c2 0 5 1 5 4s-3 4-5 4" />
          <line x1="12" y1="4" x2="20" y2="4" />
        </svg>
      ),
      name: "Special Brews",
      description: "House-only saffron elixir, hot honey-ginger-lemon, and seasonal herbal infusions.",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#F2E8C4] relative overflow-hidden bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#E8401C] font-display font-extrabold text-lg tracking-wider mb-2 block">
              OUR MENU AT A GLANCE
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A]">
              What We're Serving
            </h2>
          </div>
          {/* Scroll indicators/buttons for desktop - Orange styling */}
          <div className="hidden md:flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => handleScroll("left")}
              className="bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] p-3 rounded-full hover:scale-105 transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] p-3 rounded-full hover:scale-105 transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 px-2 custom-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {menuItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex-shrink-0 w-[290px] sm:w-[320px] bg-[#fdfaf0] p-6 rounded-[20px] shadow-[0_8px_25px_rgba(232,64,28,0.06)] border border-[#E8401C]/15 snap-start flex flex-col justify-between group"
            >
              <div>
                {/* SVG wrapper - w-52 h-52 beige container centered */}
                <div className="flex items-center justify-center bg-[#F2E8C4] rounded-[12px] p-2.5 w-[52px] h-[52px] mb-5 transition-colors duration-300 group-hover:bg-[#E8401C]">
                  {item.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">
                  {item.name}
                </h3>
                <p className="text-[#1A1A1A]/75 font-normal text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#E8401C]/10 pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#E8401C] tracking-wide font-display">
                  HIGH DEMAND
                </span>
                <span className="text-[#E8401C] text-sm font-semibold">✨ Hot Item</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
