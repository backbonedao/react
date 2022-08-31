import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useBackbone from "./useBackbone";

export default function useMeta() {
    const backbone = useBackbone(); 

    const [version, setVersion]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState();
    const [keys, setKeys] = useState();
    
    const getVersion = async () => setVersion(await backbone.meta.getAppVersion());
    const getKeys = async () => setKeys(await backbone.meta.getKeys());

    useEffect(()=> {
        if (backbone) {
            getVersion();
            getKeys();
        }
    }, [backbone])

    return { version, keys }
}