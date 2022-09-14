import { useBackbone } from "@backbonedao/react-hooks";
import { useState } from "react";

export default function useQuery() {
    const backbone = useBackbone() 

    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const query = async ({gt, gte, lt, lte, limit, stream, reverse, include_meta}) => {
        if (backbone.app?.backboneReactQuery) { 
            const response = await backbone.app.backboneReactQuery({gt, gte, lt, lte, limit, stream, reverse, include_meta});

            if (response) setData(response); 
            else {
                console.error(`Error: failed to query values`);
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
    
    return { query, loading, data, error }
}