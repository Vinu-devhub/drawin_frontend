import { AnimatePresence, motion } from "framer-motion";
import { Palette } from "lucide-react";
import { useRef, useState } from "react";
import { RgbaColorPicker } from "react-colorful";
import { useClickAway } from "react-use";
import { useOptions } from "../../../../recoil/options";
import { ColorPickerAnimation } from "../../animations/ColorPicker.animations";

const ColorPicker = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex items-center " ref={ref}>
      <button
        className=""
        onClick={() => setOpened(!opened)}
        disabled={options.mode === "select"}
      >
        <Palette className={`${options.mode === "select" && " opacity-10"}`} />
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute right-16  mt-24 "
            variants={ColorPickerAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <h2 className=" font-semibold text-black dark:text-white ml-3">
              Line Color
            </h2>
            <RgbaColorPicker
              color={options.lineColor}
              onChange={(color) => setOptions({ ...options, lineColor: color })}
              className=" mb-5"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
