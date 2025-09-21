
export interface NavLink {
  name: string;
  path: string;
}

export interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  challenge: string;
  consent: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  challenge?: string;
  consent?: string;
  general?: string; // Added to handle general submission errors
}

export interface CasoDeUso {
  id: string;
  category: string; // "Vendas", "Marketing", "Operações", "Financeiro"
  problemTitle: string;
  resultDescription: string;
  tags: string[];
}
