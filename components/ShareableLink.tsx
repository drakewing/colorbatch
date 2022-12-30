import Link from "next/link";
import { Button, Card } from "@mantine/core";
import { IconClipboardCopy } from "@tabler/icons";

export function ShareableLink({ cta }: { cta: string }) {
  const style: any = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 20,
    marginTop: 40,
  };

  return (
    <Card style={style} shadow="md" withBorder>
      {cta}
      <Button rightIcon={<IconClipboardCopy />} color="violet">
        <Link href="https://google.com">Copy Palette Link</Link>
      </Button>
    </Card>
  );
}
