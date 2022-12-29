import { useSortable } from "@dnd-kit/sortable";
import { Card, ColorInput } from "@mantine/core";
import { CSS } from "@dnd-kit/utilities";

import { ColorSelection } from "./ColorPalette";

interface ColorCardProps {
  active: boolean;
  selection: ColorSelection;
  setColor: (color: string, id: number) => void;
}

export const ColorCard = ({ active, selection, setColor }: ColorCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: selection.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: active ? 1000 : 999,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card p={0} sx={{ backgroundColor: selection.color }}>
        <Card.Section h={320} />
        <ColorInput
          value={selection.color}
          onChange={(value) => setColor(value, selection.id)}
        />
      </Card>
    </div>
  );
};
