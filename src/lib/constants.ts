// Constantes globais do projeto

export const APP_NAME = 'Meu Projeto';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const MESSAGES = {
  ERROR: {
    GENERIC: 'Ocorreu um erro. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para acessar este recurso.',
  },
  SUCCESS: {
    SAVED: 'Salvo com sucesso!',
    DELETED: 'Excluído com sucesso!',
    UPDATED: 'Atualizado com sucesso!',
  },
} as const;
