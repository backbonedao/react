import useBackbone from "./useBackbone";

export default function useEvents() {
  const backbone = useBackbone();

  return { listen: backbone.events.on };
}
