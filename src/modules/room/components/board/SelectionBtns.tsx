import { Copy, Trash } from "lucide-react";
import { useBackground } from "../../../../recoil/background";
import { useOptionsValue } from "../../../../recoil/options";
import { useRefs } from "../../hooks/useRefs";

const SelectionBtns = () => {
  const { selection } = useOptionsValue();

  const { selectionsRef } = useRefs();

  const { theme } = useBackground();

  let top;
  let left;

  if (selection) {
    const { x, y, width, height } = selection;

    top = Math.min(y, y + height) - 50;
    left = Math.max(x, x + width) - 90;
  } else {
    top = -50;
    left = -40;
  }

  return (
    <div
      className=" absolute top-0 left-0 z-50 flex items-center justify-center gap-2"
      style={{ top, left }}
    >
      <button
        className={`rounded-full p-2 ${
          theme === "light" ? "text-slate-800" : "text-gray-50"
        }`}
        ref={(ref) => {
          if (ref && selectionsRef.current) {
            selectionsRef.current[1] = ref;
          }
        }}
      >
        <Copy />
      </button>
      <button
        className={`rounded-full p-2 ${
          theme === "light" ? "text-slate-800" : "text-gray-50"
        }`}
        ref={(ref) => {
          if (ref && selectionsRef.current) {
            selectionsRef.current[2] = ref;
          }
        }}
      >
        <Trash />
      </button>
    </div>
  );
};

export default SelectionBtns;
