export const fetcher = async (query: string, variables = {}) => {
  const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API_URL || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  return json.data;
};
