import { Link } from "wouter";
import logoPath from "@assets/Group 4_1760483541444.png";

export default function Footer() {
  return (
    <footer className="bg-accent/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <li><Link href="/aprender" className="text-muted-foreground hover:text-primary transition-colors">Guia de 5 Passos</Link></li>
              <li><Link href="/aprender/acoes" className="text-muted-foreground hover:text-primary transition-colors">Ações</Link></li>
              <li><Link href="/aprender/titulos" className="text-muted-foreground hover:text-primary transition-colors">Títulos do Tesouro</Link></li>
              <li><Link href="/aprender/teste" className="text-muted-foreground hover:text-primary transition-colors">Teste de Risco</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produtos/acoes" className="text-muted-foreground hover:text-primary transition-colors">Ações BODIVA</Link></li>
              <li><Link href="/produtos/titulos" className="text-muted-foreground hover:text-primary transition-colors">Títulos do Tesouro</Link></li>
              <li><Link href="/produtos/fundos" className="text-muted-foreground hover:text-primary transition-colors">Fundos</Link></li>
              <li><Link href="/produtos/ipo" className="text-muted-foreground hover:text-primary transition-colors">Radar de IPO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/simular" className="text-muted-foreground hover:text-primary transition-colors">Calculadoras</Link></li>
              <li><Link href="/intermediarios" className="text-muted-foreground hover:text-primary transition-colors">Intermediários</Link></li>
              <li><Link href="/noticias" className="text-muted-foreground hover:text-primary transition-colors">Notícias</Link></li>
              <li><Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre o Mbongo</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Mbongo. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link>
            <Link href="/termos" className="hover:text-primary transition-colors">Termos</Link>
            <a 
              href="https://bodiva.ao" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              BODIVA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
