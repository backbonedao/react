import { useEffect } from "react";
import useBackbone from "./useBackbone";

export default function useUsers() {
    const backbone = useBackbone();

    let user = backbone?.user;
    let addTrustedUser = backbone?.app?.users?.addTrustedUser;
    let addUser = backbone?.app?.users?.addUser;
    let removeTrustedUser = backbone?.app?.users?.removeTrustedUser;
    let removeUser = backbone?.app?.users?.removeUser;

    useEffect(()=> {
        if (backbone) {
            user = backbone.user;
            addTrustedUser = backbone.app.users.addTrustedUser;
            addUser = backbone.app.users.addUser;
            removeTrustedUser = backbone.app.users.removeTrustedUser;
            removeUser = backbone.app.users.removeUser;
        }
    }, [backbone])

    return { user, addUser, addTrustedUser, removeUser, removeTrustedUser }
}
