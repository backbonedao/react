import { Backbone } from "@backbonedao/types";

export default function useBackbone() {
  return window["backbone"] as Backbone;
}
