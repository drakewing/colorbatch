import { ColorSelection } from "../components/ColorPalette";

const numberRegex = /^[0-9a-fA-F]{6}$/;

export function paramsToPalette(params: string): ColorSelection[] {
  const colors = params
    .split("-")
    .filter((color) => numberRegex.test(color))
    .slice(0, 7)
    .map((color) => `#${color}`)
    .map((color, i) => ({
      id: i,
      color: color,
    }));

  if (colors.length > 0) return colors;

  return [
    { id: 1, color: "#a568bd" },
    { id: 2, color: "#7a3737" },
    { id: 3, color: "#4dbf75" },
    { id: 4, color: "#c24f4f" },
    { id: 5, color: "#1568bd" },
    { id: 6, color: "#1568bd" },
    { id: 7, color: "#1568bd" },
  ];
}
