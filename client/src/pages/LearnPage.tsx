import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiskQuiz from "@/components/RiskQuiz";
import AIAssistant from "@/components/AIAssistant";
import ThemeToggle from "@/components/ThemeToggle";
import { GraduationCap } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      <main 
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.borainvestir.b3.com.br/borainvestir/2022/07/28115421/quatro-pessoas-discutindo.jpg.webp')`
        }}
      >
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
                Aprenda a Investir
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Descubra o seu perfil de investidor e aprenda sobre os produtos disponíveis
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-white">
                Assistente IA de Investimentos
              </h2>
              <p className="text-white/90">
                Faça perguntas sobre investimentos e receba respostas personalizadas
              </p>
            </div>
            <AIAssistant />
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-white">
                Teste de Perfil de Risco
              </h2>
              <p className="text-white/90">
                Responda 3 perguntas simples e descubra que tipo de investimento combina consigo
              </p>
            </div>
            <RiskQuiz />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
