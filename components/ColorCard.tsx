import { Card, ColorInput } from "@mantine/core";
import { useState } from "react";

export const ColorCard = () => {
  const [color, setColor] = useState("#bd1717");

  return (
    <Card p={0} sx={{ backgroundColor: color }}>
      <Card.Section h={260} />
      <ColorInput value={color} onChange={setColor} />
    </Card>
  );
};
