import Link from "next/link";
import { Button, Card } from "@mantine/core";

export function ShareableLink({ link }: { link: string }) {
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
      {link}
      <Button color="violet">
        <Link href="https://google.com">Testing!!!</Link>
      </Button>
    </Card>
  );
}
