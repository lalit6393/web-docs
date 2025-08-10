import React from 'react'
import Link from "@/modules/link/Link";
import { getDocuments } from '@/app/api/getDocumentById';
import Profile from '@/modules/profile/Profile';
import { Plus } from 'lucide-react';

const Documents = async () => {

    const data = await getDocuments();


    if (data.err) return <p> An Error Occured!</p>



    return (
        <div className='flex flex-col w-full px-8 py-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>My Documents</h1>
                <Profile />
            </div>
            <div className='flex flex-wrap w-full gap-4 py-4 text-slate-700'>
                {
                    data.data && data.data.map((doc: any) => {
                        return <Link href={`/documents/details/${doc._id}`} className='flex flex-col shrink-0 justify-end p-4 cursor-pointer border-1 border-slate-200 rounded-2xl w-[16rem] h-[20rem] hover:border-blue-700' key={doc._id}>
                            <div className='flex w-full h-full bg-slate-300 rounded-sm box-border'></div>
                            <h1 className='text-base font-medium pt-2'>
                                {doc.title.length > 20
                                    ? doc.title.slice(0, 20) + "..."
                                    : doc.title
                                }
                            </h1>
                            <p className='text-[0.95rem] leading-[1.3]'>
                                {doc.description.length > 50
                                    ? doc.description.slice(0, 50) + "..."
                                    : doc.description}
                            </p>
                        </Link>
                    })
                }
                <Link href={`/documents/create`} className='flex flex-col justify-center items-center w-[16rem] h-[20rem] border border-slate-200 hover:border-blue-700 rounded-2xl'>
                    <Plus className='w-10 h-10'/>
                    <p className='text-lg'>Create New</p>
                </Link>
            </div>
        </div>
    )
}

export default Documents
