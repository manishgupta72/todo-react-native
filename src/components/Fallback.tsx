import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Fallback = () => (
  <View style={styles.fallbackContainer}>
    <Image
      source={require("../../assets/todo.jpg")}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.fallbackText}>No tasks yet. Start adding one!</Text>
  </View>
);

export default Fallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  image: {
    height: 180,
    width: 180,
    marginBottom: 16,
  },
  fallbackText: {
    fontSize: 16,
    color: "#aaa",
  },
});
