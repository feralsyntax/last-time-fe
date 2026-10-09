import {createContext, PropsWithChildren, useContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Item = {
    id: string;
    title: string;
    lastDone: string;
}

type ItemsContextType = {
    items: Item[];
    addItem: (title: string) => void;
    updateItem: (id: string) => void;
}

const STORAGE_KEY = "@last-time/items";

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({children}: PropsWithChildren) {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function loadItems() {
            const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            }
        }
        loadItems();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items]);

    function addItem(title: string) {
        const newItem: Item = {
            id: Date.now().toString(),
            title,
            lastDone: new Date().toISOString(),
        };
        setItems((currentItems) => [newItem, ...currentItems]);
    }

    function updateItem(id: string) {
        setItems((currentItems) => 
            currentItems.map((item) => 
                item.id === id ? {...item, lastDone: new Date().toISOString()} : item
            )
        );
    }

    return (
        <ItemsContext.Provider value={{items, addItem, updateItem}}>
            {children}
        </ItemsContext.Provider>
    )
}

export function useItems() {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error("useItems must be used within an ItemsProvider");
    }
    return context;
}