import { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

return (
  <View style={styles.container}>
    <Animated.Image
      source={require("./assets/logo.png")}
      style={[styles.logo, { opacity }]}
    />

    <Animated.Text
      style={[styles.titulo, { opacity }]}
    >
      GerencIF
    </Animated.Text>

    <Animated.Text
      style={[styles.subtitulo, { opacity }]}
    >
      Sistema de Gerenciamento de Contratos
    </Animated.Text>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

logo: {
  width: 150,
  height: 150,
  resizeMode: "contain",
  alignSelf: "center",
  marginLeft: 10,
},

titulo: {
  marginTop: 20,
  fontSize: 32,
  fontWeight: "bold",
  color: "#006C5B",
  textAlign: "center",
},

subtitulo: {
  marginTop: 8,
  fontSize: 16,
  color: "#555",
  textAlign: "center",
},
});