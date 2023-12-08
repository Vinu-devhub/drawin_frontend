import { ReactNode } from "react";
import { atom } from "recoil";

export const backgroundAtom = atom<{
  component: ReactNode;
  theme: "light" | "dark";
}>({
  key: "bg",
  default: {
    component: null,
    theme: "light",
  },
});
