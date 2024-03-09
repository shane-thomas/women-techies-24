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
import { useFonts } from 'expo-font';


export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    'FamiljenGrotesk': require('./../../assets/fonts/FamiljenGrotesk.ttf'),
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
    <View style={styles.container}>
      <Text style={styles.title}>Hello <Text style={[styles.title, { fontWeight: "bold" }]}>Shane!</Text></Text>
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
    </View>
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
    // fontWeight: "bold",
    fontFamily: "FamiljenGrotesk"
  },
});
