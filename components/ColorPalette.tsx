import { Group } from "@mantine/core";
import { useState } from "react";

import { ColorCard } from "../components/ColorCard";

export interface ColorSelection {
  id: number;
  color: string;
}

export function ColorPalette() {
  const [selections, setSelections] = useState<ColorSelection[]>([
    { id: 1, color: "#c24f4f" },
    { id: 2, color: "#c24f4f" },
    { id: 3, color: "#c24f4f" },
    { id: 4, color: "#c24f4f" },
  ]);

  return (
    <Group>
      {selections.map((selection) => (
        <ColorCard
          key={selection.id}
          selection={selection}
          setColor={(color: string, id: number) =>
            setSelections((old) =>
              old.map((selection) => {
                if (selection.id !== id) {
                  return selection;
                }

                return {
                  ...selection,
                  color,
                };
              })
            )
          }
        />
      ))}
    </Group>
  );
}
