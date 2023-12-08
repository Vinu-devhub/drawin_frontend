import { useContext } from "react";
import { roomContext } from "../context/RoomContext";

export const useBoardPosition = () => {
  const { x, y } = useContext(roomContext);

  return { x, y };
};
