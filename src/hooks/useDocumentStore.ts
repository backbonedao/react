import { Query } from "@backbonedao/types";
import useAPI from "./useAPI";

export default function useDocumentStore(db: string) {
  const { API } = useAPI();

  function collection(_path, _name) {
    const path = `${_path}:${_name}`;

    return {
      document: (name) => document(path, name),
      readAll: () => API.query({ gt: path, lt: `${path}~` }),
      query: (params: Query) => API.query(params),
    };
  }

  function document(_path, _name) {
    const path = `${_path}:${_name}`;

    return {
      collection: (name) => collection(path, name),
      read: () => API.get(path),
      write: (value) => API.put({ key: path, value }),
    };
  }

  return {
    collection: (name) => collection(db, name),
    document: (name) => document(db, name),
  };
}
