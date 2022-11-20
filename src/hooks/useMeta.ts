import useBackbone from "./useBackbone";
import { Manifest } from "@backbonedao/types";
import { useEffect, useState } from "react";

export default function useMeta() {
  const backbone = useBackbone();

  const [meta, setMeta] = useState<Manifest | undefined>();

  async function fetch() {
    setMeta(await backbone.app.meta._getMeta("manifest"));
  }

  useEffect(() => {
    fetch();
  }, []);

  return {
    meta,
    refetch: fetch,
  };
}
