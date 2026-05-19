import Entypo from "@expo/vector-icons/Entypo";
import { Text, TouchableOpacity, View, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

export default function Contratos() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.NavBarCima}>
                <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Entypo name="menu" size={32} color="white" />
                </TouchableOpacity>
            <View style={styles.logoArea}> 
                <Text style={styles.TextoNav}>Contratos</Text> 
                <Text style={styles.SubtitleNav}>GerencIF</Text>
            </View>
            </View>
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

})