import { useState } from "react";

import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Lembretes() {

  const navigation = useNavigation();
  const [filtro, setFiltro] = useState('todos');

  const lembretes = [
    {
      id: "1",
      titulo: "Contrato próximo do vencimento",
      subtitulo: "O contrato 010/2024 vence em 5 dias",
      tipo: "pendente",
      tempo: "há 5 minutos",
    },

    {
      id: "2",
      titulo: "Pagamento atrasado!",
      subtitulo: "O pagamento do contrato 009 está atrasado",
      tipo: "vencido",
      tempo: "há 1 hora",
    },

    {
      id: "3",
      titulo: "Novo contrato ativo",
      subtitulo: "O contrato 001/2026 foi cadastrado",
      tipo: "ativo",
      tempo: "ontem",
    },

    {
      id: "4",
      titulo: "Contrato próximo do vencimento",
      subtitulo: "O contrato 002/2024 vence em 10 dias",
      tipo: "pendente",
      tempo: "há 2 horas",
    },

    {
      id: "5",
      titulo: "Pagamento atrasado!",
      subtitulo: "O pagamento do contrato 003 está atrasado",
      tipo: "vencido",
      tempo: "há 3 horas",
    },

    {
      id: "6",
      titulo: "Novo contrato ativo",
      subtitulo: "O contrato 004/2026 foi cadastrado",
      tipo: "ativo",
      tempo: "há 2 dias",
    }
  ];

  const lembretesFiltrados = lembretes.filter((item) => {

    if (filtro === 'todos') {
      return true;
    }

    return item.tipo === filtro;
  });

  function renderIcone(tipo: string) {

    if (tipo === 'vencido') {
      return (
        <View style={styles.iconeVermelho}>
          <AntDesign name="close-circle" size={22} color="white" />
        </View>
      );
    }

    if (tipo === 'pendente') {
      return (
        <View style={styles.iconeAmarelo}>
          <MaterialIcons name="warning" size={24} color="white" />
        </View>
      );
    }

    return (
      <View style={styles.iconeVerde}>
        <Feather name="check-circle" size={22} color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.NavBarCima}>

        <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Entypo name="menu" size={32} color="white" />
                </TouchableOpacity>

        <View style={styles.logoArea}>
          <Text style={styles.TextoNav}>Lembretes</Text>
          <Text style={styles.SubtitleNav}>GerencIF</Text>
        </View>

      </View>

      <View style={styles.areaFiltros}>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() => setFiltro('todos')}
        >
          <Text>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() => setFiltro('ativo')}
        >
          <Text>Ativos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() => setFiltro('pendente')}
        >
          <Text>Pendentes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() => setFiltro('vencido')}
        >
          <Text>Vencidos</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={lembretesFiltrados}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.card}>

            {renderIcone(item.tipo)}

            <View style={styles.areaTexto}>

              <Text style={styles.tituloCard}>
                {item.titulo}
              </Text>

              <Text style={styles.tempoTexto}>
                {item.tempo}
              </Text>

              <Text style={styles.subtituloCard}>
                {item.subtitulo}
              </Text>

            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  NavBarCima: {
    backgroundColor: '#006C5B',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },

  TextoNav: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  SubtitleNav: {
    color: 'white',
    fontSize: 16,
  },

  logoArea: {
    marginLeft: 20,
  },

  areaFiltros: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    marginVertical: 15,
  },

  botaoFiltro: {
    backgroundColor: 'white',

    paddingVertical: 8,
    paddingHorizontal: 15,

    borderRadius: 20,

    elevation: 2,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    backgroundColor: 'white',

    padding: 20,
    margin: 10,
    borderRadius: 10,

    elevation: 3,
  },

  areaTexto: {
    width: '80%',
  },

  tituloCard: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  subtituloCard: {
    fontSize: 15,
    color: 'gray',
  },

  tempoTexto: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    marginBottom: 6,
  },

  iconeVerde: {
    backgroundColor: '#39c172',

    width: 45,
    height: 45,

    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15,
  },

  iconeAmarelo: {
    backgroundColor: '#f5ba18',

    width: 45,
    height: 45,

    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15,
  },

  iconeVermelho: {
    backgroundColor: '#e53935',

    width: 45,
    height: 45,

    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15,
  },

});