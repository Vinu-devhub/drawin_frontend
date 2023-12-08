import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { roomAtom } from "./room.atoms";

export const useRoom = () => {
  const room = useRecoilValue(roomAtom);

  return room;
};

export const useSetRoom = () => {
  const setRoom = useSetRecoilState(roomAtom);

  return setRoom;
};

export const useMyMoves = () => {
  const [room, setRoom] = useRecoilState(roomAtom);

  const handleAddMyMove = (move: Move) => {
    setRoom((prev) => {
      if (prev.myMoves[prev.myMoves.length - 1]?.options?.mode === "select") {
        return {
          ...prev,
          myMoves: [...prev.myMoves.slice(0, prev.myMoves.length - 1), move],
        };
      }

      return {
        ...prev,
        myMoves: [...prev.myMoves, move],
      };
    });
  };

  const handleRemoveMyMove = () => {
    const newMoves = [...room.myMoves];

    const move = newMoves.pop();

    setRoom((prev) => ({ ...prev, myMoves: newMoves }));

    return move;
  };

  return {
    handleAddMyMove,
    handleRemoveMyMove,
    myMoves: room.myMoves,
  };
};
