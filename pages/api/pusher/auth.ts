import { NextApiRequest, NextApiResponse } from "next"
import { pusherServer } from "@/utils/pusher/pusher";
import { getAuth } from "@clerk/nextjs/server";
export default async function handler(
  request: NextApiRequest, 
  response: NextApiResponse
) {

  const user=getAuth(request);

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data:any = {
    user_id:user?.userId,
  };
  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
};