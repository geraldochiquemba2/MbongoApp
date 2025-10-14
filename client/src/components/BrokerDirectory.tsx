import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

//todo: remove mock functionality
const brokers = [
  {
    name: "Banco BAI",
    type: "Banco Comercial",
    phone: "+244 222 638 900",
    email: "investimentos@bancobai.ao",
    address: "Luanda, Talatona"
  },
  {
    name: "Banco BIC",
    type: "Banco Comercial",
    phone: "+244 226 430 100",
    email: "mercados@bancobic.ao",
    address: "Luanda, Maianga"
  },
  {
    name: "Finibanco Angola",
    type: "Banco de Investimento",
    phone: "+244 222 700 300",
    email: "trading@finibanco.ao",
    address: "Luanda, Ilha"
  },
  {
    name: "Ango Securities",
    type: "Sociedade Corretora",
    phone: "+244 222 123 456",
    email: "info@angosecurities.ao",
    address: "Luanda, Miramar"
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
              className="hover-elevate transition-all duration-200"
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
                  data-testid={`button-contact-${index}`}
                >
                  Quero Começar com {broker.name.split(' ')[broker.name.split(' ').length - 1]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
