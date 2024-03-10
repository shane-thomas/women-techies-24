import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import {
  FamiljenGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/familjen-grotesk";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./../../firebaseConfig";
import React, { useState, useEffect } from "react";
import BlogSmall from "../components/blogSmall";

export default function Page() {
  let [fontsLoaded] = useFonts({
    FamiljenGrotesk_700Bold,
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("name", "==", "Srija")
        );
        const querySnapshot = await getDocs(q);
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Error reading blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <Image
          style={styles.pfp}
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
        />
        <Text style={styles.text}>Srija Puvvada</Text>
      </View>
      <View style={styles.userBlogs}>
        {blogs.slice(0, 3).map((blog) => (
          <View key={blog.id}>
            <BlogSmall
              location={blog.location}
              name={blog.name}
              rating={blog.rating}
              para={blog.blog}
            />
            <View style={{ padding: 15 }} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 24,
  },

  topRow: {
    flexDirection: "row",
    paddingVertical: 30,
  },
  pfp: {
    marginRight: 10,
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  text: {
    alignSelf: "center",
    color: "#E46DA3",
    fontSize: 25,
    fontFamily: "FamiljenGrotesk_700Bold",
  },
});
