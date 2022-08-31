import { useEffect } from "react";
import useBackbone from "./useBackbone";

export default function useUsers() {
    const backbone = useBackbone();

    let addTrustedUser: Function = backbone?.users?.addTrustedUser;
    let addUser: Function = backbone?.users?.addUser;
    let removeTrustedUser: Function = backbone?.users?.removeTrustedUser;
    let removeUser: Function = backbone?.users?.removeUser;

    useEffect(()=> {
        if (backbone) {
            addTrustedUser = backbone.users.addTrustedUser;
            addUser = backbone.users.addUser;
            removeTrustedUser = backbone.users.removeTrustedUser;
            removeUser = backbone.users.removeUser;
        }
    }, [backbone])

    return { addUser, addTrustedUser, removeUser, removeTrustedUser }
}