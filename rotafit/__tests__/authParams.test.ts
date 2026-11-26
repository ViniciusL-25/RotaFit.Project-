import { parseAuthParams } from '@/utils/authParams';

describe('parseAuthParams', () => {
  it('lê os tokens do fragmento (#)', () => {
    const { params, errorCode } = parseAuthParams(
      'rotafit://auth#access_token=abc&refresh_token=def&token_type=bearer',
    );
    expect(params.access_token).toBe('abc');
    expect(params.refresh_token).toBe('def');
    expect(errorCode).toBeNull();
  });
  it('lê parâmetros da query (?) e decodifica valores', () => {
    const { params } = parseAuthParams(
      'rotafit://auth?error_description=Acesso+negado%21',
    );
    expect(params.error_description).toBe('Acesso negado!');
  });
  it('devolve o código de erro quando o login falha', () => {
    const { errorCode } = parseAuthParams(
      'rotafit://auth#error=access_denied&error_code=401',
    );
    expect(errorCode).toBe('401');
  });
  it('não quebra com URL sem parâmetros', () => {
    expect(parseAuthParams('rotafit://auth')).toEqual({ params: {}, errorCode: null });
  });
});
