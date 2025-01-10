"use server"

import { StreamSfuClient } from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret=process.env.STREAM_SECRET_KEY

export const tokenProvider=async()=>{
  const streamClient= new StreamSfuClient()
  

}