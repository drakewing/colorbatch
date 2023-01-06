import Link from "next/link";
import { Button, Card, Center } from "@mantine/core";
import { IconClipboardCopy } from "@tabler/icons";

import { ColorSelection } from "./ColorPalette";
import { usePaletteContext } from "../context/ColorPalette";

interface ShareableLinkProps {
  cta: string;
}

export function ShareableLink({ cta }: ShareableLinkProps) {
  const { colors } = usePaletteContext();

  const copyToClipboard = () =>
    navigator.clipboard.writeText(createPaletteLink(colors));

  return (
    <Card mt={20} shadow="md" withBorder>
      <Center>
        <Card.Section pr={20} pl={20} mb={10}>
          {cta}
        </Card.Section>
      </Center>
      <Center>
        <Button
          onClick={copyToClipboard}
          rightIcon={<IconClipboardCopy />}
          color="violet"
        >
          Copy Link
        </Button>
      </Center>
    </Card>
  );
}

export function createPaletteLink(palette: ColorSelection[]): string {
  return `${process.env.NEXT_PUBLIC_COLORBATCH_HOST}?${palette
    .map((color) => color.color.substring(1))
    .join("-")}`;
}
