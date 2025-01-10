
import {  StreamCall, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;


const StreamVideoProvider=({children}:{children:ReactNode})=> {
  const user="hamim" // this will be dynamic
  const isLoaded=true // this will be dynamic
  const [videoClient,setVideoClient]=useState<StreamVideoClient>()
  useEffect(()=>{
    if(!isLoaded||!user) return
    if(!apiKey) throw new Error('Stream API key is missing')
    
    const client=new StreamVideoClient({
      apiKey,
      user:{
        id: "Kir_Kanos" ,
        name:user, 
        image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1736333105~exp=1736336705~hmac=6345776b69f3358bd48322cd395873f01096cd9e233d64ac5f7d87b36e9d4df6&w=740"
      }
    })
    


  },[user,isLoaded])

  return (
    <StreamVideo client={videoClient}>

    </StreamVideo>
  );
}
export default StreamVideoProvider;

