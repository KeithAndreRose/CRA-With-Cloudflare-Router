import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await parseResponse(response);
      setData(data || null);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

/**
 *
 * @param {Response} response
 */
async function parseResponse(response) {
  let json, text, status, ok;

  status = response.status;
  ok = response.ok;
  try {
    json = await response.clone().json();
  } catch (error) {
    try {
      text = await response.clone().text();
      json = JSON.parse(text);
    } catch (error) {}
  }

  const payload = { response: response.clone(), json, text, status, ok };

  console.log("parseResponse:", payload);

  return payload;
}
