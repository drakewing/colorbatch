import { useSortable } from "@dnd-kit/sortable";
import { ActionIcon, Card, Center, ColorInput } from "@mantine/core";
import { CSS } from "@dnd-kit/utilities";
import { IconTrashX } from "@tabler/icons";

import { ColorSelection } from "./ColorPalette";
import useWindowDimensions from "../utils/window";

interface ColorCardProps {
  active: boolean;
  deleteColor: (id: number) => void;
  selection: ColorSelection;
  setColor: (color: string, id: number) => void;
}

export default function ColorCard({
  active,
  deleteColor,
  selection,
  setColor,
}: ColorCardProps) {
  const { width } = useWindowDimensions();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: selection.id });

  return (
    <div
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: active ? 1 : 0,
      }}
      ref={setNodeRef}
      {...attributes}
    >
      <Card
        p={0}
        shadow="md"
        sx={{
          "@media (max-width: 1400px)": {
            width: "140px",
          },
          "@media (max-width: 1100px)": {
            width: "96px",
          },
          "@media (max-width: 775px)": {
            width: "90vw",
            float: "right",
          },
          width: "180px",
          marginBottom: 0,
          backgroundColor: selection.color,
          touchAction: "none",
        }}
      >
        <Card.Section h={width && width > 775 ? 320 : 60} {...listeners} />
        {width && width > 775 && (
          <ColorInput
            value={selection.color}
            onChange={(value) => setColor(value, selection.id)}
            withPreview={false}
            size="xs"
          />
        )}
      </Card>
      <Center style={{ height: "100%" }} mt={16}>
        <ActionIcon onClick={() => deleteColor(selection.id)}>
          <IconTrashX />
        </ActionIcon>
      </Center>
    </div>
  );
}
