"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { title } from "process";


const MeetingTypeList = () => {
  const router =useRouter()
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  console.log(meetingState);
  const createMeeting=()=>{

  }


  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img='icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState("isInstantMeeting")}
        background='bg-orange-1'
      ></HomeCard>

      <HomeCard img='icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState("isScheduledMeeting")}
        background='bg-blue-1'></HomeCard>
      <HomeCard img='icons/recordings.svg'
        title='View Recording'
        description='Checkout your recording'
        handleClick={() => router.push("/recordings")}
        background='bg-purple-1'></HomeCard>
      <HomeCard img='icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation Link'
        handleClick={() => setMeetingState("isJoiningMeeting")}
        background='bg-yellow-1'></HomeCard>
        <MeetingModal isOpen={meetingState==='isInstantMeeting'}
        onClose={()=>setMeetingState(undefined)
        }
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        ></MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
