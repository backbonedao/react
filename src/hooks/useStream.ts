import { useEffect, useMemo, useState } from "react";
import useAPI from "./useAPI";

export default function useStream() {
  const [stream, setStream] = useState([] as any[]);
  const change = useMemo(() => stream[stream.length - 1], [stream]);

  const { API } = useAPI();

  useEffect(() => {
    API.onAdd(async () => {
      setStream(await API.getAll());
    });
  }, []);

  return { stream, change };
}
