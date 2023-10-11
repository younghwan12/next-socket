import { NextApiResponseServerIO } from "@/types/chat";
import { NextApiRequest } from "next";

const chat = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const message = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("send_msg", message);

    // return message
    res.status(201).json(message);

    // const { message, channel } = req.body

    // // dispatch to channel "message"
    // res?.socket?.server?.io?.to(channel).emit("message", message)

    // // return message
    // res.status(201).json(message)
  }
};

export default chat;
