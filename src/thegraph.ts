import fetch from 'node-fetch';

export const makeGraphRequest = async <T>({ url, query }: { url: string, query: string }): Promise<T> => {
  const requestBody = JSON.stringify({
    query
  });

  const response = await fetch(url, {
    method: 'POST',
    body: requestBody
  });

  const json = await response.json();

  return json;
};
