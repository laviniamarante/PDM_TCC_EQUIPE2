import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabaseFetch } from "../lib/supabase";

interface Contrato {
  id_contrato: number;
  objeto_contrato: string | null;
  numero_processo_celebracao: string | null;
  data_inicio: string | null;
  data_fim: string | null;
  valor_global: number | null;

  empresa: {
    razao_social: string;
    nome_fantasia: string | null;
  };

  situacao_contrato: {
    situacao: string;
  } | null;
}

export default function Contratos() {
  const navigation = useNavigation();
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [contratos, setContratos] = useState<Contrato[]>([]);

  async function buscarContratos() {
  try {
    const dados = await supabaseFetch(
  "contrato?select=id_contrato,objeto_contrato,numero_processo_celebracao,data_inicio,data_fim,valor_global,empresa(razao_social,nome_fantasia),situacao_contrato(situacao)"
);

    console.log("CONTRATOS RECEBIDOS:", dados);

    setContratos(dados);
  } catch (error) {
    console.error("ERRO AO BUSCAR CONTRATOS:", error);
  }
}

  useEffect(() => {
    buscarContratos();
  }, []);

  const contratosFiltrados = contratos.filter((contrato) => {
    const textoBusca = busca.toLowerCase();

    return (
      contrato.objeto_contrato
        ?.toLowerCase()
        .includes(textoBusca) ||
      contrato.numero_processo_celebracao
        ?.toLowerCase()
        .includes(textoBusca) ||
      contrato.empresa?.razao_social
        ?.toLowerCase()
        .includes(textoBusca) ||
      contrato.empresa?.nome_fantasia
        ?.toLowerCase()
        .includes(textoBusca)
    );
  });

  return (
    <View style={styles.containerTela}>
      <View style={styles.NavBarCima}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(DrawerActions.openDrawer())
          }
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
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={styles.searchIcon}
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
              <Ionicons
                name="close-circle"
                size={18}
                color="#aaa"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={contratosFiltrados}
        keyExtractor={(item) => item.id_contrato.toString()}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.semResultados}>
            Nenhum contrato encontrado.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/detalhesContrato",
                params: {
                  id: item.id_contrato.toString(),
                  origem: "contratos",
                },
              })
            }
          >
            <Text style={styles.cardTitulo}>
              {item.objeto_contrato || "Objeto não informado"}
            </Text>

            <Text style={styles.cardTexto}>
              Fornecedor:{" "}
              {item.empresa?.nome_fantasia ||
                item.empresa?.razao_social ||
                "Não informado"}
            </Text>

            <Text style={styles.cardTexto}>
              Início:{" "}
              {item.data_inicio
                ? new Date(item.data_inicio).toLocaleDateString(
                    "pt-BR"
                  )
                : "Não informado"}
            </Text>

            <Text style={styles.cardTexto}>
              Vencimento:{" "}
              {item.data_fim
                ? new Date(item.data_fim).toLocaleDateString(
                    "pt-BR"
                  )
                : "Não informado"}
            </Text>

            <Text style={styles.cardTexto}>
              Valor:{" "}
              {item.valor_global !== null
                ? item.valor_global.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "Não informado"}
            </Text>

            <Text style={styles.cardTexto}>
              Status:{" "}
              {item.situacao_contrato?.situacao ||
                "Não informado"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  cardTexto: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },

  semResultados: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
    fontSize: 16,
  },
});