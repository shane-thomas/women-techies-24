import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { db } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Blog() {
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
      });
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <Text style={styles.subheading}>Description: </Text>
      <TextInput
        style={styles.subheading}
        placeholder="..."
        placeholderTextColor="white"
        value={blogDescription}
        onChangeText={(text) => setBlogDescription(text)}
      />
      <Text style={styles.subheading}>Location: </Text>
      <TextInput
        style={styles.subheading}
        placeholder="..."
        placeholderTextColor="white"
        value={blogDescription}
        onChangeText={(text) => setLocation(text)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        {[1, 2, 3, 4, 5].map((iconNumber) => (
          <FontAwesome
            key={iconNumber}
            name="heart"
            size={24}
            color={blogRating >= iconNumber ? "pink" : "white"}
            onPress={() => setBlogRating(iconNumber)}
          />
        ))}
      </View>
      <Button title="Add Blog" onPress={createBlog} />
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
    color: "white",
  },
}); 
