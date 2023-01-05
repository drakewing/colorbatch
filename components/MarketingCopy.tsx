import { Text, Title } from "@mantine/core";
import useWindowDimensions from "../utils/window";

const TopCopy = () => {
  const { width } = useWindowDimensions();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginBottom: width && width > 775 ? 30 : 10,
        marginTop: width && width > 775 ? 40 : 10,
        rowGap: width && width > 775 ? 10 : 0,
      }}
    >
      <Title order={width && width > 775 ? 1 : 3}>
        Create and share color palettes
      </Title>
      <Text size={width && width > 775 ? "md" : "sm"}>
        Share them with your friends - no login required!
      </Text>
    </div>
  );
};

export default TopCopy;
