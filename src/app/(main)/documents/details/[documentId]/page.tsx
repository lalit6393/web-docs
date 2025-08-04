import { getCurrentVersionDocument } from '@/app/api/getCurrentVersionDocument';
import Page from '@/modules/pages/Page';
import React from 'react'
import EditDoc from './molecules/EditDoc';
import Sidebar from '@/modules/sidebar/Sidebar';
import { getSpecificVersionOfDocument } from '@/app/api/getSpecificVersionOfDocument';
import Profile from '@/modules/profile/Profile';

const MyDoc = async ({
    params,
    searchParams
}: {
    params: Promise<{ documentId: string }>,
    searchParams: Promise<{ version?: string }>
}) => {

    const { documentId } = await params;
    const { version } = await searchParams;
    const data = version ? await getSpecificVersionOfDocument({ documentId, version }) : await getCurrentVersionDocument({ documentId });

    if (data.err) return <p>ERROR {data.err}</p>
    

    return (
        <div className='flex flex-col w-full h-screen bg-slate-200 box-border'>
            <div className='px-8 py-4 pb-4 border-b-2 border-b-slate-300 box-border'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>{data.data?.title ? data.data?.title : 'My Document'}</h1>
                    <Profile/>
                </div>
                <p>{data.data.description && data.data.description}</p>
            </div>
            <div className='relative flex flex-1 justify-center overflow-y-scroll overflow-x-hidden'>
                {/* ...................sidebar.................... */}
                <Sidebar documentId={documentId} collaborators={data.data?.collaborators}/>
                {/* -----------main content------------ */}
                <div className='relative w-full pl-[4rem] pr-2 lg:pl-[12rem] flex justify-center'>
                    {
                        version ?
                            <>
                                {version !== data.data.currentVersion && <button className='absolute z-10 right-[2rem] bottom-[4rem] cursor-pointer'>Restore</button>}
                                <Page output={data.data.specificVersion.content} />
                            </>
                            :
                            <>
                                <Page output={data.data.currentVersion.content} />
                            </>
                    }
                </div>
            </div>
            <EditDoc initialContent={data.data.currentVersion.content} documentId={documentId} />
        </div>
    )
}

export default MyDoc
