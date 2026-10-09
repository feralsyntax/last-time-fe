import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Item = {
  id: string;
  title: string;
  occurrences: string[];
};

type ItemsContextType = {
  items: Item[];
  addItem: (title: string, date: string) => void;
  updateItem: (id: string, date: string) => void;
};

const STORAGE_KEY = "@last-time/items";

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadItems() {
      try {
        const storedItems = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          const migratedItems: Item[] = parsedItems.map(
            (item: {
              id: string;
              title: string;
              lastDone?: string;
              occurrences?: string[];
            }) => ({
              id: item.id,
              title: item.title,
              occurrences: (
                item.occurrences ?? [item.lastDone ?? new Date().toISOString()]
              ).sort(
                (a: string, b: string) =>
                  new Date(b).getTime() - new Date(a).getTime(),
              ),
            }),
          );
          setItems(migratedItems);
        }
      } catch (error) {
        console.error("Failed to load items: ", error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadItems();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((error) =>
      console.error("Failed to save items: ", error),
    );
  }, [items, isLoaded]);

  function addItem(title: string, date: string) {
    const newItem: Item = {
      id: Date.now().toString(),
      title,
      occurrences: [date],
    };

    setItems((currentItems) => [newItem, ...currentItems]);
  }

  function updateItem(id: string, date: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              occurrences: [
                date,
                ...item.occurrences.filter((occurrence) => occurrence !== date),
              ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
            }
          : item,
      ),
    );
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItem }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
}
