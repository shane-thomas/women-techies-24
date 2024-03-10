import { StyleSheet, Text, View, Button } from "react-native";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function BlogSmall({ location, para, rating }) {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Roboto_400Regular,
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.place}
        source="https://picsum.photos/seed/696/3000/2000"
        contentFit="cover"
      />

      <View style={styles.textBox}>
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
          }}
        >
          {location}
        </Text>
        <Text style={{ color: "white" }}>{para}</Text>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((iconNumber) => (
            <FontAwesome
              key={`heart_${iconNumber}`}
              name="heart"
              size={18}
              color={rating >= iconNumber ? "green" : "white"}
              style={{ paddingHorizontal: 3 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  textBox: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "column",
  },
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    backgroundColor: "rgba(228, 109, 163, 0.75)",
  },
  place: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
    borderColor: "white",
    borderWidth: 3,
  },
});
