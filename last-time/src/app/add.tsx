import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/add.styles";

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>
      <Text style={styles.label}>What did you do?</Text>

      <TextInput
        style={styles.input}
        placeholder='E.g. Changed car oil'
        placeholderTextColor='#999999'
      />

      <Pressable style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  );
}
