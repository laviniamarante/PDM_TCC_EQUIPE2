export interface Lembrete {
  id: string;
  titulo: string;
  subtitulo: string;
  tipo: 'ativo' | 'pendente' | 'vencido';
  tempo: string;
}

 export const lembretes: Lembrete[] = [
    {
      id: "1",
      titulo: "Contrato próximo do vencimento",
      subtitulo: "O contrato 010/2024 vence em 5 dias",
      tipo: "pendente",
      tempo: "Há 5 minutos",
    },

    {
      id: "2",
      titulo: "Pagamento atrasado!",
      subtitulo: "O pagamento do contrato 009 está atrasado",
      tipo: "vencido",
      tempo: "Há 1 hora",
    },

    {
      id: "3",
      titulo: "Novo contrato ativo",
      subtitulo: "O contrato 001/2026 foi cadastrado",
      tipo: "ativo",
      tempo: "Ontem",
    },

    {
      id: "4",
      titulo: "Contrato próximo do vencimento",
      subtitulo: "O contrato 002/2024 vence em 10 dias",
      tipo: "pendente",
      tempo: "Há 2 horas",
    },

    {
      id: "5",
      titulo: "Pagamento atrasado!",
      subtitulo: "O pagamento do contrato 003 está atrasado",
      tipo: "vencido",
      tempo: "Há 3 horas",
    },

    {
      id: "6",
      titulo: "Novo contrato ativo",
      subtitulo: "O contrato 004/2026 foi cadastrado",
      tipo: "ativo",
      tempo: "Há 2 dias",
    }
  ];