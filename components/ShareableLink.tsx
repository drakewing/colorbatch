import Link from "next/link";
import { Button, Card } from "@mantine/core";
import { IconClipboardCopy } from "@tabler/icons";

interface ShareableLinkProps {
  cta: string;
  url: string;
}

export function ShareableLink({ cta, url }: ShareableLinkProps) {
  const style: any = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 10,
    marginTop: 30,
  };

  return (
    <Card style={style} shadow="md" withBorder>
      {cta}
      <Button rightIcon={<IconClipboardCopy />} color="violet" >
        <Link href={url}>Copy Palette Link</Link>
      </Button>
    </Card>
  );
}
