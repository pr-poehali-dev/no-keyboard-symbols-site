import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { SymbolCard } from "@/components/SymbolCard";
import { symbolsData, categories } from "@/data/symbols";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [copyCounts, setCopyCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("copyCounts");
    return saved ? JSON.parse(saved) : {};
  });
  const [sortBy, setSortBy] = useState<"default" | "popular">("default");

  const filteredSymbols = useMemo(() => {
    let filtered = symbolsData;

    if (showFavoritesOnly) {
      filtered = filtered.filter(s => favorites.has(s.symbol));
    }

    if (selectedCategory !== "Все") {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.symbol.includes(searchQuery) ||
          s.code.toLowerCase().includes(query)
      );
    }

    if (sortBy === "popular") {
      filtered = [...filtered].sort((a, b) => {
        const countA = copyCounts[a.symbol] || 0;
        const countB = copyCounts[b.symbol] || 0;
        return countB - countA;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, favorites, showFavoritesOnly, sortBy, copyCounts]);

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol);
    } else {
      newFavorites.add(symbol);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(Array.from(newFavorites)));
  };

  const handleCopy = (symbol: string) => {
    const newCounts = {
      ...copyCounts,
      [symbol]: (copyCounts[symbol] || 0) + 1
    };
    setCopyCounts(newCounts);
    localStorage.setItem("copyCounts", JSON.stringify(newCounts));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Специальные символы
          </h1>
          <p className="text-lg text-muted-foreground">
            Символы, которых нет на клавиатуре — в один клик
          </p>
        </header>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Поиск по символам, названиям или кодам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-2 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="whitespace-nowrap"
            >
              <Icon name="Star" size={16} className={showFavoritesOnly ? "fill-current mr-2" : "mr-2"} />
              Избранное ({favorites.size})
            </Button>

            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              onClick={() => setSortBy(sortBy === "popular" ? "default" : "popular")}
              className="whitespace-nowrap"
            >
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Популярные
            </Button>

            <div className="h-6 w-px bg-border" />

            <Button
              variant={selectedCategory === "Все" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Все")}
              className="whitespace-nowrap"
            >
              Все
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredSymbols.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSymbols.map((item) => (
              <SymbolCard
                key={item.symbol}
                symbol={item.symbol}
                name={item.name}
                code={item.code}
                isFavorite={favorites.has(item.symbol)}
                onToggleFavorite={() => toggleFavorite(item.symbol)}
                copyCount={copyCounts[item.symbol] || 0}
                onCopy={() => handleCopy(item.symbol)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              {showFavoritesOnly
                ? "У вас пока нет избранных символов"
                : "Символы не найдены"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {showFavoritesOnly
                ? "Добавьте символы в избранное, нажав на звёздочку"
                : "Попробуйте изменить параметры поиска"}
            </p>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-muted-foreground border-t pt-8">
          <p>Всего символов: {symbolsData.length} • Категорий: {categories.length}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;