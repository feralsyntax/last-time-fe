import { Pressable, Text, TextInput, View } from "react-native";

export default function AddScreen() {
  return (
    <View>
      <Text>Add Item</Text>
      <Text>What did you do?</Text>

      <TextInput
        placeholder='E.g. Changed car oil'
        placeholderTextColor='#999999'
      />

      <Pressable>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}
