import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import QuickGuide from "@/components/QuickGuide";
import ProductCards from "@/components/ProductCards";
import SavingsCalculator from "@/components/SavingsCalculator";
import BrokerDirectory from "@/components/BrokerDirectory";
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
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ferramentas de Simulação
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Planeie os seus investimentos com calculadoras inteligentes
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <SavingsCalculator />
            </div>
          </div>
        </div>
        <BrokerDirectory />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
