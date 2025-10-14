import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrokerDirectory from "@/components/BrokerDirectory";
import ThemeToggle from "@/components/ThemeToggle";
import { Building2 } from "lucide-react";

export default function OndeComprarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      <main 
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://clamper.com.br/wp-content/themes/clamper/assets/img/img_onde_comprar_localizador.jpg')`
        }}
      >
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Building2 className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
                Onde Comprar
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Bancos e corretoras autorizadas pela CMC para intermediação na BODIVA
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BrokerDirectory />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
