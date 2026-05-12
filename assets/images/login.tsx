import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from "expo-router";
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
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

  <Fontisto name="email" size={25} color="#006C5B" />

  <TextInput
    style={styles.input}
    placeholder="Digite seu email..."
    value={email}
    onChangeText={setEmail}
  />

</View>

       <Text style={styles.label}>Senha</Text>

<View style={styles.inputContainer}>

  <AntDesign name="lock" size={25} color="#006C5B" />

  <TextInput
    style={styles.input}
    placeholder="Digite sua senha..."
    secureTextEntry={true}
    value={senha}
    onChangeText={setSenha}
  />

</View>

        <View style={styles.row}>
          <Text>Lembrar-me</Text>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </View>

       <TouchableOpacity
       style={styles.button}
       onPress={() => router.replace("/(tabs)/home")}
       >
       <Text style={styles.buttonText}>Entrar</Text>
       </TouchableOpacity>

        <Text style={styles.footer}>
          Não tem uma conta? <Text style={styles.link}>Crie uma conta</Text>
        </Text>

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
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: '#bebcbc',
    height: '80%',
    padding: 30
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006C5B',
    textAlign: 'center',
    marginTop: 60
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 50
  },
  label: {
    marginTop: 25,
    fontWeight: '600',
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
  link: {
    color: '#006C5B',
  },
  button: {
    backgroundColor: '#006C5B',
    padding: 15,
    borderRadius: 8,
    marginTop: 70,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: 15,
  },
 inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',

  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,

  paddingHorizontal: 10,
  marginTop: 5,
},
});