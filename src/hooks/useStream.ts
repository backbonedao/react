import { useBackbone } from "@backbonedao/react-hooks";
import { useEffect, useState } from "react";

export default function useStream() {
    const backbone = useBackbone() 

    const [stream, setStream] = useState([]);
    const [change, setChange] = useState();
    
    useEffect(()=> {
        if (backbone.app?.backboneReactOnAdd && backbone.app?.backboneReactGetAll) {
            backbone.app.backboneReactOnAdd(async ()=> {
                const all = await backbone.app.backboneReactGetAll()
                setStream(all);
                setChange(all[all.length - 1]);
            })
            
        } else console.warn("backbone-react is missing dependencies in src/app/api.js, some feautres will be disabled. Learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi")
    }, [])
    
    return { stream, change }
}