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

export interface ColorSelection {
  id: number;
  color: string;
}

interface ColorPaletteProps {
  selections: ColorSelection[];
  setSelections: Dispatch<SetStateAction<ColorSelection[]>>;
}

export function ColorPalette({ selections, setSelections }: ColorPaletteProps) {
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
      <SortableContext
        items={selections}
        strategy={horizontalListSortingStrategy}
      >
        <Group>
          {selections.map((selection) => (
            <ColorCard
              active={active === selection.id}
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
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActive(active.id);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      setSelections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
