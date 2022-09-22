export const fetcher = async (query: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API_URL || '', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data;
};
