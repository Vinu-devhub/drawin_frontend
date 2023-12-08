import { motion, useMotionValue } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";
import { DEFAULT_MOVE } from "../../../../constants/defaultMove";
import { getPos } from "../../../../util/lib/getPos";
import { socket } from "../../../../util/lib/socket";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useMoveImage } from "../../hooks/useMoveImage";
import { useRefs } from "../../hooks/useRefs";

const MoveImage = () => {
  const { canvasRef } = useRefs();
  const { x, y } = useBoardPosition();

  const { moveImage, setMoveImage } = useMoveImage();

  const imageX = useMotionValue(moveImage.x || 50);
  const imageY = useMotionValue(moveImage.y || 50);

  useEffect(() => {
    if (moveImage.x) imageX.set(moveImage.x);
    else imageX.set(50);

    if (moveImage.y) imageY.set(moveImage.y);
    else imageY.set(50);
  }, [imageX, imageY, moveImage.x, moveImage.y]);

  const handlePlaceImage = () => {
    const [finalX, finalY] = [getPos(imageX.get(), x), getPos(imageY.get(), y)];

    const move: Move = {
      ...DEFAULT_MOVE,
      img: {
        base64: moveImage.base64,
      },
      path: [[finalX, finalY]],
      options: {
        ...DEFAULT_MOVE.options,
        shape: "image",
        selection: null,
      },
    };

    socket.emit("draw", move);

    setMoveImage({ base64: "" });
    imageX.set(50);
    imageY.set(50);
  };

  if (!moveImage.base64) return null;

  return (
    <motion.div
      drag
      dragConstraints={canvasRef}
      dragElastic={0}
      dragTransition={{ power: 0.03, timeConstant: 50 }}
      className="absolute top-0 z-20 cursor-grab"
      style={{ x: imageX, y: imageY }}
    >
      <div className=" absolute top-[45%]  left-[45%]  bottom-full mb-2 flex gap-3">
        <button className="" onClick={handlePlaceImage}>
          <Check className=" h-12 w-12 bg-white border-2 border-gray-500 rounded-full p-2" />
        </button>
        <button className="" onClick={() => setMoveImage({ base64: "" })}>
          <X className=" h-12 w-12 bg-white border-2 border-gray-500 rounded-full p-2" />
        </button>
      </div>
      <img
        className=" pointer-events-none"
        alt="image to place"
        src={moveImage.base64}
      />
    </motion.div>
  );
};

export default MoveImage;
