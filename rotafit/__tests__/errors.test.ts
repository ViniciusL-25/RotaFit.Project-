import { friendlyError } from '@/utils/errors';

describe('friendlyError', () => {
  it('traduz falha de rede', () => {
    expect(friendlyError(new Error('Network request failed'))).toMatch(/Sem conexão/);
  });
  it('traduz bloqueio de segurança do banco (RLS)', () => {
    expect(
      friendlyError({
        message: 'new row violates row-level security policy for table "runs"',
      }),
    ).toMatch(/permissão/);
  });
  it('traduz sessão expirada', () => {
    expect(friendlyError(new Error('JWT expired'))).toMatch(/sessão expirou/);
  });
  it('mantém mensagens já escritas em português pelo app', () => {
    expect(friendlyError(new Error('O login com o Google não foi concluído.'))).toBe(
      'O login com o Google não foi concluído.',
    );
  });
  it('usa mensagem genérica para erro desconhecido ou vazio', () => {
    expect(friendlyError(undefined)).toMatch(/Algo deu errado/);
    expect(friendlyError(new Error('xyz internal stack'))).toMatch(/Algo deu errado/);
  });
});
