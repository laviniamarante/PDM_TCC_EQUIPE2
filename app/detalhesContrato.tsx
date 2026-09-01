import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabaseFetch } from "../lib/supabase";

interface Contrato {
  id_contrato: number;

  identificador_contrato: string;
  vigencia: number | null;
  data_inicio: string | null;
  data_fim: string | null;
  prorrogavel: boolean;

  numero_processo_celebracao: string | null;
  prazo_restante: number | null;

  nota_empenho: string | null;
  natureza_contrato: string | null;
  portaria_fiscalizacao: string | null;

  objeto_contrato: string | null;

  fiscal_substituto: string | null;

  dados_licitacao: string | null;
  processo_gestao: string | null;

  data_celebracao: string | null;

  fonte_recurso: string | null;
  natureza_despesa: string | null;
  numero_evento: string | null;

  link_pasta_gestao: string | null;

  fiscal_titular: string | null;
  situacao_gov: string | null;

  endereco_postal: string | null;

  valor_global: number | null;
  uasg: string | null;
  valor_mensal: number | null;

  cpf_representante: string | null;
  conta_vinculada: string | null;

  link_processo_eletronico: string | null;

  gestor_titular: string | null;
  plano_interno: string | null;
  rg_representante: string | null;
  programa_trabalho: string | null;

  representante_legal: string | null;
  gestor_substituto: string | null;

  email_contato: string | null;

  link_pregao_srp: string | null;

  id_empresa: number;
  id_categoria: number;
  id_verba: number;
  id_situacao_contrato: number | null;

  empresa: {
    id_empresa: number;
    cnpj: string;
    email: string | null;
    telefone: string | null;
    endereco: string | null;
    razao_social: string;
    nome_fantasia: string | null;
  } | null;

  categoria: {
    id_categoria: number;
    nome: string;
  } | null;

  verba: {
    id_verba: number;
    descricao: string;
    valor_disponivel: number | null;
    valor_utilizado: number | null;
  } | null;

  situacao_contrato: {
    id_situacao_contrato: number;
    situacao: string;
  } | null;

  prorrogacao: {
    id_prorrogacao: number;
    novo_prazo: number | null;
    novo_valor: number | null;
  }[];

  pagamento: {
    id_pagamento: number;
    descricao: string | null;
    valor_pago: number;
  }[];

  notificacao: {
    id_notificacao: number;
    tempo_envio: number | null;
    titulo: string;
    descricao: string | null;
    data_criacao: string | null;

    tipo_notificacao: {
      id_tipo_notificacao: number;
      tipo: string;
    } | null;
  }[];
}


/* =========================================
   CONTEXTO DA PESQUISA
========================================= */

const PesquisaContext = createContext("");

function usePesquisa() {
  return useContext(PesquisaContext);
}


/* =========================================
   TELA DE DETALHES
========================================= */

