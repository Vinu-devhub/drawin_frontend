import { AnimatePresence, motion } from "framer-motion";
import { AlignCenter } from "lucide-react";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useOptions } from "../../../../recoil/options";

const LineWidthPicker = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex items-center " ref={ref}>
      <button
        className="text-xl"
        onClick={() => setOpened(!opened)}
        disabled={options.mode === "select"}
      >
        <AlignCenter
          className={`${options.mode === "select" && " opacity-10"}`}
        />
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute top-[5px] right-24 w-36"
            initial="from"
            animate="to"
            exit="from"
          >
            <input
              type="range"
              min={1}
              max={20}
              value={options.lineWidth}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  lineWidth: Number(e.target.value),
                }))
              }
              className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-blue-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LineWidthPicker;
