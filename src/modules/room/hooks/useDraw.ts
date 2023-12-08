import { useState } from "react";
import { useOptionsValue } from "../../../recoil/options";
import { useSetSelection } from "../../../recoil/options/options.hooks";
import { useSetSavedMoves } from "../../../recoil/savedMoves/savedMoved.hooks";
import { getPos } from "../../../util/lib/getPos";
import { getStringRgba } from "../../../util/lib/rgba";
import { socket } from "../../../util/lib/socket";
import { drawCircle, drawLine, drawRect } from "../helpers/Canvas.helper";
import { useBoardPosition } from "./useBoardPosition";
import { useCtxs } from "./useCtxs";

import { DEFAULT_MOVE } from "../../../constants/defaultMove";
import { useBackground } from "../../../recoil/background";
import { useMyMoves } from "../../../recoil/room";

let tempMoves: [number, number][] = [];

let tempCircle = { cX: 0, cY: 0, radiusX: 0, radiusY: 0 };
let tempSize = {
  width: 0,
  height: 0,
};
let tempImageData: ImageData | undefined;

export const useDraw = () => {
  const options = useOptionsValue();
  const ctx = useCtxs();
  const [drawing, setDrawing] = useState(false);
  const boardPosition = useBoardPosition();

  const { setSelection, clearSelection } = useSetSelection();
  const { handleAddMyMove } = useMyMoves();
  const { theme } = useBackground();

  const { clearSavedMoves } = useSetSavedMoves();

  const movedX = boardPosition.x;
  const movedY = boardPosition.y;

  const setCtxOptions = () => {
    if (ctx) {
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = getStringRgba(options.lineColor);
      ctx.fillStyle = getStringRgba(options.fillColor);
      if (options.mode === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
      } else {
        ctx.globalCompositeOperation = "source-over";
      }
    }
  };

  const drawAndSet = () => {
    if (!tempImageData) {
      tempImageData = ctx?.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height,
      );
    }

    if (tempImageData) {
      ctx?.putImageData(tempImageData, 0, 0);
    }
  };

  const handleStartDrawing = (x: number, y: number) => {
    if (!ctx) return;

    const finalX = getPos(x, movedX);
    const finalY = getPos(y, movedY);

    setDrawing(true);
    setCtxOptions();
    drawAndSet();

    if (options.shape === "line" && options.mode !== "select") {
      ctx?.beginPath();
      ctx?.lineTo(finalX, finalY);
      ctx?.stroke();
    }

    tempMoves.push([finalX, finalY]);
  };

  const handleDraw = (x: number, y: number, shift?: boolean) => {
    if (!ctx || !drawing) {
      return;
    }

    const finalX = getPos(x, movedX);
    const finalY = getPos(y, movedY);

    drawAndSet();

    if (options.mode === "select") {
      ctx.fillStyle =
        theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

      drawRect(ctx, tempMoves[0], finalX, finalY, false, true);
      tempMoves.push([finalX, finalY]);

      setCtxOptions();

      return;
    }

    switch (options.shape) {
      case "line":
        if (shift) {
          tempMoves = tempMoves.slice(0, 1);
        }
        drawLine(ctx, tempMoves[0], finalX, finalY, shift);
        tempMoves.push([finalX, finalY]);
        break;
      case "circle":
        tempCircle = drawCircle(ctx, tempMoves[0], finalX, finalY);
        break;
      case "rect":
        tempSize = drawRect(ctx, tempMoves[0], finalX, finalY, shift);
        break;
      default:
        break;
    }
  };

  const clearOnYourMove = () => {
    drawAndSet();
    tempImageData = undefined;
  };

  const handleEndDrawing = () => {
    if (!ctx) return;

    setDrawing(false);

    ctx.closePath();

    let addMove = true;

    if (options.mode === "select" && tempMoves.length) {
      clearOnYourMove();

      let x = tempMoves[0][0];
      let y = tempMoves[0][1];

      let width = tempMoves[tempMoves.length - 1][0] - x;
      let height = tempMoves[tempMoves.length - 1][1] - y;

      if (width < 0) {
        width -= 4;
        x += 2;
      } else {
        width += 4;
        x -= 2;
      }

      if (height < 0) {
        height -= 4;
        y += 2;
      } else {
        height += 4;
        y -= 2;
      }

      if ((width < 4 || width > 4) && (height < 4 || height > 4)) {
        setSelection({ x, y, width, height });
      } else {
        clearSelection();
        addMove = false;
      }
    }

    const move: Move = {
      ...DEFAULT_MOVE,
      rect: {
        ...tempSize,
      },
      circle: {
        ...tempCircle,
      },
      path: tempMoves,
      options,
    };

    tempMoves = [];
    tempCircle = {
      cX: 0,
      cY: 0,
      radiusX: 0,
      radiusY: 0,
    };
    tempSize = {
      width: 0,
      height: 0,
    };

    if (options.mode !== "select") {
      socket.emit("draw", move);
      clearSavedMoves();
    } else if (addMove) {
      handleAddMyMove(move);
    }
  };

  return {
    drawing,
    handleDraw,
    handleStartDrawing,
    handleEndDrawing,
    clearOnYourMove,
  };
};
