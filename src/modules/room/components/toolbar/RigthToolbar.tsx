import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useViewPortSize from "../../../../hooks/useViewportSize";
import BackgroundPicker from "./BackgroundPicker";
import ColorPicker from "./ColorPicker";
import LineWidthPicker from "./LineWidthPicker";

const RightToolBar = () => {
  const { width } = useViewPortSize();

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (width >= 1024) setOpened(true);
    else setOpened(false);
  }, [width]);

  return (
    <>
      <motion.div
        className=" absolute -right-36 lg:right-8 top-[20%] lg:top-1/3 z-50  flex flex-col items-center gap-5 border-4 border-blue-500 rounded-lg p-2 md:p-5 bg-slate-900 text-white cursor-pointer"
        animate={{ x: opened ? 0 : -160, y: "-50%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className=" grid sm:grid-cols-2 gap-5">
          <ColorPicker />
          <LineWidthPicker />
        </div>

        <BackgroundPicker />
      </motion.div>
    </>
  );
};

export default RightToolBar;
