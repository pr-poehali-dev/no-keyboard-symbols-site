import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const hotkeys = [
  { key: "1-9", action: "Копировать символ с позиции 1-9" },
  { key: "F", action: "Переключить избранное" },
  { key: "P", action: "Переключить сортировку по популярности" },
  { key: "/", action: "Фокус на поиск" },
  { key: "Esc", action: "Очистить поиск" },
];

export const HotkeysInfo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Icon name="Keyboard" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Горячие клавиши</DialogTitle>
          <DialogDescription>
            Быстрый доступ к функциям сайта
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {hotkeys.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="text-sm text-muted-foreground">{item.action}</span>
              <kbd className="px-3 py-1.5 text-xs font-semibold bg-muted rounded border">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
