import { useEffect, useState } from "react";
import useAPI from "./useAPI";

export default function useRead(key: string) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { API } = useAPI();

  async function read() {
    const response = await API.get(key);

    if (response) setData(response);
    else {
      console.error(`Error: failed to read value from key: ${key}`);
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    read();
  }, []);

  return { data, loading, error };
}
