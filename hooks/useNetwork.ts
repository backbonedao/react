import { useEffect } from "react";
import useBackbone from "./useBackbone";

export default function useNetwork() {
    const backbone = useBackbone();

    let connect: Function = backbone?.network?.connect;
    let disconnect: Function = backbone?.network?.disconnect;
    let connectionId: string = backbone?.network?.getConnectionId();
    let network = backbone?.network?.getNetwork();

    useEffect(()=> {
        if (backbone) {
            connect = backbone.network.connect;
            disconnect = backbone.network.disconnect;
            connectionId = backbone.network.getConnectionId();
            network = backbone.network.getNetwork();
        }
    }, [backbone])

    return { connect, disconnect, connectionId, network }
}