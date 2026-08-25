const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export async function supabaseFetch(
  tabela: string,
  options: RequestInit = {}
) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${tabela}`,
    {
      ...options,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro);
  }

  return response.json();
}