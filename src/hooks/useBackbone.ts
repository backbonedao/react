import { useState, useEffect } from "react";

export type Backbone = {
    app: App;
    user: (params: {name: string, permissions: string, address: string}) => any;
    _getAddresses: Function;
    _LockAddress: Function;
    _removeAddress: Function;
}

export type App = {
    [key: string]: any;
    meta: Meta;
    network: Network;
    users: Users;
    _: {on: Function, listenLog: Function};
}

export type Meta = {
    getAppVersion: () => Promise<string>;
    getKeys: () => Promise<any>;
    _allMeta: Function;
    _getMeta: (key: string) => Promise<any>;
    _setMeta: Function;
}

export type Network = {
    connect: (initiator?: {local_only: boolean}) => Promise<{
        peers: any[], 
        destroyed: boolean, 
        isListening: boolean, 
        webrtc: any, 
        webrtcOpts: any, 
        ws: any, 
        wsOpts: any
    }>;
    disconnect: () => Promise<void>;
    getConnectionId: () => string;
    getNetwork: () => {
        peers: any[], 
        destroyed: boolean, 
        isListening: boolean, 
        webrtc: any, 
        webrtcOpts: any, 
        ws: any, 
        wsOpts: any
    };
}

export type Users = {
    addTrustedUser: (params: {key: string, partition: any, skip_status_change?: boolean}) => boolean;
    addUser: (params: {key: string, partition: any, skip_status_change?: boolean}) => boolean;
    removeTrustedUser: (params: {key: string, partition: any, destroy?: boolean}) => boolean;
    removeUser: (params: {key: string, partition: any, destroy?: boolean}) => boolean;
}

export default function useBackbone() {
    const [backbone, setBackbone] = useState<Backbone>(window["backbone"]);

    useEffect(()=> {
        if (window["backbone"]) setBackbone(window["backbone"])
    }, [window["backbone"]])

    return backbone;
}