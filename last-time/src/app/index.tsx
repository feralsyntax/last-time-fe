import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/home.styles";
import { router } from "expo-router";
import { useItems } from "@/context/items-context";

function getDaysAgo(date: string) {
  const now = new Date();
  const lastDoneDate = new Date(date);
  const difference = now.getTime() - lastDoneDate.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  return days;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HomeScreen() {
  const { items, updateItem } = useItems();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Last Time</Text>
        <Text style={styles.subtitle}>
          Keep track of when things last happened.
        </Text>
      </View>

      <View style={styles.list}>
        {items.map((item) => {
          const daysAgo = getDaysAgo(item.lastDone);
          return (
            <View key={item.id} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>
                  {daysAgo === 0
                    ? "Today"
                    : daysAgo === 1
                      ? "1 day ago"
                      : `${daysAgo} days ago`}
                </Text>
                <Text style={styles.actualDate}>
                  Last recorded: {formatDate(item.lastDone)}
                </Text>
              </View>
              <Pressable
                style={styles.doneButton}
                onPress={() => updateItem(item.id)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      <Pressable style={styles.addButton} onPress={() => router.push("/add")}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}
