import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavingsCalculator from "@/components/SavingsCalculator";
import ThemeToggle from "@/components/ThemeToggle";
import { Calculator } from "lucide-react";

export default function SimulatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6">
                <Calculator className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Ferramentas de Simulação
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Planeie os seus investimentos com calculadoras inteligentes
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SavingsCalculator />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
