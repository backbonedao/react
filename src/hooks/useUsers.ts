import useBackbone from "./useBackbone";

export default function useUsers() {
  const backbone = useBackbone();

  return {
    addUser: backbone.app.users.addUser,
    addTrustedUser: backbone.app.users.addTrustedUser,
    removeUser: backbone.app.users.removeUser,
    removeTrustedUser: backbone.app.users.removeTrustedUser,
  };
}
