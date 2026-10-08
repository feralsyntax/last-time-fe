import { Stack } from "expo-router";
import {ItemsProvider} from "../context/items-context";

export default function RootLayout() {
  return (
    <ItemsProvider>
      <Stack />
    </ItemsProvider>
  );
}