import { useEffect, useMemo } from "react";
import { useSetSelection } from "../../../recoil/options/options.hooks";
import { useMyMoves, useRoom } from "../../../recoil/room";
import { useSetSavedMoves } from "../../../recoil/savedMoves/savedMoved.hooks";
import { getStringRgba } from "../../../util/lib/rgba";
import { socket } from "../../../util/lib/socket";
import { useCtxs } from "./useCtxs";
import { useSelection } from "./useSelection";

let prevMovesLength = 0;

export const useMovesHandler = (clearOnYourMove: () => void) => {
  const room = useRoom();

  const { handleAddMyMove, handleRemoveMyMove } = useMyMoves();
  const { addSavedMove, removeSavedMove } = useSetSavedMoves();

  const ctx = useCtxs();
  const { clearSelection } = useSetSelection();

  const sortedMoves = useMemo(() => {
    const { myMoves } = room;

    const moves = [...myMoves];

    moves.sort((a, b) => a.timestamp - b.timestamp);

    return moves;
  }, [room]);

  const drawMove = (move: Move, image?: HTMLImageElement) => {
    const { path } = move;

    if (!ctx && !path?.length) {
      return;
    }

    const moveOptions = move.options;

    if (moveOptions.mode === "select") return;

    ctx!.lineWidth = moveOptions.lineWidth;
    ctx!.strokeStyle = getStringRgba(moveOptions.lineColor);
    ctx!.fillStyle = getStringRgba(moveOptions.fillColor);
    if (moveOptions.mode === "eraser") {
      ctx!.globalCompositeOperation = "destination-out";
    } else {
      ctx!.globalCompositeOperation = "source-over";
    }

    if (moveOptions.shape === "image" && image) {
      ctx!.drawImage(image, path[0][0], path[0][1]);
    }

    switch (moveOptions.shape) {
      case "line":
        ctx?.beginPath();
        path.forEach(([x, y]) => {
          ctx?.lineTo(x, y);
        });
        ctx?.stroke();
        ctx?.closePath();
        break;

      case "circle": {
        const { cX, cY, radiusX, radiusY } = move.circle;
        ctx?.beginPath();
        ctx?.ellipse(cX, cY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx?.stroke();
        ctx?.fill();
        ctx?.closePath();
        break;
      }

      case "rect": {
        const { width, height } = move.rect;
        ctx?.beginPath();
        ctx?.rect(path[0][0], path[0][1], width, height);
        ctx?.stroke();
        ctx?.fill();
        ctx?.closePath();
        break;
      }

      default:
        break;
    }
  };

  const drawAllMoves = async () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const images = await Promise.all(
      sortedMoves
        .filter((move) => move.options.shape === "image")
        .map((move) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = move.img.base64;
            img.id = move.id;
            img.addEventListener("load", () => resolve(img));
          });
        }),
    );

    sortedMoves.forEach((move) => {
      if (move.options.shape === "image") {
        const img = images.find((img) => img.id === move.id);
        if (img) {
          drawMove(move, img);
        }
      } else {
        drawMove(move);
      }
    });
  };

  useSelection(drawAllMoves);

  useEffect(() => {
    socket.on("your_move", (move) => {
      clearOnYourMove();
      handleAddMyMove(move);
      setTimeout(clearSelection, 100);
    });

    return () => {
      socket.off("your_move");
    };
  }, [handleAddMyMove, clearOnYourMove, clearSelection]);

  useEffect(() => {
    if (prevMovesLength >= sortedMoves.length || !prevMovesLength) {
      drawAllMoves();
    } else {
      const lastMove = sortedMoves[sortedMoves.length - 1];

      if (lastMove?.options?.shape === "image") {
        const img = new Image();
        img.src = lastMove.img.base64;
        img.addEventListener("load", () => drawMove(lastMove, img));
      } else {
        drawMove(lastMove);
      }
    }

    return () => {
      prevMovesLength = sortedMoves.length;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedMoves]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUndo = () => {
    if (ctx) {
      const move = handleRemoveMyMove();

      if (move?.options.mode === "select") {
        clearSelection();
      } else if (move) {
        addSavedMove(move);
        socket.emit("undo");
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRedo = () => {
    if (ctx) {
      const move = removeSavedMove();
      if (move) {
        socket.emit("draw", move);
      }
    }
  };

  useEffect(() => {
    const handleUndoRedoKeyboard = (e: KeyboardEvent) => {
      if (e.key === "z" && e.ctrlKey) {
        handleUndo();
      } else if (e.key === "y" && e.ctrlKey) {
        handleRedo();
      }
    };

    document.addEventListener("keydown", handleUndoRedoKeyboard);

    return () => {
      document.removeEventListener("keydown", handleUndoRedoKeyboard);
    };
  }, [handleUndo, handleRedo]);

  return {
    drawAllMoves,
    drawMove,
    handleUndo,
    handleRedo,
  };
};
