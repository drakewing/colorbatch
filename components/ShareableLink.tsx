import Link from "next/link";
import { Button, Card } from "@mantine/core";
import { IconClipboardCopy } from "@tabler/icons";

import { ColorSelection } from "./ColorPalette";
import { usePaletteContext } from "../context/ColorPalette";

interface ShareableLinkProps {
  cta: string;
  url: string;
}

export function ShareableLink({ cta, url }: ShareableLinkProps) {
  const { colors } = usePaletteContext();

  const style: any = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 10,
    marginTop: 30,
  };

  const copyToClipboard = () =>
    navigator.clipboard.writeText(createPaletteLink(colors));

  return (
    <Card style={style} shadow="md" withBorder>
      {cta}
      <Button
        onClick={copyToClipboard}
        rightIcon={<IconClipboardCopy />}
        color="violet"
      >
        Copy Link
      </Button>
    </Card>
  );
}

export function createPaletteLink(palette: ColorSelection[]): string {
  return `http://${process.env.NEXT_PUBLIC_COLORBATCH_HOST}?${palette
    .map((color) => color.color.substring(1))
    .join("-")}`;
}
