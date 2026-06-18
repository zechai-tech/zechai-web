"use client";

import { motion } from "framer-motion";

export default function WhyZechai() {
  const cards = [
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
          <path d="M4 20s2-2 6-2 6 2 6 2" />
          <circle cx="10" cy="12" r="4" />
          <path d="M22 20s2-2 6-2" />
          <circle cx="24" cy="12" r="4" />
          <path d="M18 24l4-4 4 4" />
        </svg>
      ),
      title: "Franchise Support",
      description: "Full onboarding, training & ops manual from day one to ensure your team is ready.",
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
          <path d="M16 3s6 2 6 12l-6 6-6-6c0-10 6-12 6-12z" />
          <path d="M10 15l-4 4 2 6 4-2" />
          <path d="M22 15l4 4-2 6-4-2" />
          <circle
            cx="16"
            cy="14"
            r="2"
            className="fill-[#E8401C] group-hover:fill-[#F2E8C4] transition-colors duration-300"
          />
        </svg>
      ),
      title: "Scalable Model",
      description: "Designed to grow. Seamlessly transition from 1 outlet to multiple locations.",
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
          <polyline points="4,24 12,14 18,18 28,8" />
          <polyline points="22,8 28,8 28,14" />
          <line x1="4" y1="28" x2="28" y2="28" />
        </svg>
      ),
      title: "Fast ROI",
      description: "Proven unit economics. Typical break-even timeline ranges between 8–12 months.",
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
          <path d="M4 16l4-4h6l4 4h6l4-4" />
          <path d="M8 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        </svg>
      ),
      title: "Co-own With Us",
      description: "We grow together, not just as a vendor. Shared growth philosophy from day one.",
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
          <rect x="4" y="4" width="24" height="26" rx="2" />
          <line x1="10" y1="12" x2="22" y2="12" />
          <line x1="10" y1="17" x2="22" y2="17" />
          <polyline points="10,22 13,25 18,20" />
        </svg>
      ),
      title: "Proven Playbook",
      description: "Battle-tested systems, billing, marketing, and operations across Kerala.",
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
          <rect x="2" y="8" width="18" height="14" rx="1" />
          <path d="M20 12h6l4 6v4h-10V12z" />
          <circle
            cx="8"
            cy="24"
            r="2"
            className="fill-[#E8401C] group-hover:fill-[#F2E8C4] transition-colors duration-300"
          />
          <circle
            cx="24"
            cy="24"
            r="2"
            className="fill-[#E8401C] group-hover:fill-[#F2E8C4] transition-colors duration-300"
          />
        </svg>
      ),
      title: "Supply Chain Included",
      description: "Sourcing handled centrally. Direct access to our signature tea blends and ingredients.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="why-zechai" className="py-24 bg-[#F2E8C4] relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8401C] mb-4">
            Why Partner with Zé Chai?
          </h2>
          <p className="text-lg text-[#1A1A1A]/80 font-medium">
            We've built a system that minimizes risk, maximizes velocity, and captures the vibrant spirit of Kerala's tea culture.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-[#FAF5E8] p-8 rounded-[20px] border border-[rgba(232,64,28,0.12)] flex flex-col items-start transition-all duration-300 hover:border-[#E8401C] hover:shadow-[0_4px_24px_rgba(232,64,28,0.15)] group"
            >
              {/* SVG wrapper - w-52 h-52 beige container centered */}
              <div className="flex items-center justify-center bg-[#F2E8C4] rounded-[12px] p-2.5 w-[52px] h-[52px] mb-5 transition-colors duration-300 group-hover:bg-[#E8401C]">
                {card.icon}
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">
                {card.title}
              </h3>
              <p className="text-[#1A1A1A]/75 font-normal leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
