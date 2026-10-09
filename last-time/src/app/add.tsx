import { Platform, Pressable, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../styles/add.styles";
import { useItems } from "../context/items-context";
import { useState } from "react";
import { router } from "expo-router";

export default function AddScreen() {
  const { addItem } = useItems();
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateMode, setDateMode] = useState<"today" | "custom">("today");
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    addItem(trimmedTitle, selectedDate.toISOString());
    router.back();
  }

  function handleDateChange(event: { type: string }, date?: Date) {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !date) {
      return;
    }

    setSelectedDate(date);
    setDateMode("custom");
  }

  function selectToday() {
    setSelectedDate(new Date());
    setDateMode("today");
    setShowDatePicker(false);
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

      <Text style={[styles.label, { marginTop: 24 }]}>
        When did you do this?
      </Text>

      <View style={styles.dateOption}>
        <Pressable
          style={[
            styles.dateOptionText,
            dateMode === "today" && styles.dateOptionTextSelected,
          ]}
        >
          Today
        </Pressable>

        <Pressable
          style={[
            styles.dateOption,
            dateMode === "custom" && styles.dateOptionSelected,
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            style={[
              styles.dateOptionText,
              dateMode === "custom" && styles.dateOptionTextSelected,
            ]}
          >
            {dateMode === "custom"
              ? selectedDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Choose date"}
          </Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode='date'
          maximumDate={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onValueChange={(_, date) => {
            setSelectedDate(date);
            setDateMode("custom");
          }}
          onDismiss={() => setShowDatePicker(false)}
        />
      )}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  );
}
