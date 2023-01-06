import { useState } from "react";
import { ActionIcon, Center, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { usePaletteContext } from "../context/ColorPalette";
import useWindowDimensions from "../utils/window";
import { makeRandomColor } from "../utils/colors";
import ColorCard from "./ColorCard";

export interface ColorSelection {
  id: number;
  color: string;
}

export default function ColorPalette() {
  const { width } = useWindowDimensions();
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
    <>
      <DndContext
        id="0"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={[...colors]} strategy={rectSortingStrategy}>
          <Group
            noWrap={(width && width > 775) as boolean}
            sx={{ gap: width && width > 775 ? 16 : 4 }}
          >
            {colors.map((color: ColorSelection) => (
              <ColorCard
                active={active === color.id}
                key={color.id}
                deleteColor={(id: number) =>
                  setColors((oldColors: ColorSelection[]) =>
                    oldColors.filter((color) => color.id !== id)
                  )
                }
                selection={color}
                setColor={(color: string, id: number) =>
                  setColors((oldColors: ColorSelection[]) =>
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
            {colors.length && colors.length < 7 && (
              <Center style={{ width: width && width < 775 ? width : 0 }}>
                <ActionIcon onClick={addColor}>
                  <IconPlus />
                </ActionIcon>
              </Center>
            )}
          </Group>
        </SortableContext>
      </DndContext>
    </>
  );

  function addColor() {
    setColors((oldColors: ColorSelection[]) => {
      if (oldColors.length >= 7) {
        return oldColors;
      }

      const maxId = oldColors.reduce(
        (acc, cur) => (cur.id > acc ? cur.id : acc),
        0
      );

      return [...oldColors, { id: maxId + 1, color: makeRandomColor() }];
    });
  }

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

    setActive(0);
  }
}
