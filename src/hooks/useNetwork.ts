import { useState } from "react";
import { useInterval } from "usehooks-ts";
import useBackbone from "./useBackbone";

export default function useNetwork() {
  const backbone = useBackbone();

  const getConnectionId = backbone.app.network.getConnectionId;
  const getNetwork = backbone.app.network.getNetwork;

  const [connectionId, setConnectionId] = useState(getConnectionId());
  const [network, setNetwork] = useState(getNetwork());

  useInterval(
    () => {
      if (!connectionId()) setConnectionId(getConnectionId());
      if (!network) setNetwork(getNetwork());
    },
    !connectionId() || !network ? 50 : null
  );

  return {
    connect: backbone.app.network.connect,
    disconnect: backbone.app.network.disconnect,
    connectionId,
    network,
  };
}
