import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export default function Perfil() {
  return (

    <><View style={styles.topNavbar}>

      <TouchableOpacity>
        <Entypo name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.logoArea}>
        <Text style={styles.logoText}>GerencIF</Text>
        <Text style={styles.logoSubtitle}>Gestão de Contratos</Text>
      </View>

    </View>
    
    <View style={styles.screen}>

        <ScrollView contentContainerStyle={styles.container}>

          <Text style={styles.title}>
            Contratos Recentes
          </Text>

          <Text style={styles.subtitle}>
            Últimos contratos cadastrados no sistema
          </Text>

          {/* card1 */}
          <View style={styles.card}>

            <View style={styles.topCard}>

              <Text style={styles.cardText}>
                Serviços de Limpeza e Conservação
              </Text>

              <View style={styles.statusAtivo}>
                <Text style={styles.statusText}>Ativo</Text>
              </View>

            </View>

            <Text style={styles.cardSubtitle}>
              Fornecedor: Limpeza Total Serviços
            </Text>

            <Text style={styles.cardSubtitle}>
              Vencimento: 12/07/2026
            </Text>

            <TouchableOpacity style={styles.detalhes}>
              <Text style={styles.detalhesText}>
                Ver detalhes
              </Text>
            </TouchableOpacity>

          </View>

          {/* CARD 2 */}
          <View style={styles.card}>

            <View style={styles.topCard}>

              <Text style={styles.cardText}>
                Fornecimento de materiais de escritório
              </Text>

              <View style={styles.statusVencido}>
                <Text style={styles.statusText}>Vencido</Text>
              </View>

            </View>

            <Text style={styles.cardSubtitle}>
              Fornecedor: Papelaria Central Ltda
            </Text>

            <Text style={styles.cardSubtitle}>
              Vencimento: 15/08/2026
            </Text>

            <TouchableOpacity style={styles.detalhes}>
              <Text style={styles.detalhesText}>
                Ver detalhes
              </Text>
            </TouchableOpacity>

          </View>

          {/* CARD 3 */}
          <View style={styles.card}>

            <View style={styles.topCard}>

              <Text style={styles.cardText}>
                Fornecimento de Equipamentos de Laboratório
              </Text>

              <View style={styles.statusAtivo}>
                <Text style={styles.statusText}>Ativo</Text>
              </View>

            </View>

            <Text style={styles.cardSubtitle}>
              Fornecedor: Laboratórios Avançados S.A.
            </Text>

            <Text style={styles.cardSubtitle}>
              Vencimento: 20/09/2026
            </Text>

            <TouchableOpacity style={styles.detalhes}>
              <Text style={styles.detalhesText}>
                Ver detalhes
              </Text>
            </TouchableOpacity>

          </View>

          {/* CARD 4 */}
          <View style={styles.card}>

            <View style={styles.topCard}>

              <Text style={styles.cardText}>
                Serviço de Alimentação
              </Text>

              <View style={styles.statusPendente}>
                <Text style={styles.statusText}>Pendente</Text>
              </View>

            </View>

            <Text style={styles.cardSubtitle}>
              Fornecedor: Vale Verde Alimentação
            </Text>

            <Text style={styles.cardSubtitle}>
              Vencimento: 20/11/2026
            </Text>

            <TouchableOpacity style={styles.detalhes}>
              <Text style={styles.detalhesText}>
                Ver detalhes
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>

      </View></>
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
    flexGrow: 1,
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