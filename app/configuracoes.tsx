import { Text, TouchableOpacity, View, StyleSheet} from "react-native";
import { useNavigation, DrawerActions } from "expo-router/react-navigation";
import Entypo from "@expo/vector-icons/Entypo";
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Configuracoes() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.NavBarCima}>
                <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Entypo name="menu" size={32} color="white" />
                </TouchableOpacity>
            <View style={styles.logoArea}> 
                <Text style={styles.TextoNav}>Configurações </Text> 
                <Text style={styles.SubtitleNav}>GerencIF</Text>
            </View>
            </View>
          <TouchableOpacity style={styles.card} onPress={() => router.replace('/login')}>
        <Feather name="log-out" size={20} color="#000" />
        <Text style={styles.cardText}>Sair</Text>
      </TouchableOpacity>

        </View>
    );   
}
const styles = StyleSheet.create({
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

    logoArea:{
     marginLeft: 20,
    },
    SubtitleNav: {
    color: 'white',
    fontSize: 16,
     },

     card: {
       alignItems: 'center',
       paddingVertical: 16,
       paddingHorizontal: 20,
       width: '100%',
       borderBottomWidth: 1,
       borderBottomColor: '#ccc',
       backgroundColor: '#f5f5f5',
       flexDirection: 'row',
       
},

cardText: {
  marginLeft: 10,
  fontSize: 16,
},


})