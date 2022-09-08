import { useEffect, useState } from "react";
import useBackbone from "./useBackbone";

export default function useAPI() {
    const backbone = useBackbone() 

    const [API, setAPI] = useState<{[key: string]: Function}>({})
    const [stream, setStream] = useState<{data: any[], change: any}>({data: [], change: null});
    
    // Init API
    if (Object.keys(API).length < 1) {
        // Filter user defined API functions
        for (let key of Object.keys(backbone.app)) {
            if (!["backboneReactOnAdd","backboneReactAll","UI", "_", "network", "meta", "users"].includes(key)) {
                API[key] = backbone.app[key];
            }
        }
    }

    useEffect(()=> {
        // Check for dependency functions
        if (backbone.app?.backboneReactOnAdd && backbone.app?.backboneReactAll) {
            // Listen for changes to the apps Data
            backbone.app.backboneReactOnAdd(async ()=> {
                let all = await backbone.app.backboneReactAll()
                setStream({data: all, change: all[all.length - 1]})
            })
            
        } else console.warn("backbone-react is missing dependencies in src/app/api.js, some feautres will be disabled. Learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi")
    }, [])
    
    return { API, stream }
}