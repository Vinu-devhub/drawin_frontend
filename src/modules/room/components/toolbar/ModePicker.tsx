import { EraserIcon, MousePointerSquare, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useBackground } from "../../../../recoil/background";
import { useOptions } from "../../../../recoil/options";
import { useSetSelection } from "../../../../recoil/options/options.hooks";

const ModePicker = () => {
  const [options, setOptions] = useOptions();
  const [prevLineWidth, setprevLineWidth] = useState(5);

  const { theme } = useBackground();

  const { clearSelection } = useSetSelection();

  useEffect(() => {
    if (options.mode === "eraser") {
      document.body.classList.add(
        `${theme === "light" ? "eraser" : "dark-eraser"}`,
      );
    }

    return () => {
      clearSelection();
      document.body.classList.remove(
        `${theme === "light" ? "eraser" : "dark-eraser"}`,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.mode]);

  return (
    <>
      <button
        className={`text-xl p-2 rounded-full ${
          options.mode === "draw" && "bg-white text-black "
        } `}
        onClick={() =>
          setOptions((prev) => ({
            ...prev,
            mode: "draw",
            shape: "line",
            lineWidth: prevLineWidth,
          }))
        }
      >
        <Pencil />
      </button>
      <button
        className={`text-xl p-2 rounded-full  ${
          options.mode === "eraser" && "bg-white text-black"
        } `}
        onClick={() =>
          setOptions((prev) => {
            setprevLineWidth(prev.lineWidth);
            return {
              ...prev,
              mode: "eraser",
              shape: "line",
              lineWidth: Number(20),
            };
          })
        }
      >
        <EraserIcon />
      </button>
      <button
        className={`text-xl p-2 rounded-full  ${
          options.mode === "select" && "bg-white text-black"
        } `}
        onClick={() => setOptions((prev) => ({ ...prev, mode: "select" }))}
      >
        <MousePointerSquare />
      </button>
    </>
  );
};

export default ModePicker;
