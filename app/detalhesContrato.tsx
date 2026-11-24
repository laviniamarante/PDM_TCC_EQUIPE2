import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ComponentRef,
} from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase, supabaseFetch } from "../lib/supabase";

interface Contrato {
  id_contrato: number;
  identificador_contrato: string;
  vigencia: number;
  data_inicio: string;
  data_fim: string;
  prorrogavel: boolean;
  numero_processo_celebracao: string | null;
  prazo_restante: number | null;
  nota_empenho: string | null;
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
    nome_contratada: string | null;
    natureza_contrato: string | null;
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

const PesquisaContext = createContext("");
const usePesquisa = () => useContext(PesquisaContext);

export default function DetalhesContrato() {
  const router = useRouter();
  const scrollRef = useRef<ComponentRef<typeof ScrollView> | null>(null);
  const { id, origem } = useLocalSearchParams();
  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  const idContrato = Array.isArray(id) ? id[0] : id;

  async function carregarComentarios() {
    try {
      const { data, error } = await supabase
        .from("comentario_fiscal")
        .select("*")
        .eq("id_contrato", Number(idContrato))
        .order("data_criacao", { ascending: false });

      if (error) throw error;

      setComentarios(data || []);
    } catch (erro) {
      console.log("Erro ao carregar comentários:", erro);
    }
  }

  async function abrirLink(link: string) {
    if (!link) return;

    const url =
      link.startsWith("http://") || link.startsWith("https://")
        ? link
        : `https://${link}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir este link.");
    }
  }

  useEffect(() => {
    if (idContrato) {
      carregarComentarios();
    }
  }, [idContrato]);

  useEffect(() => {
    async function buscarContrato() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await supabaseFetch(
          `contrato?select=*,empresa(*),verba(*),situacao_contrato(*),prorrogacao(*),pagamento(*),notificacao(*,tipo_notificacao(*))&id_contrato=eq.${idContrato}`
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

    if (idContrato) buscarContrato();
  }, [idContrato]);

  async function enviarComentario() {
    if (!novoComentario.trim()) {
      Alert.alert("Atenção", "Digite um comentário antes de enviar.");
      return;
    }

    try {
      setEnviandoComentario(true);

      // Identifica o usuário autenticado
      const {
        data: { user },
        error: erroUsuario,
      } = await supabase.auth.getUser();

      if (erroUsuario) throw erroUsuario;

      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      // Busca o cadastro da pessoa
      const { data: pessoa, error: erroPessoa } = await supabase
        .from("pessoa")
        .select("id_pessoa")
        .eq("id_auth", user.id)
        .single();

      if (erroPessoa) throw erroPessoa;

      // Salva o comentário
      const { error: erroEnvio } = await supabase
        .from("comentario_fiscal")
        .insert({
          id_contrato: Number(idContrato),
          id_pessoa: pessoa.id_pessoa,
          comentario: novoComentario.trim(),
        });

      if (erroEnvio) throw erroEnvio;

      setNovoComentario("");
      Alert.alert("Sucesso", "Comentário enviado com sucesso!");

      await carregarComentarios();
    } catch (erro) {
      console.log("Erro ao enviar comentário:", erro);
      Alert.alert(
        "Erro",
        "Não foi possível enviar o comentário."
      );
    } finally {
      setEnviandoComentario(false);
    }
  }

  const formatarData = (data: string | null) =>
    data ? new Date(data).toLocaleDateString("pt-BR") : "Não informado";

  const formatarDataHora = (data: string | null) =>
    data ? new Date(data).toLocaleString("pt-BR") : "Não informado";

  const formatarValor = (valor: number | null | undefined) => {
    if (valor === null || valor === undefined) return "Não informado";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarBooleano = (valor: boolean) => (valor ? "Sim" : "Não");

  const voltar = () =>
    router.replace(origem === "contratos" ? "/contratos" : "/(tabs)/home");

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006C5B" />
        <Text style={styles.loadingText}>Carregando contrato...</Text>
      </View>
    );
  }

  if (erro || !contrato) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.erroText}>{erro || "Contrato não encontrado."}</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <PesquisaContext.Provider value={pesquisa}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
        <View style={styles.topBar} />

        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={voltar}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.titulo}>Detalhes do contrato</Text>
              <Text style={styles.subtitulo}>
                Visualize todas as informações do contrato
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#777" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar nos detalhes..."
            placeholderTextColor="#999"
            value={pesquisa}
            onChangeText={setPesquisa}
            returnKeyType="search"
          />
          {pesquisa.length > 0 ? (
            <TouchableOpacity
              onPress={() => setPesquisa("")}
              style={styles.clearButton}
            >
              <Feather name="x" size={20} color="#777" />
            </TouchableOpacity>
          ) : null}
        </View>

        <Card title="Identificação do Contrato" icone="file-text">
          <Item label="Nome da Contratada" value={contrato.empresa?.nome_contratada} />
          <Item label="Objeto do Contrato" value={contrato.objeto_contrato} />
          <Item label="Identificador do Contrato" value={contrato.identificador_contrato} />
          <Item
            label="Vigência"
            value={
              contrato.vigencia !== null && contrato.vigencia !== undefined
                ? `${contrato.vigencia} meses`
                : null
            }
          />
          <Item label="Data de Início" value={formatarData(contrato.data_inicio)} />
          <Item label="Data de Fim" value={formatarData(contrato.data_fim)} />
          <Item label="Prorrogável" value={formatarBooleano(contrato.prorrogavel)} />
          <Item
            label="Prazo Restante"
            value={
              contrato.prazo_restante !== null &&
              contrato.prazo_restante !== undefined
                ? `${contrato.prazo_restante} meses`
                : null
            }
          />
          <Item label="Data de Celebração" value={formatarData(contrato.data_celebracao)} />
          <Item label="Representante Legal" value={contrato.representante_legal} />
        </Card>

        <Card title="Empresa" icone="briefcase">
          <Item label="Natureza do Contrato" value={contrato.empresa?.natureza_contrato} />
          <Item label="CNPJ" value={contrato.empresa?.cnpj} />
          <Item label="E-mail" value={contrato.empresa?.email} />
          <Item label="Telefone" value={contrato.empresa?.telefone} />
          <Item label="Endereço" value={contrato.empresa?.endereco} />
        </Card>

        <Card title="Classificação" icone="briefcase">
          <Item label="Situação do Contrato" value={contrato.situacao_contrato?.situacao} />
          <Item label="Situação no Gov" value={contrato.situacao_gov} />
          <Item label="Natureza do Contrato" value={contrato.empresa?.natureza_contrato} />
        </Card>

        <Card title="Processos e Documentos" icone="link">
          <Item label="Número do Processo de Celebração" value={contrato.numero_processo_celebracao} />
          <Item label="Nota de Empenho" value={contrato.nota_empenho} />
          <Item label="Dados da Licitação" value={contrato.dados_licitacao} />
          <Item label="Processo de Gestão" value={contrato.processo_gestao} />
          <Item label="Portaria de Fiscalização" value={contrato.portaria_fiscalizacao} />

          <LinkItem
            label="Link da pasta de gestão"
            texto="Abrir pasta de gestão"
            link={contrato.link_pasta_gestao}
            onPress={abrirLink}
          />
          <LinkItem
            label="Link do processo eletrônico"
            texto="Abrir processo eletrônico"
            link={contrato.link_processo_eletronico}
            onPress={abrirLink}
          />
          <LinkItem
            label="Link do pregão SRP"
            texto="Abrir pregão SRP"
            link={contrato.link_pregao_srp}
            onPress={abrirLink}
          />
        </Card>

        <Card title="Fiscalização e Gestão" icone="user">
          <Item label="Fiscal Titular" value={contrato.fiscal_titular} />
          <Item label="Fiscal Substituto" value={contrato.fiscal_substituto} />
          <Item label="Gestor Titular" value={contrato.gestor_titular} />
          <Item label="Gestor Substituto" value={contrato.gestor_substituto} />
        </Card>

        <Card title="Valores e Orçamento" icone="dollar-sign">
          <Item label="Valor Global" value={formatarValor(contrato.valor_global)} />
          <Item label="Valor Mensal" value={formatarValor(contrato.valor_mensal)} />
          <Item label="Fonte de Recurso" value={contrato.fonte_recurso} />
          <Item label="Natureza da Despesa" value={contrato.natureza_despesa} />
          <Item label="Número do Evento" value={contrato.numero_evento} />
          <Item label="UASG" value={contrato.uasg} />
          <Item label="Plano Interno" value={contrato.plano_interno} />
          <Item label="Programa de Trabalho" value={contrato.programa_trabalho} />
          <Item label="Conta Vinculada" value={contrato.conta_vinculada} />
        </Card>

        <Card title="Verba" icone="dollar-sign">
          <Item label="Descrição" value={contrato.verba?.descricao} />
          <Item
            label="Valor Disponível"
            value={formatarValor(contrato.verba?.valor_disponivel)}
          />
          <Item
            label="Valor Utilizado"
            value={formatarValor(contrato.verba?.valor_utilizado)}
          />
        </Card>

        <Card title="Representante Legal" icone="user">
          <Item label="Nome" value={contrato.representante_legal} />
          <Item label="CPF" value={contrato.cpf_representante} />
          <Item label="RG" value={contrato.rg_representante} />
          <Item label="E-mail de contato" value={contrato.email_contato} />
          <Item label="Endereço Postal" value={contrato.endereco_postal} />
        </Card>

        <Card title="Prorrogações" icone="calendar">
          {contrato.prorrogacao && contrato.prorrogacao.length > 0 ? (
            contrato.prorrogacao.map((item) => (
              <View key={item.id_prorrogacao} style={styles.subCard}>
                <Item
                  label="Novo Prazo"
                  value={
                    item.novo_prazo !== null && item.novo_prazo !== undefined
                      ? `${item.novo_prazo} meses`
                      : null
                  }
                />
                <Item label="Novo Valor" value={formatarValor(item.novo_valor)} />
              </View>
            ))
          ) : (
            <Text style={styles.semInformacao}>
              Nenhuma prorrogação registrada.
            </Text>
          )}
        </Card>

        <Card title="Pagamentos" icone="dollar-sign">
          {contrato.pagamento && contrato.pagamento.length > 0 ? (
            contrato.pagamento.map((item) => (
              <View key={item.id_pagamento} style={styles.subCard}>
                <Item label="Descrição" value={item.descricao} />
                <Item label="Valor Pago" value={formatarValor(item.valor_pago)} />
              </View>
            ))
          ) : (
            <Text style={styles.semInformacao}>
              Nenhum pagamento registrado.
            </Text>
          )}
        </Card>

        <Card title="Notificações" icone="bell">
          <View style={styles.notificacaoResumo}>
            <View style={styles.notificacaoInfo}>
              <Text style={styles.notificacaoQuantidade}>
                {`${contrato.notificacao?.length || 0} notificações`}
              </Text>
              <Text style={styles.notificacaoDescricao}>
                Histórico de notificações deste contrato
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoHistorico}
              onPress={() => setMostrarHistorico(true)}
            >
              <Text style={styles.textoBotaoHistorico}>Ver histórico</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card title="Comentários e Solicitações" icone="message-square">
          {comentarios.length === 0 ? (
            <View style={styles.comentarioVazio}>
              <Feather name="message-circle" size={30} color="#999" />
              <Text style={styles.comentarioVazioTexto}>
                Nenhum comentário registrado.
              </Text>
            </View>
          ) : (
            comentarios.map((item) => (
              <View key={item.id_comentario} style={styles.comentarioVazio}>
                <Text style={styles.label}>
                  {item.data_criacao
                    ? new Date(item.data_criacao).toLocaleString("pt-BR")
                    : "Data não informada"}
                </Text>

                <Text style={styles.comentarioVazioTexto}>
                  {item.comentario}
                </Text>

                <Text style={styles.label}>
                  {`Status: ${item.status ?? "Não informado"}`}
                </Text>
              </View>
            ))
          )}

          <Text style={styles.label}>Novo comentário</Text>

          <TextInput
            style={styles.inputComentario}
            placeholder="Descreva sua solicitação ou observação..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={novoComentario}
            onChangeText={setNovoComentario}
            onFocus={() => {
              setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />

          <TouchableOpacity
            style={[
              styles.botaoComentario,
              enviandoComentario && styles.botaoDesabilitado,
            ]}
            onPress={enviarComentario}
            disabled={enviandoComentario}
          >
            {enviandoComentario ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Feather name="send" size={17} color="#FFFFFF" />
            )}
            <Text style={styles.textoBotaoComentario}>
              {enviandoComentario ? "Enviando..." : "Enviar comentário"}
            </Text>
          </TouchableOpacity>
        </Card>

        <Modal
          visible={mostrarHistorico}
          transparent
          animationType="slide"
          onRequestClose={() => setMostrarHistorico(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalHistorico}>
              <View style={styles.modalCabecalho}>
                <Text style={styles.modalTitulo}>Histórico de notificações</Text>

                <TouchableOpacity
                  onPress={() => setMostrarHistorico(false)}
                  style={styles.fecharModalButton}
                >
                  <Feather name="x" size={24} color="#555" />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalConteudo}
              >
                {contrato.notificacao && contrato.notificacao.length > 0 ? (
                  contrato.notificacao.map((item) => (
                    <View
                      key={item.id_notificacao}
                      style={styles.subCardNotificacao}
                    >
                      <Item label="Tipo" value={item.tipo_notificacao?.tipo} />
                      <Item label="Título" value={item.titulo} />
                      <Item label="Descrição" value={item.descricao} />
                      <Item
                        label="Tempo para envio"
                        value={
                          item.tempo_envio !== null &&
                          item.tempo_envio !== undefined
                            ? `${item.tempo_envio} dias`
                            : null
                        }
                      />
                      <Item
                        label="Data de criação"
                        value={formatarDataHora(item.data_criacao)}
                      />
                    </View>
                  ))
                ) : (
                  <Text style={styles.semInformacao}>
                    Nenhuma notificação registrada.
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </PesquisaContext.Provider>
  );
}

function Card({
  title,
  children,
  icone,
}: {
  title: string;
  children: React.ReactNode;
  icone?: React.ComponentProps<typeof Feather>["name"];
}) {
  return (
    <View style={styles.card}>
      <View style={styles.tituloComIcone}>
        {icone ? <Feather name={icone} size={25} color="#006C5B" /> : null}
        <Text style={styles.secaoTitulo}>{title}</Text>
      </View>

      {children}
    </View>
  );
}

function Item({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  const pesquisa = usePesquisa().trim().toLowerCase();
  const corresponde =
    pesquisa === "" ||
    label.toLowerCase().includes(pesquisa) ||
    String(value ?? "").toLowerCase().includes(pesquisa);

  if (!corresponde) return null;

  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.valor,
          label === "Objeto do contrato" && styles.objetoJustificado,
        ]}
      >
        {value !== null && value !== undefined && value !== ""
          ? String(value)
          : "Não informado"}
      </Text>
    </View>
  );
}

function LinkItem({
  label,
  texto,
  link,
  onPress,
}: {
  label: string;
  texto: string;
  link: string | null | undefined;
  onPress: (link: string) => void;
}) {
  const pesquisa = usePesquisa().trim().toLowerCase();
  const linkLimpo = typeof link === "string" ? link.trim() : "";

  if (!linkLimpo) return null;

  const corresponde =
    pesquisa === "" ||
    label.toLowerCase().includes(pesquisa) ||
    texto.toLowerCase().includes(pesquisa);

  if (!corresponde) return null;

  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => onPress(linkLimpo)}>
        <Text style={styles.linkTexto}>{texto}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1,
    backgroundColor: "#F5F3F4",
  },
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
  notificacaoResumo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificacaoInfo: {
    flex: 1,
    marginRight: 15,
  },
  notificacaoQuantidade: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  notificacaoDescricao: {
    fontSize: 13,
    color: "#777",
  },
  botaoHistorico: {
    backgroundColor: "#006C5B",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoBotaoHistorico: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalHistorico: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: "85%",
  },
  modalCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  fecharModalButton: {
    padding: 4,
  },
  modalConteudo: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  subCardNotificacao: {
    backgroundColor: "#F5F3F4",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  objetoJustificado: {
    textAlign: "justify",
    lineHeight: 22,
  },
  comentarioVazio: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F3F4",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  comentarioVazioTexto: {
    color: "#777",
    fontSize: 14,
    marginTop: 10,
  },
  inputComentario: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
    marginTop: 8,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  botaoComentario: {
    backgroundColor: "#006C5B",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotaoComentario: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  linkTexto: {
    color: "#006C5B",
    textDecorationLine: "underline",
    fontSize: 14,
    marginTop: 4,
  },
  tituloComIcone: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
});
