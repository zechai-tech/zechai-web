import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Zé Chai Franchise | Own a Chai Business That Actually Moves",
  description: "Join Kerala's fastest-growing chai franchise. Street-smart, proven model, built to scale. Sourcing, playbook, and support included.",
  icons: {
    icon: "/zechai-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F2E8C4] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}

