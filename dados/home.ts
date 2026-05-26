export interface Contrato {
  id: string;
  titulo: string;
  fornecedor: string;
  vencimento: string;
  status: 'Ativo' | 'Pendente' | 'Vencido';
}
// só defininfo esses dados obrigatórios para o contrato, mas podem ser adicionados
//outros campos conforme necessário
export const contratos: Contrato[] = [
  {
    id: '1',
    titulo: 'Serviços de Limpeza e Conservação',
    fornecedor: 'Limpeza Total Serviços',
    vencimento: '12/07/2026',
    status: 'Ativo',
  },

  {
    id: '2',
    titulo: 'Fornecimento de materiais de escritório',
    fornecedor: 'Papelaria Central Ltda',
    vencimento: '15/08/2026',
    status: 'Vencido',
  },

  {
    id: '3',
    titulo: 'Fornecimento de Equipamentos de Laboratório',
    fornecedor: 'Laboratórios Avançados S.A.',
    vencimento: '20/09/2026',
    status: 'Ativo',
  },

  {
    id: '4',
    titulo: 'Serviço de Alimentação',
    fornecedor: 'Vale Verde Alimentação',
    vencimento: '20/11/2026',
    status: 'Pendente',
  },
];