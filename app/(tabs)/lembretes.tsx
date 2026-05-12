import Entypo from "@expo/vector-icons/Entypo";
''
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";

export default () => {
    return (
        <View>
           <View style={styles.NavBarCima}>
               <TouchableOpacity>
               <Entypo name="menu" size={32} color="white" />
               </TouchableOpacity>
            <View style= {styles.logoArea}> 
                <Text style = {styles.TextoNav}>Lembretes</Text> 
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

    SubtitleNav: {
    color: 'white',
    fontSize: 16,
    },
    
    logoArea:{
     marginLeft: 20,
    },
})