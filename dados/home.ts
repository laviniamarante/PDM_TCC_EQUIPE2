export interface Contrato {
  id: number;
  titulo: string;
  fornecedor: string;
  inicio: string;
  vencimento: string;
  status: 'Ativo' | 'Pendente' | 'Vencido';

  numeroContrato: string;
  fiscal: string;
  valor: string;
  objeto: string;
}
// só defininfo esses dados obrigatórios para o contrato, mas podem ser adicionados
//outros campos conforme necessário
export const contratos: Contrato[] = [
  {
    id: 1,
    titulo: 'Serviços de Limpeza e Conservação',
    fornecedor: 'Limpeza Total Serviços',
    inicio: '12/07/2023',
    vencimento: '12/07/2026',
    status: 'Ativo',
    numeroContrato: 'CTR-001',
    fiscal: 'FISC-001',
    valor: 'R$ 10.000,00',
    objeto: 'Fornecimento de serviços de limpeza e conservação'
  },

  {
    id: 2,
    titulo: 'Fornecimento de materiais de escritório',
    fornecedor: 'Papelaria Central Ltda',
    inicio: '15/08/2023',
    vencimento: '15/08/2026',
    status: 'Vencido',
    numeroContrato: 'CTR-002',
    fiscal: 'FISC-002',
    valor: 'R$ 5.000,00',
    objeto: 'Fornecimento de materiais de escritório'
  },

  {
    id: 3,
    titulo: 'Fornecimento de Equipamentos de Laboratório',
    fornecedor:'Laboratórios Avançados S.A.',
    inicio:'20/09/2023',
    vencimento: '20/09/2026',
    status: 'Ativo',
    numeroContrato: 'CTR-003',
    fiscal: 'FISC-003',
    valor: 'R$ 15.000,00',
    objeto: 'Fornecimento de equipamentos de laboratório'
  },

  {
    id: 4,
    titulo: 'Serviço de Alimentação',
    fornecedor: 'Vale Verde Alimentação',
    inicio: '20/11/2023',
    vencimento: '20/11/2026',
    status: 'Pendente',
    numeroContrato: 'CTR-004',
    fiscal: 'FISC-004',
    valor: 'R$ 8.000,00',
    objeto: 'Fornecimento de serviços de alimentação'
  },
];