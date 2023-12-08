import RoomContextProvider from "../context/Room.context";
import Canvas from "./board/Canvas";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionBtns";
import HistoryBtns from "./toolbar/HistoryBtns";
import HorizontalBar from "./toolbar/HorizontalBar";
import RightToolBar from "./toolbar/RigthToolbar";

const Room = () => {
  return (
    <RoomContextProvider>
      <div className="h-full w-full relative">
        <Canvas />
        <SelectionBtns />
        <HistoryBtns />
        <HorizontalBar />
        <RightToolBar />
        <MoveImage />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
