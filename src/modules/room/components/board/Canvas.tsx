import { motion } from "framer-motion";
import useViewPortSize from "../../../../hooks/useViewportSize";
import { useBackground } from "../../../../recoil/background";
import { useDraw } from "../../hooks/useDraw";
import { useRefs } from "../../hooks/useRefs";

const Canvas = () => {
  const { canvasRef } = useRefs();

  const { width, height } = useViewPortSize();

  const { handleDraw, handleStartDrawing, handleEndDrawing } = useDraw();

  const bg = useBackground();

  return (
    <div className={`relative h-full w-full overflow-hidden`}>
      {bg ? bg.component : null}
      <motion.canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={(e) => handleStartDrawing(e.clientX, e.clientY)}
        onMouseUp={handleEndDrawing}
        onMouseMove={(e) => {
          handleDraw(e.clientX, e.clientY, e.shiftKey);
        }}
        onTouchStart={(e) => {
          handleStartDrawing(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY,
          );
        }}
        onTouchEnd={handleEndDrawing}
        onTouchMove={(e) => {
          handleDraw(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }}
      />
    </div>
  );
};

export default Canvas;
