"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";

const CallList = ({
  type,
}: {
  type: "upcoming" | "recording" | "previous";
}) => {
  const { upcomingCalls, previousCalls, recordings,isLoading } = useGetCalls();
  const router = useRouter();
  const [recording, setRecording] = useState<CallRecording[]>([]);
  const getCalls = () => {
    switch (type) {
      case "previous":
        return previousCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return recordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "previous":
        return "No previous calls";
      case "upcoming":
        return "No upcoming calls";
      case "recording":
        return "No recording";
      default:
        return " ";
    }
  };
  useEffect(()=>{
    const fetchRecordings=async()=>{
      const callData=await Promise.all(recordings.map((meeting) => meeting.queryRecordings()) ?? [])
      const fetchedRecording=callData
      .filter(call=>call.recordings.length>0)
      .flatMap(call=>call.recordings)
      setRecording(fetchedRecording)
    }
    if(type==='recording') fetchRecordings()

  },[type,recordings])
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  if(isLoading){
    return <div>loading</div>
  }
  console.log(recording);
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 && type!=="recording" ? 
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={type==='previous'?'/icons/previous.svg':type==="upcoming"?'/icons/upcoming.svg':'/icons/recordings.svg'}
            title={(meeting as Call).state.custom.description.substring(0,20)||"No Description"}
            date={(meeting as Call).state.startsAt?.toLocaleString()as string}
            isPreviousMeeting={type==='previous'}
            buttonIcon1={type==='recording'?'/icons/play.svg':undefined}
            handleClick={type==='recording'?()=>router.push(`${(meeting as CallRecording).url}`):()=>router.push(`meeting/${(meeting as Call).id}`)}
            link={type==='recording'?(meeting as CallRecording).url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
            buttonText={type==='recording'?'Play':'Start'}
          />
        )
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
            {calls && calls.length > 0 && type==="recording" &&
        recording.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as CallRecording)?.url}
            icon={'/icons/recordings.svg'}
            title={(meeting as CallRecording).filename.substring(0,20)||"No Name"}
            date={(meeting as CallRecording).start_time?.toLocaleString()as string}
            isPreviousMeeting={false}
            buttonIcon1={type==='recording'?'/icons/play.svg':undefined}
            handleClick={type==='recording'?()=>router.push(`${(meeting as CallRecording).url}`):()=>router.push(`meeting/${(meeting as Call).id}`)}
            link={type==='recording'?(meeting as CallRecording).url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
            buttonText={type==='recording'?'Play':'Start'}
          />
        )
      ) }
    </div>
  );
};

export default CallList;
