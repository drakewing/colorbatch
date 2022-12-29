import { Group } from "@mantine/core";
import { useState } from "react";

import { ColorCard } from "../components/ColorCard";

export interface ColorSelection {
  id: number;
  color: string;
}

export function ColorPalette() {
  const [selections, setSelections] = useState<ColorSelection[]>([
    { id: 1, color: "#a568bd" },
    { id: 2, color: "#7a3737" },
    { id: 3, color: "#4dbf75" },
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
