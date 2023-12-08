import { Redo, Undo } from "lucide-react";
import { useMyMoves } from "../../../../recoil/room";
import { useSavedMoves } from "../../../../recoil/savedMoves";
import { useDraw } from "../../hooks/useDraw";
import { useMovesHandler } from "../../hooks/useMovesHandler";

const HistoryBtns = () => {
  const { myMoves } = useMyMoves();

  const savedMoves = useSavedMoves();

  const { clearOnYourMove } = useDraw();

  const { handleUndo, handleRedo } = useMovesHandler(clearOnYourMove);

  return (
    <div className=" absolute top-5  left-5 z-10 flex flex-col md:flex-row items-center gap-3 md:gap-5 bg-slate-900 border-2 border-blue-500 rounded-xl p-1 md:p-2 text-white cursor-pointer">
      <button
        className=" text-xl bg-blue-500/80 active:bg-white active:text-black p-0.5  md:p-1 rounded-full cursor-pointer "
        onClick={handleRedo}
        disabled={!savedMoves.length}
      >
        <Redo />
      </button>
      <button
        className=" text-xl bg-blue-500/80 active:bg-white active:text-black  p-0.5  md:p-1 rounded-full cursor-pointer"
        onClick={handleUndo}
        disabled={!myMoves.length}
      >
        <Undo />
      </button>
    </div>
  );
};

export default HistoryBtns;
