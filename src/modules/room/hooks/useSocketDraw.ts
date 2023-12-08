// import { useEffect } from "react";
// import { useSetUsers } from "../../../recoil/room";
// import { socket } from "../../../util/lib/socket";

// export const useSocketDraw = (drawing: boolean) => {
//   const { handleAddMoveToUser, handleRemoveFromUser } = useSetUsers();

//   useEffect(() => {
//     let moveToDrawlater: Move | undefined;
//     let userIdLater = "";

//     socket.on("user_draw", (move, userId) => {
//       if (!drawing) {
//         handleAddMoveToUser(userId, move);
//       } else {
//         moveToDrawlater = move;
//         userIdLater = userId;
//       }
//     });

//     return () => {
//       socket.off("user_draw");

//       if (moveToDrawlater && userIdLater) {
//         handleAddMoveToUser(userIdLater, moveToDrawlater);
//       }
//     };
//   }, [drawing, handleAddMoveToUser]);

//   useEffect(() => {
//     socket.on("user_undo", (userId) => {
//       handleRemoveFromUser(userId);
//     });

//     return () => {
//       socket.off("user_undo");
//     };
//   }, [handleRemoveFromUser]);
// };
