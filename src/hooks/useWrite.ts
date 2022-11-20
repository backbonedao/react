import { useEffect, useState } from "react";
import useAPI from "./useAPI";

export default function useWrite(params: { key: string; value }) {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const { API } = useAPI();

  async function write() {
    setSuccess(await API.put(params));
    setLoading(false);
  }

  useEffect(() => {
    write();
  }, []);

  return { loading, success };
}
