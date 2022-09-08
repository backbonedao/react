import useBackbone from "./useBackbone";

export default function useUsers() {
    const backbone = useBackbone();

    const addTrustedUser = backbone.app.users.addTrustedUser;
    const addUser = backbone.app.users.addUser;
    const removeTrustedUser = backbone.app.users.removeTrustedUser;
    const removeUser = backbone.app.users.removeUser;

    return { addUser, addTrustedUser, removeUser, removeTrustedUser }
}
