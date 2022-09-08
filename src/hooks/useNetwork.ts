import { useState } from "react";
import { useInterval } from "usehooks-ts";
import useBackbone from "./useBackbone";

export default function useNetwork() {
    const backbone = useBackbone();

    const connect = backbone.app.network.connect;
    const disconnect = backbone.app.network.disconnect;

    const [connectionId, setConnectionId] = useState(backbone.app.network.getConnectionId());
    const [network, setNetwork] = useState(backbone.app.network.getNetwork());

    useInterval(
        () => {
            if (!connectionId) setConnectionId(backbone.app.network.getConnectionId());
            if (!network) setNetwork(backbone.app.network.getNetwork());
        },
        !connectionId || !network ? 50 : null
    )

    return { connect, disconnect, connectionId, network }
}