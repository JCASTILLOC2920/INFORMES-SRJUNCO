'use client';

import dynamic from "next/dynamic";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

const LogisticsTracker = dynamic(() => import("@/components/public/LogisticsTracker"), { ssr: false });
const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"), { ssr: false });

export default function SeguimientoClientWrapper() {
  return (
    <>
      <Header />
      <div className="pt-32 pb-20">
        <LogisticsTracker />
      </div>
      <Footer />
      <ChatbotVictoria />
    </>
  );
}
