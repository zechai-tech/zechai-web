"use client";

import { motion } from "framer-motion";

export default function Locations() {
  const outlets = [
    {
      city: "Kozhikode",
      status: "OPEN",
      address: "8XC8+6QW, Manassery, Thazhecode, Kerala 673602",
      phone: "8156880089",
      hours: "3:00 PM – 12:00 AM",
    },
    {
      city: "Kannur",
      status: "OPEN",
      address: "29VC+4X6, Taliparamba - Iritty Rd, Taliparamba, Kerala 670141",
      phone: "8086052565",
      hours: "3:00 PM – 12:00 AM",
    },
    {
      city: "Palakkad",
      status: "OPEN",
      address: "Shornur Rd, near Prabha hotel, Devi Nagar East-West Colony, Nurani, Palakkad, Kerala 678004",
      phone: "8129129031",
      hours: "3:00 PM – 12:00 AM",
    },
    {
      city: "Lakshadweep",
      status: "COMING_SOON",
      address: "Kavaratti Island, Beach Road",
      phone: "Coming Soon",
      hours: "Coming Soon",
    },
    {
      city: "Malappuram",
      status: "COMING_SOON",
      address: "X6FC+XWP, Junction, Perinthalmanna, Kerala 679322",
      phone: "Coming Soon",
      hours: "Coming Soon",
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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="locations" className="py-24 bg-[#F2E8C4] relative overflow-hidden bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E8401C] font-display font-extrabold text-lg tracking-wider mb-2 block">
            OUR LOCATIONS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8401C] mb-4">
            Where We're Brewing
          </h2>
          <p className="text-lg text-[#1A1A1A]/80 font-medium">
            Franchise territories opening across Kerala — claim yours before it's gone.
          </p>
        </div>

        {/* Location Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch"
        >
          {outlets.map((outlet, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#fdfaf0] rounded-[24px] overflow-hidden border border-[#E8401C]/15 shadow-warm flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(232,64,28,0.12)] transition-shadow duration-300"
            >
              {/* Card Header (Orange) */}
              <div className="bg-[#E8401C] p-5 flex items-center justify-between text-white bg-grain select-none">
                <h3 className="font-display text-2xl font-bold text-[#F2E8C4]">
                  {outlet.city}
                </h3>
                
                {/* Steaming cup SVG icon in cream */}
                <svg
                  className="w-7 h-7 text-[#F2E8C4] opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-white/70">
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center">
                    {outlet.status === "OPEN" ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                        Open Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-base select-none mt-0.5">📍</span>
                    <div>
                      <span className="block text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest mb-0.5">Address</span>
                      <span className="text-[#1A1A1A] text-sm font-semibold leading-relaxed block">{outlet.address}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-base select-none mt-0.5">📞</span>
                    <div>
                      <span className="block text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest mb-0.5">Phone</span>
                      <span className={`text-sm font-semibold ${outlet.status === "COMING_SOON" ? "text-[#1A1A1A]/40 italic" : "text-[#1A1A1A]"}`}>
                        {outlet.status === "OPEN" ? `+91 ${outlet.phone}` : "Coming Soon"}
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-base select-none mt-0.5">🕒</span>
                    <div>
                      <span className="block text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest mb-0.5">Hours</span>
                      <span className={`text-sm font-semibold ${outlet.status === "COMING_SOON" ? "text-[#1A1A1A]/40 italic" : "text-[#1A1A1A]"}`}>
                        {outlet.status === "OPEN" ? outlet.hours : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 pt-4 border-t border-[#E8401C]/10">
                  {outlet.status === "OPEN" ? (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(outlet.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] font-display font-extrabold py-3 px-4 rounded-[8px] transition-all hover:scale-103 active:scale-95 shadow-[0_4px_12px_rgba(232,64,28,0.12)] cursor-pointer text-center block text-sm"
                    >
                      Get Directions
                    </a>
                  ) : (
                    <button
                      onClick={() => alert(`We'll notify you when Zé Chai opens in ${outlet.city}! ☕`)}
                      className="w-full border-2 border-[#E8401C] text-[#E8401C] hover:bg-[#E8401C]/5 font-display font-extrabold py-2.5 px-4 rounded-[8px] transition-all hover:scale-103 active:scale-95 text-center block text-sm cursor-pointer"
                    >
                      Notify Me
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Warning notification block below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 bg-[#E8401C]/10 border border-[#E8401C]/25 rounded-full px-6 py-2">
            <span className="animate-ping w-2 h-2 rounded-full bg-[#E8401C]" />
            <p className="text-sm font-bold text-[#E8401C]">
              Territory allocations are closing fast. Secure your region now.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
