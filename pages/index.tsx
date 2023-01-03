import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import { Text, Title } from "@mantine/core";

import styles from "../styles/Home.module.css";
import { HeaderMenuColored } from "../components/HeaderMenu";
import { ColorPalette, ColorSelection } from "../components/ColorPalette";
import { ShareableLink } from "../components/ShareableLink";
import { createPaletteLink, paramsToPalette } from "../utils/colors";
import { NextPageContext } from "next";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  initialColors: ColorSelection[];
}

export default function Home({ initialColors }: HomeProps) {
  const router = useRouter();

  const [selections, setSelections] = useState<ColorSelection[]>(initialColors);

  return (
    <>
      <Head>
        <title>colorbatch</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderMenuColored links={[]} />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginBottom: 30,
            marginTop: 60,
            rowGap: 10,
          }}
        >
          <Title order={1}>Create and share color palettes</Title>
          <Text size="md">
            Share them with your friends - no login required!
          </Text>
        </div>
        <ColorPalette selections={selections} setSelections={setSelections} />
        <ShareableLink
          cta="Share this palette with your friends!"
          url={createPaletteLink(selections)}
        />
      </main>
    </>
  );
}

export function getServerSideProps(context: NextPageContext) {
  const initialColors = paramsToPalette(context.req?.url?.substring(2) || "");
  return { props: { initialColors } };
}
