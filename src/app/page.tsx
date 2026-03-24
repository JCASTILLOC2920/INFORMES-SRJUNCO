import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import Services from "@/components/public/Services";
import WhyUs from "@/components/public/WhyUs";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Footer />
    </main>
  );
}
