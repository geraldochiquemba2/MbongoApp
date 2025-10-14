import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/Group 4_1760481692280.png";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Início" },
    { path: "/aprender", label: "Aprender" },
    { path: "/simular", label: "Simular" },
    { path: "/onde-comprar", label: "Onde Comprar" },
    { path: "/noticias", label: "Notícias" },
  ];

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1 -ml-2" onClick={handleNavClick}>
            <img src={logoPath} alt="Mbongo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.path ? "text-primary" : "text-foreground"
                }`}
                onClick={handleNavClick}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="default" size="default" data-testid="button-comecar">
              Quero Começar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover-elevate rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick();
                }}
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button className="w-full" variant="default" data-testid="button-mobile-comecar">
                Quero Começar
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
