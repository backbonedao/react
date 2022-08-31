import { useState, useEffect } from "react";

export default function useBackbone() {
    const [backbone, setBackbone] = useState(window["backbone"]?.app);

    useEffect(()=> {
        if (window["backbone"]?.app) setBackbone(window["backbone"].app)
    }, [window["backbone"].app])

    return backbone;
}