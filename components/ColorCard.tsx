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
    zIndex: active ? 1 : 0,
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes}>
      <Card p={0} sx={{ backgroundColor: selection.color }}>
        <Card.Section h={320} {...listeners} />
        <ColorInput
          value={selection.color}
          onChange={(value) => setColor(value, selection.id)}
        />
      </Card>
    </div>
  );
};
