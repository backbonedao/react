import { useBackbone } from "@backbonedao/react-hooks";
import { useState } from "react";

export default function useRead() {
    const backbone = useBackbone() 

    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const read = async (key: string) => {
        if (backbone.app?.backboneReactGet) { 
            const response = await backbone.app.backboneReactGet(key);

            if (response) setData(response); 
            else {
                console.error(`Error: failed to read value from key: ${key}`);
                setError(true);
            }
            setLoading(false);
        }
        else {
            console.error("backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi");
            setError(true);
            setLoading(false);
        }  
    }

    return { read, data, loading, error }
}