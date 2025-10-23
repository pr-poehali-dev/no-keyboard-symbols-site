import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

interface SymbolCardProps {
  symbol: string;
  name: string;
  code: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  copyCount?: number;
  onCopy?: () => void;
}

export const SymbolCard = ({ 
  symbol, 
  name, 
  code, 
  isFavorite = false, 
  onToggleFavorite,
  copyCount = 0,
  onCopy
}: SymbolCardProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(symbol);
    toast.success(`${symbol} скопирован!`);
    onCopy?.();
  };

  return (
    <Card className="group relative p-4 sm:p-6 hover:shadow-lg transition-all duration-300 active:scale-95 sm:hover:scale-105 border-2 hover:border-primary/50">
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <div className="text-5xl sm:text-6xl font-bold text-foreground mb-1 sm:mb-2 select-none">
          {symbol}
        </div>
        
        <div className="text-center w-full">
          <p className="font-medium text-xs sm:text-sm text-foreground truncate px-1">{name}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{code}</p>
          {copyCount > 0 && (
            <div className="flex items-center justify-center gap-1 mt-1.5 sm:mt-2">
              <Icon name="Copy" size={10} className="text-muted-foreground sm:w-3 sm:h-3" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">{copyCount}</span>
            </div>
          )}
        </div>

        <div className="flex gap-1.5 sm:gap-2 mt-1 sm:mt-2 w-full">
          <Button
            size="sm"
            onClick={copyToClipboard}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
          >
            <Icon name="Copy" size={12} className="sm:mr-1 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Копировать</span>
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleFavorite}
            className={`h-8 sm:h-9 px-2 sm:px-3 ${isFavorite ? "text-primary border-primary" : ""}`}
          >
            <Icon 
              name={isFavorite ? "Star" : "Star"} 
              size={12} 
              className={`sm:w-3.5 sm:h-3.5 ${isFavorite ? "fill-primary" : ""}`}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};