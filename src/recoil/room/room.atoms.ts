import { atom } from "recoil";

export const DEFAULT_ROOM = {
  id: "",
  myMoves: [],
  currentMove: null,
};

export const roomAtom = atom<ClientRoom>({
  key: "room",
  default: DEFAULT_ROOM,
});
