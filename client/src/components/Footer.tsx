import { Link } from "wouter";
import logoPath from "@assets/Group 4_1760483541444.png";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-accent/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 pb-8 border-b">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl font-semibold mb-2">Receba Oportunidades de Investimento</h3>
            <p className="text-muted-foreground mb-6">
              Inscreva-se para receber por email notificações sobre novas oportunidades de investimento no mercado angolano.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logoPath} alt="Mbongo" className="h-8 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma educativa para investir com confiança no mercado angolano.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Aprender</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/aprender" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-guia">Guia de 5 Passos</Link></li>
              <li><Link href="/aprender" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-acoes-aprender">Ações</Link></li>
              <li><Link href="/aprender" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-titulos-aprender">Títulos do Tesouro</Link></li>
              <li><Link href="/aprender" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-teste-risco">Teste de Risco</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/onde-comprar" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-acoes-bodiva">Ações BODIVA</Link></li>
              <li><Link href="/onde-comprar" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-titulos-produtos">Títulos do Tesouro</Link></li>
              <li><Link href="/onde-comprar" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-fundos">Fundos</Link></li>
              <li><Link href="/onde-comprar" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-ipo">Radar de IPO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/simular" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-calculadoras">Calculadoras</Link></li>
              <li><Link href="/onde-comprar" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-intermediarios">Intermediários</Link></li>
              <li><Link href="/noticias" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-noticias">Notícias</Link></li>
              <li><Link href="/" onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-sobre">Sobre o Mbongo</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Mbongo. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/" onClick={scrollToTop} className="hover:text-primary transition-colors" data-testid="link-privacidade">Privacidade</Link>
            <Link href="/" onClick={scrollToTop} className="hover:text-primary transition-colors" data-testid="link-termos">Termos</Link>
            <a 
              href="https://www.bodiva.ao" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              data-testid="link-bodiva"
            >
              BODIVA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
