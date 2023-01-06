import { useDroppable } from "@dnd-kit/core";
import { Center } from "@mantine/core";
import { IconTrashX } from "@tabler/icons";

export default function ColorPalette() {
  const { setNodeRef } = useDroppable({ id: 999 });

  return (
    <div ref={setNodeRef} style={{ border: "solid" }} {...attributes}>
      <IconTrashX style={{ color: "black" }} />
    </div>
  );
}
