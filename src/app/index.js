import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { db } from "./../../firebaseConfig";
import BlogMedium from "../components/blogMedium";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FamiljenGrotesk_400Regular, FamiljenGrotesk_700Bold, useFonts } from "@expo-google-fonts/familjen-grotesk";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";


export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    FamiljenGrotesk_400Regular, FamiljenGrotesk_700Bold
  });
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdTime", "desc"));
      const querySnapshot = await getDocs(q);
      const blogData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
    } catch (error) {
      console.error("Error refreshing blogs:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
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
  }, []); // Empty dependency array to fetch blogs only once on component mount

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, {fontFamily: "FamiljenGrotesk_400Regular"}]}>Hello <Text style={[styles.title, { fontFamily: "FamiljenGrotesk_700Bold" }]}>Shane!</Text></Text>
      <View
        style={{
          borderColor: "#C4C4C4",
          borderWidth: 1,
          margin: 10,
          alignSelf: "center",
          width: "100%",
          margin: 20,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {blogs.map((blog) => (
          <View key={blog.id}>
            <BlogMedium
              location={blog.location}
              name={blog.name}
              rating={blog.rating}
              para={blog.blog}
            />
            <View style={{ padding: 15 }} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 24,
  },

  title: {
    
    textAlign:"center",
    fontSize: 36,
    color: "#E746A6",
    
  },
});
