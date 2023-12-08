import { Circle, Square } from "lucide-react";
import { useRef } from "react";
import { useOptions } from "../../../../recoil/options";

const ShapeSelector = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useOptions();

  const handleShapeChange = (shape: Shape) => {
    setOptions((prev) => ({ ...prev, shape, mode: "draw", lineWidth: 5 }));
  };

  return (
    <div className="relative flex gap-2 md:gap-8 items-center" ref={ref}>
      <button
        className={`text-xl p-2 rounded-full  ${
          options.shape === "circle" && "bg-white text-black"
        } `}
        onClick={() => handleShapeChange("circle")}
      >
        <Circle />
      </button>
      <button
        className={`text-xl p-2 rounded-full  ${
          options.shape === "rect" && "bg-white text-black"
        } `}
        onClick={() => handleShapeChange("rect")}
      >
        <Square />
      </button>
    </div>
  );
};

export default ShapeSelector;
