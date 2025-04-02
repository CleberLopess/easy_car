import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  ride: {
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  containerName: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 20, fontWeight: "bold" },
  address: { fontSize: 16, color: "gray" },
  icon: { width: 20, height: 20, marginRight: 5 },
});
