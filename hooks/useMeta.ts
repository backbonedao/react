import { useEffect, useState } from "react";
import useBackbone from "./useBackbone";

export default function useMeta() {
    const backbone = useBackbone(); 

    const [version, setVersion] = useState<string | undefined>();
    const [keys, setKeys] = useState<any | undefined>();
    
    const getVersion = async () => setVersion(await backbone.app.meta.getAppVersion());
    const getKeys = async () => setKeys(await backbone.app.meta.getKeys());

    useEffect(()=> {
        if (backbone) {
            getVersion();
            getKeys();
        }
    }, [backbone])

    return { version, keys }
}