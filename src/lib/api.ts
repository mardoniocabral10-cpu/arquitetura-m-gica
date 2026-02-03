import { supabase } from '@/integrations/supabase/client';

// Funções auxiliares para chamadas à API
// Adicione suas funções de API aqui

export const api = {
  // Exemplo de estrutura para chamadas
  // users: {
  //   getAll: async () => {
  //     const { data, error } = await supabase.from('users').select('*');
  //     return { data, error };
  //   },
  //   getById: async (id: string) => {
  //     const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  //     return { data, error };
  //   },
  // },
};

// Helper para invocar edge functions
export const invokeFunction = async <T>(
  functionName: string,
  body?: Record<string, unknown>
): Promise<{ data: T | null; error: Error | null }> => {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body,
  });
  
  if (error) {
    return { data: null, error };
  }
  
  return { data: data as T, error: null };
};
