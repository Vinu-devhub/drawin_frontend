import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { DEFAULT_MOVE } from "../../../constants/defaultMove";
import { useBackground } from "../../../recoil/background";
import { useOptionsValue } from "../../../recoil/options";
// import { socket } from "../../../util/lib/socket";
import { useCtxs } from "./useCtxs";
import { useMoveImage } from "./useMoveImage";
import { useRefs } from "./useRefs";

let tempSelection = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export const useSelection = (drawAllMoves: () => Promise<void>) => {
  const ctx = useCtxs();

  const options = useOptionsValue();

  const { theme: themeBg } = useBackground();

  const { selection } = options;

  const { canvasRef, selectionsRef } = useRefs();
  const { setMoveImage } = useMoveImage();

  useEffect(() => {
    const callback = async () => {
      if (ctx && selection) {
        await drawAllMoves();
        setTimeout(() => {
          const { x, y, width, height } = selection;

          ctx.lineWidth = 2;
          ctx.strokeStyle = themeBg === "light" ? "#000" : "#fff";
          ctx.setLineDash([5, 10]);
          ctx.globalCompositeOperation = "source-over";

          ctx.beginPath();
          ctx.rect(x, y, width, height);
          ctx.stroke();
          ctx.closePath();

          ctx.setLineDash([]);
        }, 10);
      }
    };

    if (
      tempSelection.width !== selection?.width ||
      tempSelection.height !== selection?.height ||
      tempSelection.x !== selection?.x ||
      tempSelection.y !== selection?.y
    )
      callback();

    return () => {
      if (selection) tempSelection = selection;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, ctx]);

  const dimensions = useMemo(() => {
    if (selection) {
      let { x, y, width, height } = selection;

      if (width < 0) {
        width += 4;
        x -= 2;
      } else {
        width -= 4;
        x += 2;
      }

      if (height < 0) {
        height += 4;
        y -= 2;
      } else {
        height -= 4;
        y += 2;
      }

      return { x, y, width, height };
    }

    return { x: 0, y: 0, width: 0, height: 0 };
  }, [selection]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const makeBlob = async (withbg?: boolean) => {
    if (!selection) return null;

    // const { x, y, width, height } = selection;
    const { x, y, width, height } = dimensions;

    const imageData = ctx?.getImageData(x, y, width, height);

    if (imageData) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const tempCtx = canvas.getContext("2d");

      if (tempCtx && canvasRef.current) {
        const bgImage = canvasRef.current
          .getContext("2d")
          ?.getImageData(x, y, width, height);

        if (bgImage && withbg) tempCtx.putImageData(bgImage, 0, 0);

        const sTempCtx = tempCanvas.getContext("2d");
        sTempCtx?.putImageData(imageData, 0, 0);

        tempCtx.drawImage(tempCanvas, 0, 0);

        const blob: Blob = await new Promise((resolve) => {
          canvas.toBlob((blobGenerated) => {
            if (blobGenerated) resolve(blobGenerated);
          });
        });

        return blob;
      }
    }

    return null;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createDeleteMove = () => {
    if (!selection) return null;

    let { x, y, width, height } = selection;

    if (width < 0) {
      width += 4;
      x -= 2;
    } else {
      width -= 4;
      x += 2;
    }

    if (height < 0) {
      height += 4;
      y -= 2;
    } else {
      height -= 4;
      y += 2;
    }

    const move: Move = {
      ...DEFAULT_MOVE,
      rect: {
        width,
        height,
      },
      path: [[x, y]],
      options: {
        ...options,
        shape: "rect",
        mode: "eraser",
        fillColor: { r: 0, g: 0, b: 0, a: 1 },
      },
    };

    // socket.emit("draw", move);

    return move;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCopy = async () => {
    const blob = await makeBlob(true);

    if (blob) {
      navigator.clipboard
        .write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ])
        .then(() => {
          toast("Copied to clipboard", {
            position: "top-right",
            theme: `${themeBg === "dark" ? "light" : "dark"}`,
            closeOnClick: true,
          });
        });
    }
  };

  useEffect(() => {
    const handleSelection = async (e: KeyboardEvent) => {
      if (e.key === "c" && e.ctrlKey) handleCopy();

      if (e.key === "Delete" && selection) createDeleteMove();
    };

    document.addEventListener("keydown", handleSelection);

    return () => {
      document.removeEventListener("keydown", handleSelection);
    };
  }, [
    canvasRef,
    createDeleteMove,
    ctx,
    handleCopy,
    makeBlob,
    options,
    selection,
  ]);

  useEffect(() => {
    if (selectionsRef.current) {
      const copyBtn = selectionsRef.current[1];
      const deleteBtn = selectionsRef.current[2];

      copyBtn.addEventListener("click", handleCopy);
      deleteBtn.addEventListener("click", createDeleteMove);

      return () => {
        copyBtn.removeEventListener("click", handleCopy);
        deleteBtn.removeEventListener("click", createDeleteMove);
      };
    }

    return () => {};
  }, [
    createDeleteMove,
    dimensions,
    handleCopy,
    makeBlob,
    selection,
    selectionsRef,
    setMoveImage,
  ]);
};
