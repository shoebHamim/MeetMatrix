"use client"
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallByID } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting =  ({ params }: { params: { id: string } }) => {
  //! clerk user
  const {user,isLoaded}=useUser()
  // audio and video setup
  const [isSetupComplete,setIsSetupComplete]=useState(false)
  const {call,isCallLoading}=useGetCallByID(params.id)
  if(!isLoaded||isCallLoading) return <div>loading...</div>
  return <main className="h-screen w-full">
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete?(<MeetingSetup setIsSetupComplete={setIsSetupComplete}/>):(<MeetingRoom/>)}
      </StreamTheme>
    </StreamCall>
    </main>
  
  // <div>Meeting Room {params.id}</div>;
};

export default Meeting;
