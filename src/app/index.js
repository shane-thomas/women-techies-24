import { StyleSheet, Text, View, ScrollView } from "react-native";
import { db } from "../../firebaseConfig";
import BlogMedium from "../components/blogMedium";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [blogs, setBlogs] = useState([]);

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
      <Text style={styles.title}>Hello Shane!</Text>
      <ScrollView>
        {blogs.map((blog) => (
          <>
            <BlogMedium
              key={blog.id}
              location={blog.location}
              name={blog.name}
              rating={blog.rating}
              para={blog.blog}
            />
            <View style={{ padding: 15 }} />
          </>
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
    fontSize: 60,
    color: "white",
    fontWeight: "bold",
  },
});
