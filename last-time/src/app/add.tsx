import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/add.styles";
import { useItems } from "../context/items-context";
import { useState } from "react";
import { router } from "expo-router";

export default function AddScreen() {
  const { addItem } = useItems();
  const [title, setTitle] = useState("");

  function handleSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    addItem(trimmedTitle);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>
      <Text style={styles.label}>What did you do?</Text>

      <TextInput
        style={styles.input}
        placeholder='E.g. Changed car oil'
        placeholderTextColor='#999999'
        value={title}
        onChangeText={setTitle}
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  );
}
