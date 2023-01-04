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
      <Card
        p={0}
        shadow="md"
        sx={(theme) => ({
          "@media (max-width: 1300px)": {
            width: "140px",
          },
          "@media (max-width: 1100px)": {
            width: "96px",
          },
          width: "180px",
          backgroundColor: selection.color,
          touchAction: "none",
        })}
      >
        <Card.Section h={320} {...listeners} />
        <ColorInput
          value={selection.color}
          onChange={(value) => setColor(value, selection.id)}
          withPreview={false}
          size="xs"
          sx={(theme) => ({
            "@media (min-width: 1100px)": {
              display: "none",
            },
          })}
        />
        <ColorInput
          value={selection.color}
          onChange={(value) => setColor(value, selection.id)}
          sx={(theme) => ({
            "@media (max-width: 1100px)": {
              display: "none",
            },
          })}
        />
      </Card>
    </div>
  );
};
