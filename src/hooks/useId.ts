import useBackbone from "./useBackbone";
import useEvents from "./useEvents";
import { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

export default function useId() {
  const backbone = useBackbone();

  const [id, setId] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { listen } = useEvents();

  useEffect(() => {
    listen("id:authenticated", () => setIsAuthenticated(true));

    useInterval(
      async () => {
        const response = await backbone.id?.getId();
        if (response) setId(response);
      },
      isAuthenticated && !id ? 50 : null
    );
  }, []);

  return {
    authenticate: backbone.user,
    id,
    isAuthenticated,
  };
}
