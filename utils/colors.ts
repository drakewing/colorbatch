import { ColorSelection } from "../components/ColorPalette";

export function paramsToPalette(params: string): ColorSelection[] {
  const parsed = new URLSearchParams(params);
  const colors = Array.from(parsed.entries()).map((entry) => ({
    id: parseInt(entry[0]),
    color: entry[1],
  }));

  if (colors.length > 0) return colors;

  return [
    { id: 1, color: "#a568bd" },
    { id: 2, color: "#7a3737" },
    { id: 3, color: "#4dbf75" },
    { id: 4, color: "#c24f4f" },
  ];
}
