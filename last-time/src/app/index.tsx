import { Pressable, Text, View } from "react-native";
import { styles } from "./index.styles";

const items = [
  {
    id: "1",
    title: "Changed car oil",
    daysAgo: 12,
  },
  {
    id: "2",
    title: "Went to the dentist",
    daysAgo: 3,
  },
  {
    id: "3",
    title: "Had a haircut",
    daysAgo: 7,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Last Time</Text>
        <Text style={styles.subtitle}>
          Remember when you last did something
        </Text>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <Pressable key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>
              {item.daysAgo === 1 ? "1 day ago" : `${item.daysAgo} days ago`}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}
