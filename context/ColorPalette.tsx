import {
  Dispatch,
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ColorSelection } from "../components/ColorPalette";

interface PaletteWrapperProps {
  children: JSX.Element[] | JSX.Element;
  initialColors: ColorSelection[];
}

interface PaletteContextInterface {
  colors: ColorSelection[];
  setColors: Dispatch<SetStateAction<ColorSelection[]>>;
}

const PaletteContext = createContext<PaletteContextInterface | null>(null);

export function PaletteWrapper({
  children,
  initialColors,
}: PaletteWrapperProps) {
  const [colors, setColors] = useState<ColorSelection[]>(initialColors);

  return (
    <PaletteContext.Provider value={{ colors, setColors }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePaletteContext() {
  return useContext(PaletteContext);
}
