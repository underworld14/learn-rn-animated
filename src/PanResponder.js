import React, { useRef } from "react";
import {
  View,
  PanResponder,
  Animated,
  useWindowDimensions,
} from "react-native";

const IMAGE_URI =
  "https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638";

const pointsDistance = ([xA, yA], [xB, yB]) => {
  return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
};

const Index = () => {
  const dimesions = useWindowDimensions();
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const activeTouches = evt.nativeEvent.changedTouches.length;

        if (activeTouches === 1) {
          pan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
        } else if (activeTouches >= 2) {
          const touch = evt.nativeEvent.changedTouches;

          const touchA = touch[0];
          const touchB = touch[1];

          const distance = pointsDistance(
            [touchA.pageX, touchA.pageY],
            [touchB.pageX, touchB.pageY]
          );

          const screenMovedPercents = distance / dimesions.width;

          scale.setValue(1 + screenMovedPercents);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={{ uri: IMAGE_URI }}
        style={{
          height: 200,
          width: "90%",
          borderRadius: 10,
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
        }}
      />
    </View>
  );
};

export default Index;
