import { ColorSelection } from "../components/ColorPalette";

const numberRegex = /^[0-9a-fA-F]{6}$/;

export function paramsToPalette(params: string): ColorSelection[] {
  const colors = params
    .split("-")
    .filter((color) => numberRegex.test(color))
    .slice(0, 7)
    .map((color) => `#${color}`)
    .map((color, i) => ({
      id: i + 1,
      color: color,
    }));

  if (colors.length > 0) return colors;

  return [...Array(5)].map((_, i) => ({ id: i + 1, color: makeRandomColor() }));
}

export function makeRandomColor(): string {
  const code = [...Array(6)]
    .map((digit) => Math.floor(Math.random() * 16).toString(16))
    .join("");

  return `#${code}`;
}
