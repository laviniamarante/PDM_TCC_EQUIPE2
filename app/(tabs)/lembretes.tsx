import { useEffect, useState } from "react";

import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

import {
  useNavigation,
  DrawerActions,
} from "expo-router/react-navigation";

import { supabaseFetch } from "../../lib/supabase";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface Lembrete {
  id_notificacao: number;
  titulo: string;
  descricao: string | null;
  tempo_envio: number | null;
  data_criacao: string | null;

  contrato: {
    identificador_contrato: string;
    objeto_contrato: string | null;
    data_fim: string | null;

    situacao_contrato: {
      situacao: string;
    } | null;
  } | null;

  tipo_notificacao: {
    tipo: string;
  } | null;
}

type Filtro = "todos" | "ativo" | "pendente" | "vencido";

export default function Lembretes() {
  const navigation = useNavigation();

  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);

  async function buscarLembretes() {
    try {
      const dados = await supabaseFetch(
        "notificacao?select=id_notificacao,titulo,descricao,tempo_envio,data_criacao,tipo_notificacao(tipo),contrato(identificador_contrato,objeto_contrato,data_fim,situacao_contrato(situacao))&order=data_criacao.desc"
      );

      console.log("LEMBRETES RECEBIDOS:", dados);

      setLembretes(dados);
    } catch (error) {
      console.error(
        "ERRO AO BUSCAR LEMBRETES:",
        error
      );
    }
  }

  useEffect(() => {
    buscarLembretes();
  }, []);

  function descobrirTipo(item: Lembrete): Filtro {
    const status =
      item.contrato?.situacao_contrato?.situacao
        ?.trim()
        .toLowerCase();

    if (status === "vencido") {
      return "vencido";
    }

    if (status === "pendente") {
      return "pendente";
    }

    return "ativo";
  }

  const lembretesFiltrados = lembretes.filter(
    (item) => {
      if (filtro === "todos") {
        return true;
      }

      return descobrirTipo(item) === filtro;
    }
  );

  function renderIcone(tipo: Filtro) {
    if (tipo === "vencido") {
      return (
        <View style={styles.iconeVermelho}>
          <AntDesign
            name="close-circle"
            size={22}
            color="white"
          />
        </View>
      );
    }

    if (tipo === "pendente") {
      return (
        <View style={styles.iconeAmarelo}>
          <MaterialIcons
            name="warning"
            size={24}
            color="white"
          />
        </View>
      );
    }

    return (
      <View style={styles.iconeVerde}>
        <Feather
          name="check-circle"
          size={22}
          color="white"
        />
      </View>
    );
  }

  function formatarData(data: string | null) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(data).toLocaleDateString(
      "pt-BR"
    );
  }

  return (
    <View style={styles.container}>

      {/* NAVBAR */}

      <View style={styles.NavBarCima}>

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
          <Text style={styles.TextoNav}>
            Lembretes
          </Text>

          <Text style={styles.SubtitleNav}>
            GerencIF
          </Text>
        </View>

      </View>

      {/* FILTROS */}

      <View style={styles.areaFiltros}>

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "todos" &&
              styles.botaoFiltroSelecionado,
          ]}
          onPress={() => setFiltro("todos")}
        >
          <Text
            style={
              filtro === "todos"
                ? styles.textoFiltroSelecionado
                : undefined
            }
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "ativo" &&
              styles.botaoFiltroSelecionado,
          ]}
          onPress={() => setFiltro("ativo")}
        >
          <Text
            style={
              filtro === "ativo"
                ? styles.textoFiltroSelecionado
                : undefined
            }
          >
            Ativos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "pendente" &&
              styles.botaoFiltroSelecionado,
          ]}
          onPress={() => setFiltro("pendente")}
        >
          <Text
            style={
              filtro === "pendente"
                ? styles.textoFiltroSelecionado
                : undefined
            }
          >
            Pendentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "vencido" &&
              styles.botaoFiltroSelecionado,
          ]}
          onPress={() => setFiltro("vencido")}
        >
          <Text
            style={
              filtro === "vencido"
                ? styles.textoFiltroSelecionado
                : undefined
            }
          >
            Vencidos
          </Text>
        </TouchableOpacity>

      </View>

      {/* LISTA */}

      <FlatList
        data={lembretesFiltrados}

        keyExtractor={(item) =>
          item.id_notificacao.toString()
        }

        ListEmptyComponent={
          <Text style={styles.semResultados}>
            Nenhum lembrete encontrado.
          </Text>
        }

        renderItem={({ item }) => {

          const tipo = descobrirTipo(item);

          return (
            <View style={styles.card}>

              {renderIcone(tipo)}

              <View style={styles.areaTexto}>

                {/* IDENTIFICADOR DO CONTRATO */}

                <Text style={styles.identificador}>
                  {item.contrato?.identificador_contrato}
                </Text>

                <Text style={styles.tituloCard}>
                  {item.titulo}
                </Text>

                <Text style={styles.tempoTexto}>
                  {item.tempo_envio !== null
                    ? `Enviar ${item.tempo_envio} dias antes`
                    : `Criado em ${formatarData(
                        item.data_criacao
                      )}`}
                </Text>

                <Text style={styles.subtituloCard}>
                  {item.contrato?.objeto_contrato ||
                    item.descricao ||
                    "Contrato não informado"}
                </Text>

                {item.contrato?.data_fim && (
                  <Text style={styles.dataVencimento}>
                    Vencimento:{" "}
                    {formatarData(
                      item.contrato.data_fim
                    )}
                  </Text>
                )}

              </View>

            </View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
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

  SubtitleNav: {
    color: "white",
    fontSize: 16,
  },

  logoArea: {
    marginLeft: 20,
  },

  areaFiltros: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },

  botaoFiltro: {
    backgroundColor: "white",

    paddingVertical: 8,
    paddingHorizontal: 15,

    borderRadius: 20,

    elevation: 2,
  },

  botaoFiltroSelecionado: {
    backgroundColor: "#006C5B",
  },

  textoFiltroSelecionado: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",

    backgroundColor: "white",

    padding: 20,
    margin: 10,

    borderRadius: 10,

    elevation: 3,
  },

  areaTexto: {
    flex: 1,
  },

  identificador: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006C5B",
    marginBottom: 4,
  },

  tituloCard: {
    fontSize: 18,
    fontWeight: "bold",
  },

  subtituloCard: {
    fontSize: 15,
    color: "gray",
  },

  tempoTexto: {
    fontSize: 14,
    color: "#999",

    marginTop: 5,
    marginBottom: 6,
  },

  dataVencimento: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  iconeVerde: {
    backgroundColor: "#39c172",

    width: 45,
    height: 45,

    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  iconeAmarelo: {
    backgroundColor: "#f5ba18",

    width: 45,
    height: 45,

    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  iconeVermelho: {
    backgroundColor: "#e53935",

    width: 45,
    height: 45,

    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  semResultados: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
    fontSize: 16,
  },

});