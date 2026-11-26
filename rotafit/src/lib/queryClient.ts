import { QueryClient } from '@tanstack/react-query';

// Cliente único do TanStack Query, compartilhado pelo app inteiro.
// Dados de corrida mudam pouco: 30 s de "frescor" evita requisições repetidas
// ao navegar entre abas, e uma única nova tentativa basta para falhas de rede.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
