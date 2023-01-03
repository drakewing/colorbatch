import { ColorSelection } from "../components/ColorPalette";

export function createPaletteLink(palette: ColorSelection[]): string {
  const params = new URLSearchParams();
  palette.forEach((color) => params.append(color.id.toString(), color.color));
  return `${process.env.NEXT_PUBLIC_COLORBATCH_HOST}?${params}`;
}
