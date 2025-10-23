import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

export interface Collection {
  id: string;
  name: string;
  symbols: string[];
  createdAt: number;
}

interface CollectionsProps {
  collections: Collection[];
  onAddCollection: (name: string) => void;
  onDeleteCollection: (id: string) => void;
  onAddToCollection: (collectionId: string, symbol: string) => void;
  onRemoveFromCollection: (collectionId: string, symbol: string) => void;
  currentSymbol?: string;
}

export const Collections = ({
  collections,
  onAddCollection,
  onDeleteCollection,
  onAddToCollection,
  onRemoveFromCollection,
  currentSymbol,
}: CollectionsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const handleCreate = () => {
    if (newCollectionName.trim()) {
      onAddCollection(newCollectionName.trim());
      setNewCollectionName("");
      setIsCreating(false);
      toast.success("Коллекция создана!");
    }
  };

  const handleAddSymbol = (collectionId: string) => {
    if (currentSymbol) {
      onAddToCollection(collectionId, currentSymbol);
      toast.success("Символ добавлен в коллекцию!");
    }
  };

  const copyCollection = (symbols: string[]) => {
    const text = symbols.join(" ");
    navigator.clipboard.writeText(text);
    toast.success(`Скопировано ${symbols.length} символов!`);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Icon name="FolderOpen" size={20} />
            {collections.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {collections.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Мои коллекции</SheetTitle>
            <SheetDescription>
              Создавайте свои наборы символов для быстрого доступа
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-3">
            <Button
              onClick={() => setIsCreating(true)}
              className="w-full"
              variant="outline"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Создать коллекцию
            </Button>

            {collections.length > 0 ? (
              collections.map((collection) => (
                <div
                  key={collection.id}
                  className="p-4 bg-muted rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{collection.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {collection.symbols.length} символов
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedCollection(collection)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyCollection(collection.symbols)}
                      >
                        <Icon name="Copy" size={16} />
                      </Button>
                      {currentSymbol && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAddSymbol(collection.id)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          onDeleteCollection(collection.id);
                          toast.success("Коллекция удалена");
                        }}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                  {collection.symbols.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      {collection.symbols.slice(0, 10).map((symbol, idx) => (
                        <span key={idx} className="text-2xl">
                          {symbol}
                        </span>
                      ))}
                      {collection.symbols.length > 10 && (
                        <span className="text-muted-foreground text-sm self-center">
                          +{collection.symbols.length - 10}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="FolderOpen" size={48} className="mx-auto mb-3 opacity-50" />
                <p>У вас пока нет коллекций</p>
                <p className="text-sm mt-1">Создайте первую коллекцию!</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая коллекция</DialogTitle>
            <DialogDescription>
              Придумайте название для коллекции символов
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Например: Часто используемые"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreate} disabled={!newCollectionName.trim()}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedCollection} onOpenChange={() => setSelectedCollection(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCollection?.name}</DialogTitle>
            <DialogDescription>
              {selectedCollection?.symbols.length} символов в коллекции
            </DialogDescription>
          </DialogHeader>
          {selectedCollection && (
            <div className="grid grid-cols-6 gap-3 max-h-96 overflow-y-auto">
              {selectedCollection.symbols.map((symbol, idx) => (
                <div
                  key={idx}
                  className="relative p-3 border rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="text-3xl text-center">{symbol}</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() => {
                      onRemoveFromCollection(selectedCollection.id, symbol);
                      setSelectedCollection({
                        ...selectedCollection,
                        symbols: selectedCollection.symbols.filter(s => s !== symbol)
                      });
                    }}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
