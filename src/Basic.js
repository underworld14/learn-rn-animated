import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";

// Animated animate methods
// Animated.timing
// Animated.spring

// Animations runner
// Animated.sequence
// Animated.parallel
// Animated.stagger

export default function App() {
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          marginTop: 15,
          backgroundColor: translate.interpolate({
            inputRange: [0, 100],
            outputRange: ["orange", "blue"],
          }),
          opacity: translate.interpolate({
            inputRange: [25, 50, 100],
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          }),
          transform: [
            { translateX: translate },
            {
              rotate: translate.interpolate({
                inputRange: [0, 100],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "yellow",
  },
});