export default function DetalhesContrato() {
  const router = useRouter();

  const { id, origem } = useLocalSearchParams();

  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    async function buscarContrato() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await supabaseFetch(
          `contrato?select=*,empresa(*),categoria(*),verba(*),situacao_contrato(*),prorrogacao(*),pagamento(*),notificacao(*,tipo_notificacao(*))&id_contrato=eq.${id}`
        );

        console.log("DETALHES DO CONTRATO:", dados);

        if (!dados || dados.length === 0) {
          setContrato(null);
          setErro("Contrato não encontrado.");
          return;
        }

        setContrato(dados[0]);
      } catch (error) {
        console.error("ERRO AO BUSCAR CONTRATO:", error);
        setErro("Não foi possível carregar os dados do contrato.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      buscarContrato();
    }
  }, [id]);


  function formatarData(data: string | null) {
    if (!data) {
      return "Não informado";
    }

    return new Date(data).toLocaleDateString("pt-BR");
  }


  function formatarDataHora(data: string | null) {
    if (!data) {
      return "Não informado";
    }

    return new Date(data).toLocaleString("pt-BR");
  }


  function formatarValor(valor: number | null) {
    if (valor === null || valor === undefined) {
      return "Não informado";
    }

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }


  function formatarBooleano(valor: boolean) {
    return valor ? "Sim" : "Não";
  }


  function renderStatus(status: string) {
    if (status === "Ativo") {
      return styles.statusAtivo;
    }

    if (status === "Vencido") {
      return styles.statusVencido;
    }

    if (status === "Pendente") {
      return styles.statusPendente;
    }

    return styles.statusPendente;
  }


  function voltar() {
    router.replace(
      origem === "contratos"
        ? "/contratos"
        : "/(tabs)/home"
    );
  }


  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#006C5B"
        />

        <Text style={styles.loadingText}>
          Carregando contrato...
        </Text>
      </View>
    );
  }


  if (erro || !contrato) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.erroText}>
          {erro || "Contrato não encontrado."}
        </Text>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={voltar}
        >
          <Text style={styles.botaoVoltarTexto}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <PesquisaContext.Provider value={pesquisa}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.topBar} />


        {/* CABEÇALHO */}

        <View style={styles.header}>

          <View style={styles.headerRow}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={voltar}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="black"
              />
            </TouchableOpacity>


            <View style={styles.headerText}>

              <Text style={styles.titulo}>
                Detalhes do contrato
              </Text>

              <Text style={styles.subtitulo}>
                Visualize todas as informações do contrato
              </Text>

            </View>

          </View>

        </View>


        {/* BARRA DE PESQUISA */}

        <View style={styles.searchContainer}>

          <Feather
            name="search"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar nos detalhes..."
            placeholderTextColor="#999"
            value={pesquisa}
            onChangeText={setPesquisa}
            returnKeyType="search"
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity
              onPress={() => setPesquisa("")}
              style={styles.clearButton}
            >
              <Feather
                name="x"
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          )}

        </View>


        {/* IDENTIFICAÇÃO DO CONTRATO */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Identificação do contrato
          </Text>

          <Text style={styles.cardTitulo}>
            {contrato.objeto_contrato ||
              "Objeto não informado"}
          </Text>


          <View
            style={renderStatus(
              contrato?.situacao_contrato?.situacao ??
                "Pendente"
            )}
          >
            <Text style={styles.statusText}>
              {contrato?.situacao_contrato?.situacao ??
                "Não informado"}
            </Text>
          </View>


          <Item
            label="Objeto do contrato"
            value={contrato.objeto_contrato}
          />

          <Item
            label="Identificador do contrato"
            value={contrato.identificador_contrato}
          />

          <Item
            label="Vigência"
            value={
              contrato.vigencia !== null
                ? `${contrato.vigencia} meses`
                : null
            }
          />

          <Item
            label="Data de início"
            value={formatarData(contrato.data_inicio)}
          />

          <Item
            label="Data de fim"
            value={formatarData(contrato.data_fim)}
          />

          <Item
            label="Prorrogável"
            value={formatarBooleano(contrato.prorrogavel)}
          />

          <Item
            label="Prazo restante"
            value={
              contrato.prazo_restante !== null
                ? `${contrato.prazo_restante} meses`
                : null
            }
          />

          <Item
            label="Data de celebração"
            value={formatarData(contrato.data_celebracao)}
          />

          <Item
            label="Representante legal"
            value={contrato.representante_legal}
          />

        </View>


        {/* EMPRESA */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Empresa
          </Text>

          <Item
            label="Razão social"
            value={contrato.empresa?.razao_social}
          />

          <Item
            label="Nome fantasia"
            value={contrato.empresa?.nome_fantasia}
          />

          <Item
            label="CNPJ"
            value={contrato.empresa?.cnpj}
          />

          <Item
            label="E-mail"
            value={contrato.empresa?.email}
          />

          <Item
            label="Telefone"
            value={contrato.empresa?.telefone}
          />

          <Item
            label="Endereço"
            value={contrato.empresa?.endereco}
          />

        </View>


        {/* CLASSIFICAÇÃO */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Classificação
          </Text>

          <Item
            label="Categoria"
            value={contrato.categoria?.nome}
          />

          <Item
            label="Situação do contrato"
            value={contrato.situacao_contrato?.situacao}
          />

          <Item
            label="Situação no governo"
            value={contrato.situacao_gov}
          />

          <Item
            label="Natureza do contrato"
            value={contrato.natureza_contrato}
          />

        </View>


        {/* PROCESSOS E DOCUMENTOS */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Processos e documentos
          </Text>

          <Item
            label="Número do processo de celebração"
            value={contrato.numero_processo_celebracao}
          />

          <Item
            label="Nota de empenho"
            value={contrato.nota_empenho}
          />

          <Item
            label="Dados da licitação"
            value={contrato.dados_licitacao}
          />

          <Item
            label="Processo de gestão"
            value={contrato.processo_gestao}
          />

          <Item
            label="Portaria de fiscalização"
            value={contrato.portaria_fiscalizacao}
          />

          <Item
            label="Link da pasta de gestão"
            value={contrato.link_pasta_gestao}
          />

          <Item
            label="Link do processo eletrônico"
            value={contrato.link_processo_eletronico}
          />

          <Item
            label="Link do pregão SRP"
            value={contrato.link_pregao_srp}
          />

        </View>


        {/* FISCALIZAÇÃO E GESTÃO */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Fiscalização e gestão
          </Text>

          <Item
            label="Fiscal titular"
            value={contrato.fiscal_titular}
          />

          <Item
            label="Fiscal substituto"
            value={contrato.fiscal_substituto}
          />

          <Item
            label="Gestor titular"
            value={contrato.gestor_titular}
          />

          <Item
            label="Gestor substituto"
            value={contrato.gestor_substituto}
          />

        </View>


        {/* VALORES E ORÇAMENTO */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Valores e orçamento
          </Text>

          <Item
            label="Valor global"
            value={formatarValor(contrato.valor_global)}
          />

          <Item
            label="Valor mensal"
            value={formatarValor(contrato.valor_mensal)}
          />

          <Item
            label="Fonte de recurso"
            value={contrato.fonte_recurso}
          />

          <Item
            label="Natureza da despesa"
            value={contrato.natureza_despesa}
          />

          <Item
            label="Número do evento"
            value={contrato.numero_evento}
          />

          <Item
            label="UASG"
            value={contrato.uasg}
          />

          <Item
            label="Plano interno"
            value={contrato.plano_interno}
          />

          <Item
            label="Programa de trabalho"
            value={contrato.programa_trabalho}
          />

          <Item
            label="Conta vinculada"
            value={contrato.conta_vinculada}
          />

        </View>


        {/* VERBA */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Verba
          </Text>

          <Item
            label="Descrição"
            value={contrato.verba?.descricao}
          />

          <Item
            label="Valor disponível"
            value={formatarValor(
              contrato.verba?.valor_disponivel ?? null
            )}
          />

          <Item
            label="Valor utilizado"
            value={formatarValor(
              contrato.verba?.valor_utilizado ?? null
            )}
          />

        </View>


        {/* REPRESENTANTE LEGAL */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Representante legal
          </Text>

          <Item
            label="Nome"
            value={contrato.representante_legal}
          />

          <Item
            label="CPF"
            value={contrato.cpf_representante}
          />

          <Item
            label="RG"
            value={contrato.rg_representante}
          />

          <Item
            label="E-mail de contato"
            value={contrato.email_contato}
          />

          <Item
            label="Endereço postal"
            value={contrato.endereco_postal}
          />

        </View>


        {/* PRORROGAÇÕES */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Prorrogações
          </Text>

          {contrato.prorrogacao &&
          contrato.prorrogacao.length > 0 ? (

            contrato.prorrogacao.map((item) => (

              <View
                key={item.id_prorrogacao}
                style={styles.subCard}
              >

                <Item
                  label="Novo prazo"
                  value={
                    item.novo_prazo !== null
                      ? `${item.novo_prazo} meses`
                      : null
                  }
                />

                <Item
                  label="Novo valor"
                  value={formatarValor(item.novo_valor)}
                />

              </View>

            ))

          ) : (

            <Text style={styles.semInformacao}>
              Nenhuma prorrogação registrada.
            </Text>

          )}

        </View>


        {/* PAGAMENTOS */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Pagamentos
          </Text>

          {contrato.pagamento &&
          contrato.pagamento.length > 0 ? (

            contrato.pagamento.map((item) => (

              <View
                key={item.id_pagamento}
                style={styles.subCard}
              >

                <Item
                  label="Descrição"
                  value={item.descricao}
                />

                <Item
                  label="Valor pago"
                  value={formatarValor(item.valor_pago)}
                />

              </View>

            ))

          ) : (

            <Text style={styles.semInformacao}>
              Nenhum pagamento registrado.
            </Text>

          )}

        </View>


        {/* NOTIFICAÇÕES */}

        <View style={styles.card}>

          <Text style={styles.secaoTitulo}>
            Notificações
          </Text>

          {contrato.notificacao &&
          contrato.notificacao.length > 0 ? (

            contrato.notificacao.map((item) => (

              <View
                key={item.id_notificacao}
                style={styles.subCard}
              >

                <Item
                  label="Tipo"
                  value={item.tipo_notificacao?.tipo}
                />

                <Item
                  label="Título"
                  value={item.titulo}
                />

                <Item
                  label="Descrição"
                  value={item.descricao}
                />

                <Item
                  label="Tempo para envio"
                  value={
                    item.tempo_envio !== null
                      ? `${item.tempo_envio} dias`
                      : null
                  }
                />

                <Item
                  label="Data de criação"
                  value={formatarDataHora(
                    item.data_criacao
                  )}
                />

              </View>

            ))

          ) : (

            <Text style={styles.semInformacao}>
              Nenhuma notificação registrada.
            </Text>

          )}

        </View>

      </ScrollView>

    </PesquisaContext.Provider>
  );
}


/* =========================================
   ITEM
========================================= */

function Item({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {

  const pesquisa = usePesquisa();

  const textoPesquisa = pesquisa
    .trim()
    .toLowerCase();

  const textoLabel = label.toLowerCase();

  const textoValor = String(
    value ?? ""
  ).toLowerCase();


  const corresponde =
    textoPesquisa === "" ||
    textoLabel.includes(textoPesquisa) ||
    textoValor.includes(textoPesquisa);


  if (!corresponde) {
    return null;
  }


  return (
    <View style={styles.item}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.valor}>
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? String(value)
          : "Não informado"}
      </Text>

    </View>
  );
}


/* =========================================
   ESTILOS
========================================= */

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F5F3F4",
    alignItems: "center",
    paddingBottom: 30,
  },


  topBar: {
    backgroundColor: "#006C5B",
    width: "100%",
    paddingTop: 60,
    paddingBottom: 25,
  },


  header: {
    width: "90%",
    paddingVertical: 20,
  },


  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },


  backButton: {
    marginRight: 12,
  },


  headerText: {
    flex: 1,
  },


  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },


  subtitulo: {
    color: "gray",
    fontSize: 15,
  },


  /* BARRA DE PESQUISA */

  searchContainer: {
    width: "90%",
    height: 48,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },


  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },


  clearButton: {
    padding: 3,
  },


  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
  },


  secaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006C5B",
    marginBottom: 15,
  },


  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },


  item: {
    marginBottom: 12,
  },


  label: {
    fontSize: 13,
    color: "#777",
    marginBottom: 3,
  },


  valor: {
    fontSize: 15,
    color: "#333",
  },


  subCard: {
    backgroundColor: "#F5F3F4",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },


  statusAtivo: {
    backgroundColor: "#39c172",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 15,
  },


  statusVencido: {
    backgroundColor: "#e53935",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 15,
  },


  statusPendente: {
    backgroundColor: "#f5ba18",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 15,
  },


  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },


  semInformacao: {
    color: "#777",
    fontSize: 14,
  },


  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F3F4",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },


  loadingText: {
    marginTop: 10,
    color: "#666",
  },


  erroText: {
    color: "#e53935",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },


  botaoVoltar: {
    backgroundColor: "#006C5B",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },


  botaoVoltarTexto: {
    color: "white",
    fontWeight: "bold",
  },

});