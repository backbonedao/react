import useBackbone from "./useBackbone"
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

export default function useId() {
    const backbone = useBackbone();

    const [id, setId] = useState<string | undefined>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    let authenticateManual = backbone.id?.authenticate
    let authenticate = backbone.user
    let signObject = backbone.id?.signObject;
    let registerApp = backbone.id?.registerApp;

    useEffect(()=> {
        backbone.events.on("id:authenticated", () => {
            setIsAuthenticated(true);
        })
    }, [])

    useInterval(
        async () => {
            //@ts-ignore
            const response = await backbone.id.getId()
            if (response) setId(response);
        },
        isAuthenticated && !id ? 50 : null
    )

    return { authenticateManual, authenticate, id, isAuthenticated, signObject, registerApp }
}