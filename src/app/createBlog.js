import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { db } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";

export default function Blog() {
  let [fontLoaded] = useFonts({
    Roboto_500Medium,
  });

  const [blogRating, setBlogRating] = useState(0);
  const [blogDescription, setBlogDescription] = useState("");
  const [location, setLocation] = useState("");

  const createBlog = async () => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        name: "Shane",
        blog: blogDescription,
        rating: blogRating,
        location: location,
        createdTime: serverTimestamp(),
      });
    } catch (e) {}
    Alert.alert(
      (title = "Success!"),
      (message = "Your review has been submitted successfully!")
    );
    setBlogDescription("");
    setLocation("");
    setBlogRating(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingVertical: 20 }} />
      <Text style={styles.subheading}>Location: </Text>
      <TextInput
        multiline={true}
        style={[styles.subheading, styles.input]}
        placeholder="..."
        placeholderTextColor="white"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <View style={{ paddingVertical: 10 }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        <Text style={styles.subheading}>Rating: </Text>
        {[1, 2, 3, 4, 5].map((iconNumber) => (
          <>
            <FontAwesome
              key={"heart_" + iconNumber.toString()}
              name="heart"
              size={24}
              color={blogRating >= iconNumber ? "pink" : "white"}
              onPress={() => setBlogRating(iconNumber)}
            />
          </>
        ))}
      </View>
      <View style={{ paddingVertical: 10 }} />
      <Text style={styles.subheading}>Description: </Text>
      <TextInput
        multiline={true}
        style={[styles.subheading, styles.input]}
        placeholder="..."
        placeholderTextColor="white"
        value={blogDescription}
        onChangeText={(text) => setBlogDescription(text)}
      />
      <View style={{ paddingVertical: 20 }} />
      <View style={styles.button}>
        <Pressable onPress={createBlog}>
          <Text
            style={{
              color: "#E746A6",
              fontSize: 17,
              fontFamily: "Roboto_500Medium",
            }}
          >
            Share
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    padding: 24,
  },

  subheading: {
    fontFamily: "Robot_500Medium",
    color: "white",
    fontSize: 16,
  },
  input: {
    borderColor: "white",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#E746A6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    padding: 10,
  },
});
