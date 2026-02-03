// Tipos globais do projeto
// Adicione seus tipos aqui conforme necessário

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Tipos para paginação
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
