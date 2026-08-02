import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { router } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>GerencIF</Text>

        <Text style={styles.subtitle}>
          Sistema de Gerenciamento de Contratos do IFPB Campus Esperança
        </Text>

        <Text style={styles.label}>Email</Text>

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
          />
        </View>

        <Text style={styles.label}>Senha</Text>

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

        <View style={styles.row}>
          <TouchableOpacity>
            <Text>Lembrar-me</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.link}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)/home')}
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '85%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: '#bebcbc',
    padding: 30,
  },

  title: {
    marginTop: 85,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006C5B',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 50,
  },

  label: {
    marginTop: 25,
    fontWeight: '600',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },

  input: {
    flex: 1,
    padding: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  forgotPassword: {
    padding: 1,
  },

  link: {
    color: '#006C5B',
  },

  button: {
    marginTop: 70,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});