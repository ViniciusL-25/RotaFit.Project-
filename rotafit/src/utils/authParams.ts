// Extrai os parâmetros devolvidos pelo Supabase na URL de retorno do login
// (rotafit://...#access_token=...&refresh_token=...). Eles vêm no fragmento (#),
// mas alguns provedores usam a query (?), então os dois são lidos.
export function parseAuthParams(url: string): {
  params: Record<string, string>;
  errorCode: string | null;
} {
  const params: Record<string, string> = {};
  const hashIndex = url.indexOf('#');
  const fragment = hashIndex >= 0 ? url.slice(hashIndex + 1) : '';
  const beforeHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const queryIndex = beforeHash.indexOf('?');
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex + 1) : '';

  for (const part of [query, fragment]) {
    if (!part) continue;
    for (const pair of part.split('&')) {
      if (!pair) continue;
      const eq = pair.indexOf('=');
      const rawKey = eq >= 0 ? pair.slice(0, eq) : pair;
      const rawValue = eq >= 0 ? pair.slice(eq + 1) : '';
      try {
        params[decodeURIComponent(rawKey)] = decodeURIComponent(
          rawValue.replace(/\+/g, ' '),
        );
      } catch {
        params[rawKey] = rawValue;
      }
    }
  }
  return { params, errorCode: params.error_code ?? params.error ?? null };
}
