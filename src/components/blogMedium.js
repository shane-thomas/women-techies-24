import { StyleSheet, Text, View, Button } from "react-native";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

export default function BlogMedium({ name, location, para, rating }) {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Roboto_400Regular,
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.pfp}
            source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
          />
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={[styles.text, { textAlign: "right" }]}>{location}</Text>
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((iconNumber) => (
              <FontAwesome
                key={`heart_${iconNumber}`}
                name="heart"
                size={18}
                color={rating >= iconNumber ? "pink" : "white"}
                style={{ paddingHorizontal: 3 }}
              />
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          borderColor: "#C4C4C4",
          borderWidth: StyleSheet.hairlineWidth,
          margin: 10,
          alignSelf: "center",
          width: "90%",
          margin: 20,
        }}
      />
      <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        contentFit="cover"
      />
      <Text style={styles.para}>{para}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  para: {
    paddingTop: 10,
    color: "white",
    textAlign: "justify",
    alignSelf: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  pfp: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 15,
  },

  container: {
    // flex: 1,
    paddingVertical: 15,
    backgroundColor: "#343232",
    borderRadius: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: "90%",
    height: 203,
    borderRadius: 10,
    backgroundColor: "#0553",
  },
});
