import useBackbone from "./useBackbone";
import { API } from "@backbonedao/types";

export default function useAPI() {
  const backbone = useBackbone();
  const API = backbone.app as API;

  return { API, read: API.get, query: API.query, write: API.put };
}
