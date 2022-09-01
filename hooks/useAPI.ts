import { useEffect, useState } from "react";
import useBackbone from "./useBackbone";

export default function useAPI(onAdd?) {
    const backbone = useBackbone() 
    const [API, setAPI] = useState<{[key: string]: Function}>({});
    const [stream, setStream] = useState<{data: any[], change: any}>({data: [], change: null});
    
    useEffect(()=> {
        if (backbone) {
            // Filter user defined API functions
            for (let key of Object.keys(backbone)) {
                if (!["backboneReactOnAdd","backboneReactAll","UI", "_", "network", "meta", "users"].includes(key)) {
                    API[key] = backbone[key];
                }
            }
            // Check for dependency functions
            if (API?.backboneReactOnAdd && API?.backboneReactAll) {
                // Override default listener
                if (onAdd) API.backboneReactOnAdd(onAdd);
                // Listen for changes to the apps Data
                else { 
                    API.backboneReactOnAdd(async ()=> {
                        let all = await API.backboneReactAll()
                        setStream({data: all, change: all[all.length - 1]})
                    })
                }
            } else console.warn("backbone-react is missing dependencies in src/app/api.ts, some feautres will be disabled. Learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi")
        } 
    }, [backbone])
    
    return { API, stream }
}