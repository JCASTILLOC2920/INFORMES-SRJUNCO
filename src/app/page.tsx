import dynamic from "next/dynamic";
import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";

const SpecializedServices = dynamic(() => import("@/components/public/SpecializedServices"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50" />
});
const Services = dynamic(() => import("@/components/public/Services"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50" />
});
const WhyUs = dynamic(() => import("@/components/public/WhyUs"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50" />
});
const Footer = dynamic(() => import("@/components/public/Footer"), {
  ssr: true,
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-50" />
});

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
