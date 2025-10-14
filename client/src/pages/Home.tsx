import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import QuickGuide from "@/components/QuickGuide";
import ProductCards from "@/components/ProductCards";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <QuickGuide />
        <ProductCards />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
