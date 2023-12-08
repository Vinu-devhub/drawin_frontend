import { useContext } from "react";
import { roomContext } from "../context/RoomContext";

export const useRefs = () => {
  const { canvasRef, selectionsRef } = useContext(roomContext);

  return { canvasRef, selectionsRef };
};
