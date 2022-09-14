import { useBackbone } from "@backbonedao/react-hooks";
import { useState } from "react";

export default function useWrite() {
    const backbone = useBackbone() 

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const write = async ({key, value}: {key: string, value: any}) => {
        if (backbone.app?.backboneReactPut) {
            await backbone.app.backboneReactPut({key, value}).then(()=>{  
                setSuccess(true);
                setLoading(false);
                return true;
            });
        } else {
            console.error("backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi");
            setSuccess(false);
            setLoading(false);
            return false;
        }
    }
   
    return { write, loading, success }
}