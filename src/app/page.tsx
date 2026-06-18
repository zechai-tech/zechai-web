import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyZechai from "@/components/WhyZechai";
import About from "@/components/About";
import MenuStrip from "@/components/MenuStrip";
import Locations from "@/components/Locations";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WhyZechai />
        <About />
        <MenuStrip />
        <Locations />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}

