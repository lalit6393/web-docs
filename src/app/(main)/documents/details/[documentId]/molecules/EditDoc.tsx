'use client'
import { useSearchParams } from 'next/navigation';
import { MdCancel } from 'react-icons/md';
import React from 'react'
import Link from "@/modules/link/Link";
import CreateDoc from '@/modules/createDoc/CreateDoc';

const EditDoc = ({ initialContent, documentId }: { initialContent?: string | null, documentId?:string }) => {

    const searchParams = useSearchParams();
    const showEditor = searchParams.get('edit');

    if (!showEditor) return null;

    return (
        <div className='fixed inset-0 flex w-full h-full box-border backdrop-blur-md bg-white/30'>
            <Link href={'?'} className='absolute right-4 top-4 text-slate-700 z-10'><MdCancel className='w-9 h-9 cursor-pointer'/></Link>
            <CreateDoc initialContent={initialContent} edit={true} documentId={documentId}/>
        </div>
    )
}

export default EditDoc
