import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import { contratos, Contrato } from '../../dados/home';

export default function Home() {

  const navigation = useNavigation();

  function renderStatus(status: Contrato['status']) {

    if (status === 'Ativo') {
      return styles.statusAtivo;
    }

    if (status === 'Vencido') {
      return styles.statusVencido;
    }

    return styles.statusPendente;

  }

  return (
    <>
      <View style={styles.topNavbar}>

        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(DrawerActions.openDrawer())
          }
        >
          <Entypo name="menu" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.logoArea}>
          <Text style={styles.logoText}>GerencIF</Text>
          <Text style={styles.logoSubtitle}>
            Gestão de Contratos
          </Text>
        </View>

      </View>

      <View style={styles.screen}>

        <FlatList
          data={contratos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}

          ListHeaderComponent={
            <>
              <Text style={styles.title}>
                Contratos Recentes
              </Text>

              <Text style={styles.subtitle}>
                Últimos contratos cadastrados no sistema
              </Text>
            </>
          }

          renderItem={({ item }: { item: Contrato }) => (

            <View style={styles.card}>

              <View style={styles.topCard}>

                <Text style={styles.cardText}>
                  {item.titulo}
                </Text>

                <View style={renderStatus(item.status)}>
                  <Text style={styles.statusText}>
                    {item.status}
                  </Text>
                </View>

              </View>

              <Text style={styles.cardSubtitle}>
                Fornecedor: {item.fornecedor}
              </Text>

              <Text style={styles.cardSubtitle}>
                Vencimento: {item.vencimento}
              </Text>

              <TouchableOpacity
                style={styles.detalhes}
                onPress={() =>
                  router.push({
                    pathname: "/detalhesContrato",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >

                <Text style={styles.detalhesText}>
                  Ver detalhes
                </Text>

              </TouchableOpacity>

            </View>

          )}

        />

      </View>

    </>
  );

}

const styles = StyleSheet.create({

  topNavbar: {
    backgroundColor: '#006C5B',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },

  logoArea: {
    marginLeft: 20,
  },

  logoText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  logoSubtitle: {
    color: 'white',
    fontSize: 16,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingBottom: 120,
    padding: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height: 200,
    marginBottom: 15,
  },

  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardText: {
    fontSize: 16,
    width: '75%',
  },

  cardSubtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 7,
  },

  statusAtivo: {
    backgroundColor: '#39c172',
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginTop: -10,
  },

  statusVencido: {
    backgroundColor: '#e53935',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: -10,
  },

  statusPendente: {
    backgroundColor: '#f5ba18',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: -10,
  },

  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  detalhes: {
    backgroundColor: '#add8d1',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: -10,
  },

  detalhesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006C5B',
    textAlign: 'center',
  },

});