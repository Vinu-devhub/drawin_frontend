import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundAtom } from "./background.atom";

export const useBackground = () => {
  const bg = useRecoilValue(backgroundAtom);

  // useEffect(() => {})

  return bg;
};

export const useSetBackground = () => {
  const setBg = useSetRecoilState(backgroundAtom);

  const setBackground = (
    children: React.ReactNode,
    theme: "light" | "dark",
  ) => {
    setBg({ component: children, theme });
  };

  return setBackground;
};
