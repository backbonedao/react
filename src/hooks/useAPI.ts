import { useBackbone } from "@backbonedao/react-hooks";
import { useState } from "react";

export default function useAPI() {
    const backbone = useBackbone() 

    const [API, setAPI] = useState<{[key: string]: Function}>({});
    
    const read = async (key: string) => {
        if (backbone.app?.backboneReactGet) { 
            const response = await backbone.app.backboneReactGet(key);
            if (response) return response;
            else console.error(`Error: failed to read value from key: ${key}`);
        }
        else console.error("backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi");
    }

    const query = async ({gt, gte, lt, lte, limit, stream, reverse, include_meta}) => {
        if (backbone.app?.backboneReactQuery) { 
            const response = await backbone.app.backboneReactQuery({gt, gte, lt, lte, limit, stream, reverse, include_meta});
            if (response) return response; 
            else console.error(`Error: failed to query value`);
        }
        else console.error("backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi"); 
    }

    const write = async ({key, value}: {key: string, value}) => {
        if (backbone.app?.backboneReactPut) {
            await backbone.app.backboneReactPut({key, value});
            return true;
        }
        console.error("backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi");
        return false;
    }

    if (Object.keys(API).length < 1) {
        for (let key of Object.keys(backbone.app)) {
            if (![
                "backboneReactOnAdd",
                "backboneReactGetAll",
                "backboneReactGet",
                "backboneReactPut",
                "backboneReactQuery",
                "UI",
                "_",
                "network",
                "meta",
                "users"
            ].includes(key)) {
                API[key] = backbone.app[key];
            }
        }
    }

    return { API, read, query, write }
}