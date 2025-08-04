import { getUser } from '@/app/lib/user'
import Image from 'next/image'
import React from 'react'
import { ChevronDown } from 'lucide-react';

const Profile = async () => {

  const { data } = await getUser();

  return (
    <div  className='inline-block'>
      <div className='flex p-2 gap-1 border rounded-4xl bg-slate-100'>
        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 border border-slate-400 p-1 mx-2'>
          <div className='relative w-full h-full'>
            <Image
              src={'/profile.svg'}
              fill={true}
              objectFit='contain'
              alt='u'
            />
          </div>
        </div>
        <div>
          <p className='text-sm font-semibold'>{data && data.fullname}</p>
          <p className='text-sm'>{data && data.email}</p>
        </div>
        <div className='flex items-center justify-center p-2'>
          <ChevronDown className='cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default Profile
