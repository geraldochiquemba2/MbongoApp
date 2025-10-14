import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const brokers = [
  {
    name: "Banco BAI",
    type: "Banco Comercial",
    phone: "+244 222 638 900",
    email: "investimentos@bancobai.ao",
    address: "Luanda, Talatona",
    url: "https://www.bancobai.ao/pt/particulares/produtos/investimento"
  },
  {
    name: "Banco BIC",
    type: "Banco Comercial",
    phone: "+244 226 430 100",
    email: "mercados@bancobic.ao",
    address: "Luanda, Maianga",
    url: "https://www.bancobic.ao"
  },
  {
    name: "Banco Atlântico",
    type: "Banco Comercial",
    phone: "+244 222 639 000",
    email: "investimentos@atlantico.ao",
    address: "Luanda, Marginal",
    url: "https://www.atlantico.ao/pt/investimentos-e-poupanca/aprender-a-investir/como-investir"
  },
  {
    name: "Banco Económico",
    type: "Banco Comercial",
    phone: "+244 222 676 700",
    email: "mercados@be.co.ao",
    address: "Luanda, Maculusso",
    url: "https://www.be.co.ao"
  },
  {
    name: "Banco Sol",
    type: "Banco Comercial",
    phone: "+244 222 638 600",
    email: "investimentos@bancosol.ao",
    address: "Luanda, Ingombota",
    url: "https://www.bancosol.ao"
  },
  {
    name: "Standard Bank Angola",
    type: "Banco Comercial Internacional",
    phone: "+244 222 638 800",
    email: "trading@standardbank.co.ao",
    address: "Luanda, Kinaxixi",
    url: "https://www.standardbank.co.ao/angola/pt/Grandes-Empresas/Mercado-de-Capitais"
  },
  {
    name: "Access Bank Angola",
    type: "Banco de Investimento",
    phone: "+244 222 700 300",
    email: "info@angola.accessbankplc.com",
    address: "Luanda, Ilha",
    url: "https://angola.accessbankplc.com"
  },
  {
    name: "Banco Prestígio",
    type: "Banco Comercial",
    phone: "+244 222 642 000",
    email: "investir@bancoprestigio.ao",
    address: "Luanda, Talatona",
    url: "https://www.bancoprestigio.ao"
  },
  {
    name: "BFA - Banco de Fomento Angola",
    type: "Banco Comercial",
    phone: "+244 222 638 500",
    email: "investimentos@bfa.ao",
    address: "Luanda, Ingombota",
    url: "https://www.bfa.ao"
  },
  {
    name: "Banco Comercial Angolano",
    type: "Banco Comercial",
    phone: "+244 222 397 700",
    email: "geral@bca.ao",
    address: "Luanda, Maianga",
    url: "https://www.bca.ao"
  }
];

export default function BrokerDirectory() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Onde Comprar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bancos e corretoras autorizadas pela CMC para intermediação na BODIVA
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {brokers.map((broker, index) => (
            <Card 
              key={index} 
              className="bg-transparent backdrop-blur-sm hover-elevate transition-all duration-200 border-2"
              data-testid={`card-broker-${index}`}
            >
              <CardHeader>
                <CardTitle className="font-heading text-xl">{broker.name}</CardTitle>
                <CardDescription>{broker.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>{broker.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="break-all">{broker.email}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>{broker.address}</span>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="default"
                  onClick={() => window.open(broker.url, '_blank')}
                  data-testid={`button-contact-${index}`}
                >
                  <span>Quero Começar com {broker.name.split(' ')[broker.name.split(' ').length - 1]}</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
