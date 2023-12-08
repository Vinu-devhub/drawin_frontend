import { Grid3X3, Square } from "lucide-react";
import { useSetBackground } from "../../../../recoil/background";
import { useOptions } from "../../../../recoil/options";
import {
  BgDark,
  BgDarkGrid1,
  BgLight,
  BgLightGrid1,
} from "../board/Background";

const BackgroundPicker = () => {
  const setBackground = useSetBackground();

  const [options, setOptions] = useOptions();

  return (
    <div className="relative flex flex-col items-center rounded-md">
      <div className="grid sm:grid-cols-2 gap-5">
        <Grid3X3
          className=" cursor-pointer rounded-md border-2 bordfer-blue-500"
          tabIndex={0}
          fill="#3183DB"
          stroke="black"
          onClick={() => {
            setBackground(<BgDarkGrid1 />, "dark");
            setOptions({
              ...options,
              lineColor: { r: 255, g: 255, b: 255, a: 1 },
            });
          }}
        />
        <Grid3X3
          className=" cursor-pointer rounded-md"
          tabIndex={0}
          onClick={() => {
            setBackground(<BgLightGrid1 />, "light");
            setOptions({
              ...options,
              lineColor: { r: 0, g: 0, b: 0, a: 1 },
            });
          }}
        />
        <Square
          className=" cursor-pointer rounded-md"
          tabIndex={0}
          onClick={() => {
            setBackground(<BgDark />, "dark");
            setOptions({
              ...options,
              lineColor: { r: 255, g: 255, b: 255, a: 1 },
            });
          }}
        />
        <Square
          className=" cursor-pointer rounded-md"
          fill="white"
          tabIndex={0}
          onClick={() => {
            setBackground(<BgLight />, "light");
            setOptions({
              ...options,
              lineColor: { r: 0, g: 0, b: 0, a: 1 },
            });
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundPicker;
