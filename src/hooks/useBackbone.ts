import { Backbone } from "./types";

export default function useBackbone() {
    const backbone: Backbone = window["backbone"]; 
    
    return backbone;
}