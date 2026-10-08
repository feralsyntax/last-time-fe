import {createContext, PropsWithChildren, useContext, useState} from "react";

export type Item = {
    id: string;
    title: string;
    lastDone: string;
}

type ItemsContextType = {
    items: Item[];
    addItem: (title: string) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({children}: PropsWithChildren) {
    const [items, setItems] = useState<Item[]>([]);

    function addItem(title: string) {
        const newItem: Item = {
            id: Date.now().toString(),
            title,
            lastDone: new Date().toISOString(),
        };
        setItems((currentItems) => [newItem, ...currentItems]);
    }

    return (
        <ItemsContext.Provider value={{items, addItem}}>
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