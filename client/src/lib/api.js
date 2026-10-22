import { useCallback, useEffect, useState } from "react";

async function readError(response) {
  const body = await response.json().catch(() => null);
  return (body && body.error) || "Something went wrong — please try again.";
}

export async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);
  return { ok: response.ok, body };
}

export async function deleteJson(url) {
  const response = await fetch(url, { method: "DELETE" });
  return response.json().catch(() => null);
}

export function useApi(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));

  const load = useCallback(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      return undefined;
    }
    let active = true;
    setLoading(true);
    getJson(url)
      .then((json) => {
        if (active) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [url]);

  useEffect(() => load(), [load]);

  return { data, error, loading };
}
