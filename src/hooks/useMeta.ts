import { useEffect, useState } from "react";
import useBackbone from "./useBackbone";

export default function useMeta() {
    const backbone = useBackbone(); 

    const [id, setId] = useState<string | undefined>();
    const [address, setAddress] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [git, setGit] = useState<string | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [permissions, setPermissions] = useState<any[] | undefined>();
    const [version, setVersion] = useState<string | undefined>();
    const [website, setWebsite] = useState<string | undefined>();

    async function getManifest() {
        const manifest = await backbone.app.meta._getMeta("manifest");

        setId(manifest["@id"]);
        setAddress(manifest["address"]);
        setDescription(manifest["description"]);
        setGit(manifest["git"]);
        setName(manifest["name"]);
        setPermissions(manifest["permissions"]);
        setVersion(manifest["version"]);
        setWebsite(manifest["website"]);
    };

    useEffect(()=> {
        if (backbone) getManifest();
    }, [backbone])

    return { id, address, description, git, name, permissions, version, website }
}