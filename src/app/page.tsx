import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import SpecializedServices from "@/components/public/SpecializedServices";
import Services from "@/components/public/Services";
import WhyUs from "@/components/public/WhyUs";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <Hero />
      <SpecializedServices />
      <Services />
      <WhyUs />
      <Footer />
    </main>
  );
}
