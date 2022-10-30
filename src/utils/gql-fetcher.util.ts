export const gqlFetcher = async (
  query: string,
  variables = {},
  options = {},
  timeout = 60000
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API_URL || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    signal: controller.signal,
    ...options,
  });

  clearTimeout(id);

  const { data, errors } = await res.json();

  if (errors && !!errors.length) {
    throw new Error(errors[0].message);
  }

  return data;
};
