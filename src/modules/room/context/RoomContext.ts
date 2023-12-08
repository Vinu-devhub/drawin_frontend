import { MotionValue } from "framer-motion";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

export const roomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
  canvasRef: RefObject<HTMLCanvasElement>;
  selectionsRef: RefObject<HTMLButtonElement[]>;
  moveImage: { base64: string; x?: number; y?: number };
  setMoveImage: Dispatch<
    SetStateAction<{
      base64: string;
      x?: number | undefined;
      y?: number | undefined;
    }>
  >;
}>(null!);
