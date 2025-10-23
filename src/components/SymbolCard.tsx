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
    <Card className="group relative p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50">
      <div className="flex flex-col items-center gap-3">
        <div className="text-6xl font-bold text-foreground mb-2 select-none">
          {symbol}
        </div>
        
        <div className="text-center">
          <p className="font-medium text-sm text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground mt-1">{code}</p>
          {copyCount > 0 && (
            <div className="flex items-center justify-center gap-1 mt-2">
              <Icon name="Copy" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{copyCount}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={copyToClipboard}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Icon name="Copy" size={14} className="mr-1" />
            Копировать
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleFavorite}
            className={isFavorite ? "text-primary border-primary" : ""}
          >
            <Icon 
              name={isFavorite ? "Star" : "Star"} 
              size={14} 
              className={isFavorite ? "fill-primary" : ""}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};