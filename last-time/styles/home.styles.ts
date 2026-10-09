import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#171717",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#666666",
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#171717",
  },
  cardDate: {
    marginTop: 8,
    fontSize: 14,
    color: "#777777",
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "300",
    lineHeight: 34,
  },
  doneButton: {
    marginTop: 16,
    backgroundColor: "#171717",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
