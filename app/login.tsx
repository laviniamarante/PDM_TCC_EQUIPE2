import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar() {
    setErro("");

    if (!email.trim()) {
      setErro("Digite seu email.");
      return;
    }

    const emailValido = /\S+@\S+\.\S+/;

    if (!emailValido.test(email)) {
      setErro("Digite um email válido.");
      return;
    }
    if (!senha.trim()) {
      setErro("Digite sua senha.");
      return;
    }
   router.replace("/(tabs)/home");
  }

  const { saiu } = useLocalSearchParams(); useEffect(() => { if (saiu === "true") { setEmail(""); setSenha(""); } }, [saiu]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          GerencIF
        </Text>

        <Text style={styles.subtitle}>
          Sistema de Gerenciamento de Contratos do IFPB Campus Esperança
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <View style={styles.inputContainer}>
          <Fontisto
            name="email"
            size={25}
            color="#006C5B"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>
          Senha
        </Text>

        <View style={styles.inputContainer}>
          <AntDesign
            name="lock"
            size={25}
            color="#006C5B"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha..."
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {erro !== "" && (
          <Text style={styles.erro}>
            {erro}
          </Text>
        )}

        <View style={styles.row}>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.link}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={entrar}
        >
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: "#bebcbc",
    padding: 30,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#006C5B",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },

  label: {
    marginTop: 25,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },

  input: {
    flex: 1,
    padding: 12,
  },

  erro: {
    color: "#e53935",
    marginTop: 10,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  forgotPassword: {
    padding: 1,
  },

  link: {
    color: "#006C5B",
  },

  button: {
    marginTop: 70,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#006C5B",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

