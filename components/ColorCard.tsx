import { Card, ColorInput } from "@mantine/core";
import { ColorSelection } from "./ColorPalette";

interface ColorCardProps {
  selection: ColorSelection;
  setColor: (color: string, id: number) => void;
}

export const ColorCard = ({ selection, setColor }: ColorCardProps) => {
  return (
    <Card p={0} sx={{ backgroundColor: selection.color }}>
      <Card.Section h={320} />
      <ColorInput
        value={selection.color}
        onChange={(value) => setColor(value, selection.id)}
      />
    </Card>
  );
};
