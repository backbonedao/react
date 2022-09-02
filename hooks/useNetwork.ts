import { useEffect } from "react";
import useBackbone from "./useBackbone";

export default function useNetwork() {
    const backbone = useBackbone();

    let connect = backbone?.app?.network?.connect;
    let disconnect = backbone?.app?.network?.disconnect;
    let connectionId = backbone?.app?.network?.getConnectionId();
    let network = backbone?.app?.network?.getNetwork();

    useEffect(()=> {
        if (backbone) {
            connect = backbone.app.network.connect;
            disconnect = backbone.app.network.disconnect;
            connectionId = backbone.app.network.getConnectionId();
            network = backbone.app.network.getNetwork();
        }
    }, [backbone])

    return { connect, disconnect, connectionId, network }
}