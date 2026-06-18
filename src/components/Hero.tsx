"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const handleScrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#F2E8C4] min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-grain">
      {/* Subtle Cup Silhouette Watermark Pattern in slightly darker warm gold/tan */}
      <div className="absolute right-[-10%] bottom-[-5%] w-[600px] h-[600px] opacity-[0.25] pointer-events-none select-none text-[#e2d6ae]">
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full rotate-[-12deg]"
        >
          {/* A stylized Kerala Kattan/Kulhad Chai cup */}
          <path d="M25 40h50l-8 45H33L25 40z" />
          <path d="M22 35h56v5H22v-5z" />
          {/* Steam lines */}
          <path
            d="M38 12c1 3-2 5-1 8M50 8c1.5 4-3 7-1.5 11M62 12c1 3-2 5-1 8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute left-[-5%] top-[15%] w-[400px] h-[400px] opacity-[0.18] pointer-events-none select-none text-[#e2d6ae]">
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full rotate-[45deg]"
        >
          <path d="M25 40h50l-8 45H33L25 40z" />
          <path d="M22 35h56v5H22v-5z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          {/* Animated Brand Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-[#E8401C] text-[#F2E8C4] font-display font-extrabold px-4 py-1.5 rounded-full text-sm md:text-base mb-6 shadow-md"
          >
            ☕ ONE CUP EVERY DAY
          </motion.div>

          {/* Huge display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] tracking-tight leading-[1.05] mb-6"
          >
            Own a Chai Business That <span className="underline decoration-[#E8401C] decoration-8 underline-offset-8">Actually Moves</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-[#1A1A1A]/85 font-medium max-w-2xl leading-relaxed mb-10"
          >
            Join Kerala's fastest-growing chai franchise. Street-smart. Proven model. Built to scale. Sourcing, operations, and support handled by our expert crew.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            <button
              onClick={() => handleScrollTo("#enquiry-form")}
              className="bg-[#E8401C] text-[#F2E8C4] font-display font-extrabold text-lg py-4 px-8 rounded-[8px] transition-all hover:scale-103 hover:bg-[#cf3515] hover:shadow-[0_12px_36px_rgba(232,64,28,0.25)] active:scale-95 text-center cursor-pointer"
            >
              Apply for Franchise
            </button>
            <button
              onClick={() => handleScrollTo("#about")}
              className="border-2 border-[#E8401C] text-[#E8401C] font-display font-extrabold text-lg py-4 px-8 rounded-[8px] transition-all hover:bg-[#E8401C]/5 hover:scale-103 active:scale-95 text-center cursor-pointer"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
