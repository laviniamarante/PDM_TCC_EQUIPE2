import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function DetalhesContrato() {

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.header}>

        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <View>
            <Text style={styles.titulo}>
              Detalhes do contrato
            </Text>

            <Text style={styles.subtitulo}>
              Visualize todas as informações do contrato
            </Text>
          </View>
        </View>

      </View>

      <View style={styles.card} />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F3F4',
  },

  topBar: {
    backgroundColor: '#006C5B',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },

  header: {
    padding: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    marginRight: 12,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitulo: {
    color: 'gray',
    fontSize: 15,
  },

  card: {
    backgroundColor: 'white',
    marginHorizontal: 18,
    borderRadius: 10,
    marginTop: 10,
    minHeight: 250,
    height: '70%',
  },
});