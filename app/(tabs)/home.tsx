import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions, useNavigation } from "expo-router/react-navigation";

import { router } from "expo-router";
import { useEffect, useState } from "react";

import { supabaseFetch } from "../../lib/supabase";

interface Contrato {
  id_contrato: number;
  identificador_contrato: string;
  objeto_contrato: string | null;
  data_inicio: string | null;
  data_fim: string | null;

  empresa: {
    razao_social: string;
    nome_fantasia: string | null;
  } | null;

  situacao_contrato: {
    situacao: string;
  } | null;
}

export default function Home() {
  const navigation = useNavigation();

  const [contratos, setContratos] = useState<Contrato[]>([]);

  useEffect(() => {
    async function buscarContratos() {
      try {
        const dados = await supabaseFetch(
          "contrato?select=id_contrato,identificador_contrato,objeto_contrato,data_inicio,data_fim,empresa(razao_social,nome_fantasia),situacao_contrato(situacao)&order=id_contrato.desc&limit=5"
        );

        console.log("CONTRATOS RECENTES:", dados);

        setContratos(dados);
      } catch (error) {
        console.error(
          "ERRO AO BUSCAR CONTRATOS RECENTES:",
          error
        );
      }
    }

    buscarContratos();
  }, []);

  function renderStatus(status: string | null) {
    if (status === "Ativo") {
      return styles.statusAtivo;
    }

    if (status === "Vencido") {
      return styles.statusVencido;
    }

    return styles.statusPendente;
  }

  return (
    <>
      <View style={styles.topNavbar}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              DrawerActions.openDrawer()
            )
          }
        >
          <Entypo
            name="menu"
            size={32}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.logoArea}>
          <Text style={styles.logoText}>
            GerencIF
          </Text>

          <Text style={styles.logoSubtitle}>
            Gestão de Contratos
          </Text>
        </View>
      </View>

      <View style={styles.screen}>
        <FlatList
          data={contratos}
          keyExtractor={(item) =>
            item.id_contrato.toString()
          }
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
          ListEmptyComponent={
            <Text style={styles.semResultados}>
              Nenhum contrato encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.topCard}>
                <View style={styles.infoPrincipal}>
                  <Text style={styles.identificador}>
                    {item.identificador_contrato}
                  </Text>

                  <Text style={styles.cardText}>
                    {item.objeto_contrato ||
                      "Objeto não informado"}
                  </Text>
                </View>

                <View
                  style={renderStatus(
                    item.situacao_contrato?.situacao ||
                      null
                  )}
                >
                  <Text style={styles.statusText}>
                    {item.situacao_contrato?.situacao ||
                      "Não informado"}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardSubtitle}>
                Nome da empresa:{" "}
                {item.empresa?.nome_fantasia ||
                  "Não informado"}
              </Text>

              <Text style={styles.cardSubtitle}>
                Data de início:{" "}
                {item.data_inicio
                  ? new Date(
                      item.data_inicio
                    ).toLocaleDateString("pt-BR")
                  : "Não informado"}
              </Text>

              <Text style={styles.cardSubtitle}>
                Data de fim:{" "}
                {item.data_fim
                  ? new Date(
                      item.data_fim
                    ).toLocaleDateString("pt-BR")
                  : "Não informado"}
              </Text>

              <TouchableOpacity
                style={styles.detalhes}
                onPress={() =>
                  router.push({
                    pathname: "/detalhesContrato",
                    params: {
                      id: item.id_contrato.toString(),
                      origem: "home",
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
    backgroundColor: "#006C5B",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 25,
  },

  logoArea: {
    marginLeft: 20,
  },

  logoText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },

  logoSubtitle: {
    color: "white",
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
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },

  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  infoPrincipal: {
    flex: 1,
    marginRight: 10,
  },

  identificador: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006C5B",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },

  cardSubtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 7,
  },

  statusAtivo: {
    backgroundColor: "#39c172",
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 5,
    flexShrink: 0,
  },

  statusVencido: {
    backgroundColor: "#e53935",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexShrink: 0,
  },

  statusPendente: {
    backgroundColor: "#f5ba18",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexShrink: 0,
  },

  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  detalhes: {
    backgroundColor: "#add8d1",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
  },

  detalhesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006C5B",
    textAlign: "center",
  },

  semResultados: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 30,
  },
});