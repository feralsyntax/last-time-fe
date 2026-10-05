import { StyleSheet, Text, View } from "react-native";

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
