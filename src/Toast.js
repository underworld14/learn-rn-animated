import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Button, Text } from "react-native";

const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return "Random message " + number;
};

const Message = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide && props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        margin: 10,
        padding: 10,
        marginBottom: 5,
        backgroundColor: "white",
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-25, 0],
            }),
          },
        ],
      }}
    >
      <Text>{props.title}</Text>
    </Animated.View>
  );
};

const Toast = () => {
  const [messages, setMessages] = useState([]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ position: "absolute", top: 45, left: 0, right: 0 }}>
        {messages.map((message) => (
          <Message
            key={message}
            title={message}
            onHide={() => {
              setMessages((messages) =>
                messages.filter((curr) => curr !== message)
              );
            }}
          />
        ))}
      </View>
      <Button
        title="Add Message"
        onPress={() => {
          const message = getRandomMessage();
          setMessages([message, ...messages]);
        }}
      />
    </View>
  );
};

export default Toast;
