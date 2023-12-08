import { motion } from "framer-motion";
import { Download } from "lucide-react";
import useViewPortSize from "../../../../hooks/useViewportSize";
import { useRefs } from "../../hooks/useRefs";
import ImagePicker from "./ImagePicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";

const HorizontalBar = () => {
  const { canvasRef } = useRefs();

  const { width, height } = useViewPortSize();

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const tempCtx = canvas.getContext("2d");

    if (tempCtx && canvasRef.current) {
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "image.png";
    link.click();
  };

  return (
    <>
      <motion.div
        className=" absolute left-[5%] sm:left-[20%] lg:left-[30%] bottom-2 md:bottom-4 z-50 flex items-center gap-2 md:gap-10 bg-slate-900 border-2 rounded-xl p-1 md:p-2 text-white shadow-xl cursor-pointer"
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <ShapeSelector />
        <ModePicker />
        <ImagePicker />

        <button
          className={`text-xl p-2 rounded-full  `}
          onClick={handleDownload}
        >
          <Download />
        </button>
      </motion.div>
    </>
  );
};

export default HorizontalBar;
