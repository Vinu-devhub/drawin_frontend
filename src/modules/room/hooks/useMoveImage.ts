import { useContext } from "react";
import { roomContext } from "../context/RoomContext";

export const useMoveImage = () => {
  const { moveImage, setMoveImage } = useContext(roomContext);

  return {
    moveImage,
    setMoveImage,
  };
};
