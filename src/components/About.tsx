"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !cupRef.current) return;

    const card = cardRef.current;
    const cup = cupRef.current;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cardCenterX = rect.width / 2;
    const cardCenterY = rect.height / 2;

    // Calculate offset coordinates capped at 30px max offset
    const x = ((mouseX - cardCenterX) / rect.width) * 30;
    const y = ((mouseY - cardCenterY) / rect.height) * 30;

    // Apply translation + slight rotation for magnetic tilt effect
    cup.style.transition = "transform 0.15s ease-out";
    cup.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.3}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cupRef.current) return;
    const cup = cupRef.current;
    
    // Smoothly return cup to center
    cup.style.transition = "transform 0.4s ease-out";
    cup.style.transform = "translate(0px, 0px) rotate(0deg)";
  };

  return (
    <section id="about" className="py-24 bg-[#F2E8C4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-[#E8401C] font-display font-extrabold text-lg tracking-wider mb-3">
              ABOUT ZÉ CHAI
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
              A Street-Smart Chai Culture Built to Scale
            </h2>
            <div className="space-y-6 text-[#1A1A1A]/85 text-lg leading-relaxed font-normal">
              <p>
                Zé Chai was born on the bustling streets of Kerala with a simple mission: to elevate the humble cup of chai into an experience that brings people together, every single day. We are not just another tea shop — we are a QSR (Quick Service Restaurant) brand designed for the energetic, the fast-paced, and the inclusive.
              </p>
              <p>
                Our philosophy is simple: **Co-own and Grow**. We don't look at our franchise owners merely as vendors buying a system; we partner with you, sharing our playbook, supply chain, and local insights to scale success together.
              </p>
            </div>

            {/* Founder Quote Card - Set to light cream for contrast on beige bg */}
            <div className="mt-8 p-6 bg-[#fdfaf0] rounded-[20px] border border-[#E8401C]/15 shadow-[0_8px_25px_rgba(232,64,28,0.04)] relative">
              <span className="absolute text-6xl text-[#E8401C]/15 font-serif left-4 top-2 select-none">“</span>
              <p className="font-medium text-[#1A1A1A] italic relative z-10 pl-6 leading-relaxed">
                Zé Chai represents the street-smart hustle of Kerala. We wanted to build a business that actually moves, where local partners can co-own the brand with us and create sustainable, profitable community hubs.
              </p>
              <div className="mt-4 pl-6">
                <span className="block font-display font-extrabold text-[#E8401C]">_kaif_muhammad</span>
                <span className="text-sm text-[#1A1A1A]/60 font-medium">Founder, Zé Chai</span>
              </div>
            </div>
          </motion.div>

          {/* Right Orange Block Column - Kept as a bold accent */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[400px] aspect-[4/5] bg-[#E8401C] rounded-[24px] shadow-warm flex flex-col justify-between p-8 overflow-hidden group bg-grain cursor-pointer"
            >
              {/* Decorative SVG lines inside orange block */}
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none group-hover:scale-105 transition-transform duration-700">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Tag / Text at top of block */}
              <div className="relative z-10 self-start bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                <span className="text-[#F2E8C4] font-display font-extrabold text-xs tracking-wider">
                  ESTD. KERALA
                </span>
              </div>

              {/* Huge Custom SVG Styled Chai Cup */}
              <div className="relative z-10 flex flex-col items-center my-auto">
                <div
                  ref={cupRef}
                  className="will-change-transform"
                >
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-40 h-40 drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] text-[#F2E8C4] animate-pulse"
                  >
                    {/* Steaming Kerala Chai Glass outline & fill */}
                    <path
                      d="M30 40 L70 40 L60 88 L40 88 Z"
                      fill="currentColor"
                    />
                    {/* Chai line liquid inside */}
                    <path
                      d="M32.5 50 L67.5 50 L60 88 L40 88 Z"
                      fill="#C93213"
                      opacity="0.8"
                    />
                    {/* Glass rim */}
                    <ellipse cx="50" cy="40" rx="20" ry="4" fill="currentColor" />
                    {/* Glass ridges / stripes */}
                    <line x1="45" y1="46" x2="45" y2="82" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    <line x1="50" y1="46" x2="50" y2="82" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    <line x1="55" y1="46" x2="55" y2="82" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    
                    {/* Steam */}
                    <path
                      d="M45 28 C45 22 49 20 49 14 M52 28 C52 20 56 18 56 12 M40 28 C40 24 43 23 43 18"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="mt-4 font-display text-2xl font-bold text-[#F2E8C4] tracking-wider">
                  One Cup Every Day
                </span>
              </div>

              {/* Bottom tag line */}
              <div className="relative z-10 self-center text-center">
                <span className="text-[#F2E8C4] font-display text-lg font-bold">
                  Street-Smart. Scalable.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
