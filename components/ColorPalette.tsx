import { useState, Dispatch, SetStateAction } from "react";
import { Group } from "@mantine/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ColorCard } from "../components/ColorCard";
import { usePaletteContext } from "../context/ColorPalette";

export interface ColorSelection {
  id: number;
  color: string;
}

export function ColorPalette() {
  const { colors, setColors } = usePaletteContext();
  const [active, setActive] = useState<UniqueIdentifier>(0);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={colors} strategy={horizontalListSortingStrategy}>
        <Group>
          {colors.map((color) => (
            <ColorCard
              active={active === color.id}
              key={color.id}
              selection={color}
              setColor={(color: string, id: number) =>
                setColors((oldColors) =>
                  oldColors.map((oldColor) => {
                    if (oldColor.id !== id) {
                      return oldColor;
                    }

                    return {
                      ...oldColor,
                      color,
                    };
                  })
                )
              }
            />
          ))}
        </Group>
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActive(active.id);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
