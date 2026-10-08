import { StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.title}>Last Time</Text>
      <Text style={styles.subtitle}>Remember when you last did something</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
});
