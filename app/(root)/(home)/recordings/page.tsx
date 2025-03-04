import CallList from '@/components/CallList'
import React from 'react'

const page = () => {
  return (
    <section className='flex size-full flex-col gap10 text-white'>
    <h1 className='text-3xl font-bold'>Recording</h1>
    <CallList type='recording'></CallList>
  </section>
  )
}

export default page