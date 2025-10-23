import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

interface RecentHistoryProps {
  history: Array<{ symbol: string; name: string; timestamp: number }>;
  onClear: () => void;
}

export const RecentHistory = ({ history, onClear }: RecentHistoryProps) => {
  const copySymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    toast.success(`${symbol} скопирован!`);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "только что";
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} ч назад`;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Icon name="Clock" size={20} />
          {history.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {history.length > 9 ? '9+' : history.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>История копирований</SheetTitle>
          <SheetDescription>
            Последние скопированные символы
          </SheetDescription>
        </SheetHeader>
        
        {history.length > 0 ? (
          <div className="mt-6 space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold">{item.symbol}</div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(item.timestamp)}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copySymbol(item.symbol)}
                >
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            ))}
            
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={onClear}
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Очистить историю
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="Clock" size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              История пуста
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Скопируйте символы, чтобы увидеть их здесь
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
