import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { useState } from "react";

export default function Contratos() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState("");

  return (
    <View>
      <View style={styles.NavBarCima}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Entypo name="menu" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.logoArea}>
          <Text style={styles.TextoNav}>Contratos</Text>
          <Text style={styles.SubtitleNav}>GerencIF</Text>
        </View>
      </View>


      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar contratos..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            returnKeyType="search"
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca("")}>
              <Ionicons name="close-circle" size={18} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  NavBarCima: {
    backgroundColor: "#006C5B",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },

  TextoNav: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },

  logoArea: {
    marginLeft: 20,
  },

  SubtitleNav: {
    color: "white",
    fontSize: 16,
  },

  searchContainer: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 0,
  },
});