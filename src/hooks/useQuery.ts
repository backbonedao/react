import { Query } from "@backbonedao/types";
import { useEffect, useState } from "react";
import useAPI from "./useAPI";

export default function useQuery(params: Query) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { API } = useAPI();

  async function query() {
    const response = await API.query(params);

    if (response) setData(response);
    else {
      console.error(`Error: failed to query values`);
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    query();
  }, []);

  return { loading, data, error };
}
