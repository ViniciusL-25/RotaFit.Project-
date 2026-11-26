// Converte qualquer erro (Supabase, rede, Spotify, GPS) em uma mensagem
// curta e em português, própria para mostrar ao usuário. Nunca devolve
// detalhes técnicos como nomes de tabela ou stack trace.
const FALLBACK = 'Algo deu errado. Tente novamente em instantes.';

export function friendlyError(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : typeof (error as { message?: unknown } | null)?.message === 'string'
          ? (error as { message: string }).message
          : '';
  const message = raw.toLowerCase();
  if (!message) return FALLBACK;

  if (message.includes('network request failed') || message.includes('failed to fetch'))
    return 'Sem conexão com a internet. Verifique sua rede e tente de novo.';
  if (message.includes('row-level security') || message.includes('permission denied'))
    return 'Você não tem permissão para fazer isso. Entre novamente na sua conta.';
  if (
    message.includes('jwt') ||
    message.includes('refresh token') ||
    message.includes('not authenticated')
  )
    return 'Sua sessão expirou. Entre novamente com o Google.';
  if (message.includes('timeout') || message.includes('timed out'))
    return 'A operação demorou demais. Tente novamente.';
  if (message.includes('variáveis do supabase'))
    return 'O app não foi configurado: faltam as variáveis do Supabase no arquivo .env.';

  // Mensagens já escritas em português pelo próprio app podem ser mostradas.
  if (/[áàâãéêíóôõúç]/.test(message) && raw.length <= 160) return raw;
  return FALLBACK;
}
