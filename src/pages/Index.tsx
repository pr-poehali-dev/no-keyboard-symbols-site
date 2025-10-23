import { useState, useMemo, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SymbolCard } from "@/components/SymbolCard";
import { symbolsData, categories } from "@/data/symbols";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HotkeysInfo } from "@/components/HotkeysInfo";
import { RecentHistory } from "@/components/RecentHistory";
import { Collections, Collection } from "@/components/Collections";
import { toast } from "sonner";
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<Array<{ symbol: string; name: string; timestamp: number }>>(() => {
    const saved = localStorage.getItem("copyHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem("collections");
    return saved ? JSON.parse(saved) : [];
  });

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

    const symbolData = symbolsData.find(s => s.symbol === symbol);
    if (symbolData) {
      const newHistory = [
        { symbol: symbolData.symbol, name: symbolData.name, timestamp: Date.now() },
        ...history.filter(h => h.symbol !== symbol)
      ].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem("copyHistory", JSON.stringify(newHistory));
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("copyHistory");
    toast.success("История очищена");
  };

  const addCollection = (name: string) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      symbols: [],
      createdAt: Date.now()
    };
    const updated = [...collections, newCollection];
    setCollections(updated);
    localStorage.setItem("collections", JSON.stringify(updated));
  };

  const deleteCollection = (id: string) => {
    const updated = collections.filter(c => c.id !== id);
    setCollections(updated);
    localStorage.setItem("collections", JSON.stringify(updated));
  };

  const addToCollection = (collectionId: string, symbol: string) => {
    const updated = collections.map(c => 
      c.id === collectionId && !c.symbols.includes(symbol)
        ? { ...c, symbols: [...c.symbols, symbol] }
        : c
    );
    setCollections(updated);
    localStorage.setItem("collections", JSON.stringify(updated));
  };

  const removeFromCollection = (collectionId: string, symbol: string) => {
    const updated = collections.map(c => 
      c.id === collectionId
        ? { ...c, symbols: c.symbols.filter(s => s !== symbol) }
        : c
    );
    setCollections(updated);
    localStorage.setItem("collections", JSON.stringify(updated));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if (e.key === 'Escape') {
        setSearchQuery("");
        searchInputRef.current?.blur();
        return;
      }

      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setShowFavoritesOnly(!showFavoritesOnly);
        return;
      }

      if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setSortBy(sortBy === "popular" ? "default" : "popular");
        return;
      }

      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const symbol = filteredSymbols[num - 1];
        if (symbol) {
          navigator.clipboard.writeText(symbol.symbol);
          toast.success(`${symbol.symbol} скопирован!`);
          handleCopy(symbol.symbol);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [filteredSymbols, showFavoritesOnly, sortBy]);

  const exportFavorites = () => {
    const favoriteSymbols = symbolsData.filter(s => favorites.has(s.symbol));
    
    if (favoriteSymbols.length === 0) {
      toast.error("У вас нет избранных символов");
      return;
    }

    let content = "Избранные символы\n\n";
    
    favoriteSymbols.forEach(item => {
      content += `${item.symbol} - ${item.name} (${item.code})\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "favorite-symbols.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Экспортировано ${favoriteSymbols.length} символов`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <header className="text-center mb-8 sm:mb-12 relative">
          <div className="flex justify-end gap-1.5 sm:gap-2 mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-0">
            <Collections
              collections={collections}
              onAddCollection={addCollection}
              onDeleteCollection={deleteCollection}
              onAddToCollection={addToCollection}
              onRemoveFromCollection={removeFromCollection}
            />
            <RecentHistory history={history} onClear={clearHistory} />
            <HotkeysInfo />
            <ThemeToggle />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-2 sm:mb-3">
            Специальные символы
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Символы, которых нет на клавиатуре — в один клик
          </p>
        </header>

        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Поиск символов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 sm:h-12 text-sm sm:text-base border-2 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              size="sm"
              className="whitespace-nowrap text-xs sm:text-sm h-8 sm:h-9"
            >
              <Icon name="Star" size={14} className={showFavoritesOnly ? "fill-current sm:mr-1.5" : "sm:mr-1.5"} />
              <span className="hidden sm:inline">Избранное</span> ({favorites.size})
            </Button>

            {favorites.size > 0 && (
              <Button
                variant="outline"
                onClick={exportFavorites}
                size="sm"
                className="whitespace-nowrap text-xs sm:text-sm h-8 sm:h-9"
              >
                <Icon name="Download" size={14} className="sm:mr-1.5" />
                <span className="hidden sm:inline">Экспорт</span>
              </Button>
            )}

            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              onClick={() => setSortBy(sortBy === "popular" ? "default" : "popular")}
              size="sm"
              className="whitespace-nowrap text-xs sm:text-sm h-8 sm:h-9"
            >
              <Icon name="TrendingUp" size={14} className="sm:mr-1.5" />
              <span className="hidden sm:inline">Популярные</span>
            </Button>

            <div className="h-6 w-px bg-border" />

            <Button
              variant={selectedCategory === "Все" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Все")}
              size="sm"
              className="whitespace-nowrap text-xs sm:text-sm h-8 sm:h-9"
            >
              Все
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className="whitespace-nowrap text-xs sm:text-sm h-8 sm:h-9"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredSymbols.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
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
          <div className="text-center py-12 sm:py-16">
            <Icon name="SearchX" size={40} className="mx-auto text-muted-foreground mb-3 sm:mb-4" />
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              {showFavoritesOnly
                ? "У вас пока нет избранных символов"
                : "Символы не найдены"}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 px-4">
              {showFavoritesOnly
                ? "Добавьте символы в избранное, нажав на звёздочку"
                : "Попробуйте изменить параметры поиска"}
            </p>
          </div>
        )}

        <footer className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-muted-foreground border-t pt-6 sm:pt-8">
          <p>Всего символов: {symbolsData.length} • Категорий: {categories.length}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;