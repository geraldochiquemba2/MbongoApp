import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newspaper, Search, TrendingUp, Clock, ExternalLink } from "lucide-react";
import type { NewsArticle } from "@shared/schema";

export default function NoticiasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: news = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news"],
  });

  const categories = [
    "all",
    ...Array.from(new Set(news.map((article) => article.category))),
  ];

  const filteredNews = news.filter((article) => {
    const matchesSearch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const importantNews = news.filter((article) => article.important === 1).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      
      <main
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80')`
        }}
      >
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Newspaper className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
                Notícias Financeiras
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Acompanhe as últimas novidades do setor financeiro angolano em tempo real
              </p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Pesquisar notícias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/95 backdrop-blur-sm"
                  data-testid="input-search-news"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="shrink-0 bg-background/95 backdrop-blur-sm"
                    data-testid={`button-category-${category}`}
                  >
                    {category === "all" ? "Todas" : category}
                  </Button>
                ))}
              </div>
            </div>

            {importantNews.length > 0 && selectedCategory === "all" && searchTerm === "" && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <h2 className="font-heading text-2xl font-bold text-white">
                    Destaques
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {importantNews.map((article) => (
                    <Card
                      key={article.id}
                      className="hover-elevate transition-all duration-200 bg-card/95 backdrop-blur-sm"
                      data-testid={`card-important-news-${article.id}`}
                    >
                      {article.imageUrl && (
                        <div className="relative h-48 overflow-hidden rounded-t-md">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-3 right-3" variant="secondary">
                            Importante
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(article.publishedAt), "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold mb-2 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            data-testid={`button-read-more-${article.id}`}
                          >
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <span>Ler mais</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                {selectedCategory === "all" ? "Todas as Notícias" : selectedCategory}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-20 bg-muted rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredNews.length === 0 ? (
              <Card className="bg-card/95 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Nenhuma notícia encontrada
                  </h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os filtros ou termos de pesquisa
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article) => (
                  <Card
                    key={article.id}
                    className="hover-elevate transition-all duration-200 bg-card/95 backdrop-blur-sm"
                    data-testid={`card-news-${article.id}`}
                  >
                    {article.imageUrl && (
                      <div className="relative h-48 overflow-hidden rounded-t-md">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        {article.important === 1 && (
                          <Badge className="absolute top-3 right-3" variant="secondary">
                            Importante
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(article.publishedAt), "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="font-heading font-semibold mb-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          {article.source}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          data-testid={`button-read-${article.id}`}
                        >
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            <span>Ler</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
