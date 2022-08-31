import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useBackbone from "./useBackbone";

export default function useAPI() {
    const backbone = useBackbone() 
    const [API, setAPI]: [{[key: string]: Function}, Dispatch<SetStateAction<{[key: string]: Function}>>] = useState({});

    useEffect(()=> {
        if (backbone) {
            for (let key of Object.keys(backbone)) {
                if (key !== "UI" && key !== "_" && key !== "network" && key !== "meta" && key !== "users") {
                    API[key] = backbone[key];
                }
            }
        } 
    }, [backbone])
    
    return API
}