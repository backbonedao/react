import { useState } from "react";

export type Omit<A extends object, K extends string> = Pick<A, Exclude<keyof A, K>>

class DB {
    path: string = "";

    constructor(_path) {    
        if (_path) this.path = _path;
    }

    collection(name: string) {
        let newPath;
        if (this.path) newPath = `${this.path}:${name}:`;
        else newPath = `${this.path}${name}:`;
        return new DB(newPath);
    }

    document(name: string): Omit<DB, 'query' | 'getAll'> {
        let newPath;
        if (this.path[this.path.length - 1] !== ":") newPath = `${this.path.substring(0, this.path.lastIndexOf(":"))}:${name}`
        else newPath= `${this.path}${name}`;
        return new DB(newPath);
    }

    async read() { 
        let response = {
            key: this.path,
        }
        response["value"] = await window["backbone"].app.backboneReactGet(this.path);
        return response;
    }

    async readAll() {
        let response = {
            key: this.path,
        }
        response["value"] = await window["backbone"].app.backboneReactQuery({gt: this.path, lt: `${this.path}~`});
        return response;
    }

    async query({gt, gte, lt, lte, limit, stream, reverse, include_meta}) {
        return window["backbone"].app.backboneReactQuery({gt, gte, lt, lte, limit, stream, reverse, include_meta});
    }

    async write(value) { 
        return window["backbone"].app.backboneReactPut({key: this.path, value: value});
    }
}

export default function useDocumentStore() {
    const [db, setDb] = useState(new DB(""));
    
    return db 
}