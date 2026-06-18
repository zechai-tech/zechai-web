"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#E8401C]/10 bg-white select-none">
      <Image
        src="/zechai-logo.png"
        alt="Zé Chai"
        fill
        className="object-cover"
        priority
        sizes="48px"
      />
    </div>
  );
}
