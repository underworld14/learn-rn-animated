import React, { useRef } from "react";
import { Animated, View, useWindowDimensions } from "react-native";

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

const Gesture = () => {
  const dimesions = useWindowDimensions();
  const touch = useRef(
    new Animated.ValueXY({
      x: dimesions.width / 2 - CURSOR_HALF_SIDE_SIZE,
      y: dimesions.height / 2 - CURSOR_HALF_SIDE_SIZE,
    })
  ).current;

  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={() => true}
      onResponderMove={(event) => {
        touch.setValue({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
      }}
      onResponderRelease={() => {
        Animated.spring(touch, {
          toValue: {
            x: dimesions.width / 2 - CURSOR_HALF_SIDE_SIZE,
            y: dimesions.height / 2 - CURSOR_HALF_SIDE_SIZE,
          },
          useNativeDriver: false,
        }).start();
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
          top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
          height: CURSOR_SIDE_SIZE,
          width: CURSOR_SIDE_SIZE,
          borderRadius: CURSOR_HALF_SIDE_SIZE,
          backgroundColor: "orange",
        }}
      />
    </View>
  );
};

export default Gesture;
