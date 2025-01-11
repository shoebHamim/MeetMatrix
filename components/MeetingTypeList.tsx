"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";



const MeetingTypeList = () => {
  const router =useRouter()
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  //! get clerk user
  const {user}=useUser()
  
  const client=useStreamVideoClient()
  const [values,setValues]=useState({
    datetime:new Date(),
    description:"",
    link:""
  })
  const [callDetails,setCallDetails]=useState<Call>()
  const {toast}=useToast()
  const createMeeting=async()=>{
    if(!client||!user) return
    try{
      if(!values.datetime){
        toast({
          title: "Please select a date and time",
        })
        return
      }
      const id=crypto.randomUUID();
      const call=client.call('default',id)
      if(!call) throw new Error('Failed to crate call')
      
      const startsAt=values.datetime.toISOString()||new Date(Date.now()).toISOString()
      const description=values.description||"Instant Meeting"
      await call.getOrCreate({
        data:{
          starts_at:startsAt,
          custom:{
            description
          }
        }
      })
      setCallDetails(call)
      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: "Meeting Created",
      })
    }catch(error){
      console.log(error);
      toast({
        title: "Failed to create Meeting",
      })
    }
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
