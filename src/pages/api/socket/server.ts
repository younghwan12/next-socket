import { NextApiResponseServerIO } from "@/types/chat";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const io = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    console.log(`New Socket.io server... to ${path}`);
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    console.log("서버실행");

    // 추가한거
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
      socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`user with id-${socket.id} joined room - ${roomId}`);
      });

      socket.on("send_msg", (data) => {
        console.log(data, "DATA");
        //This will send a message to a specific room ID
        socket.to(data.roomId).emit("receive_msg", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
    // 추가한거
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  } else {
    console.log("여기타나?");
  }
  res.end();
};

export default io;
