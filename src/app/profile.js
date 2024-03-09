import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lorem Ipsum</Text>
      <Text style={styles.subtitle}>Lorem Ipsum</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 24,
  },
  title: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "white",
  },
});
