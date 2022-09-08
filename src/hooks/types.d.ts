export type Backbone = {
    app: App;
    id?: Id;
    events: Events;
    user: (params?: {name: string, permissions: any[], address: string}) => Promise<boolean>;
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

export type Events = {
    on: (event: string, callback: Function) => any;
}

export type Id = {
    authenticate: (params: {name: string, permissions: any[], address: string}) => Promise<boolean>;
    isAuthenticated: () => Promise<boolean>;
    registerApp: (manifest: {
        address: string,
        name: string, 
        version: string, 
        permissions: any[], 
        "@id": string,
        description?: string, 
        website?: string, 
        git?: string
    }) => Promise<boolean> ;
    signObject: (params: {hash: string}) => Promise<{signature: Buffer}>;
    getId: () => Promise<string>;
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
    getConnectionId: () => any;
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
