import { useMotionValue } from "framer-motion";
import { ReactChild, useRef, useState } from "react";
import { roomContext } from "./RoomContext";

const RoomContextProvider = ({ children }: { children: ReactChild }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectionsRef = useRef<HTMLButtonElement[]>([]);

  const [moveImage, setMoveImage] = useState<{
    base64: string;
    x?: number;
    y?: number;
  }>({ base64: "" });

  return (
    <roomContext.Provider
      value={{
        x,
        y,
        canvasRef,
        moveImage,
        setMoveImage,
        selectionsRef,
      }}
    >
      {children}
    </roomContext.Provider>
  );
};

export default RoomContextProvider;
