import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { contratos } from '../dados/home'; // ajuste o caminho se necessário

export default function DetalhesContrato() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

const contrato = contratos.find(
  c => c.id === Number(id)
  //pra pegar o contato certo pelo respectivo id que foi passado na navegação
);

const detalhes = [
  ['Título', contrato?.titulo],
  ['Fornecedor', contrato?.fornecedor],
  ['Data de início', contrato?.inicio],
  ['Data de vencimento', contrato?.vencimento],
  ['Status', contrato?.status],
  ['Número', contrato?.numeroContrato],
  ['Fiscal', contrato?.fiscal],
  ['Valor', contrato?.valor],
  ['Objeto', contrato?.objeto],
  //aqui eu to dizendo os dados que eu quero mostrar nessa tela de detalhes 
];

function renderStatus(status: string) {
  if (status === 'Ativo') {
    return styles.statusAtivo;
  }

  if (status === 'Vencido') {
    return styles.statusVencido;
  }

  return styles.statusPendente;
}

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      
      <View style={styles.topBar} />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <View>
            <Text style={styles.titulo}>
              Detalhes do contrato
            </Text>

            <View style={styles.statusContainer}>

</View>

            <Text style={styles.subtitulo}>
              Visualize todas as informações do contrato
            </Text>
          </View>
        </View>
      </View>
 
<View style={styles.card1}>
  <View style={styles.cardHeader}>
    <Text style={styles.cardTitulo}>
      {contrato?.titulo}
    </Text>

    <View style={renderStatus(contrato?.status ?? 'Pendente')}>
      <Text style={styles.statusText}>
        {contrato?.status}
      </Text>
    </View>
  </View>

  {detalhes.map(([label, valor]) => (
    <Text key={label} style={styles.cardTexto}>
      {label}: {valor}
    </Text>
  ))}

</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F3F4',
    alignItems: 'center',
    paddingBottom: 20,
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

  card1: {
    width: '90%',
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
    padding: 20,
  },

  cardTitulo: {
  fontSize: 18,
  fontWeight: 'bold',
  flex: 1,              // ocupa o espaço disponível mas não passa
  marginRight: 10,      
},

cardTexto: {
  fontSize: 16,
  marginBottom: 10,
},
statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},

statusAtivo: {
  backgroundColor: '#39c172',
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 5,
  flexShrink: 0,
},

statusVencido: {
  backgroundColor: '#e53935',
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 5,
  flexShrink: 0,
},

statusPendente: {
  backgroundColor: '#f5ba18',
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 5,
  flexShrink: 0,
},
  
statusText: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
},

cardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: 15,
  paddingRight: 4,
},

});