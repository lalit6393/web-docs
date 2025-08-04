'use client'
import { Mail, UserRound, UsersRound } from 'lucide-react';
import Link from 'next/link'
import React, { useState, useEffect, FormEvent } from 'react'
import { MdEdit, MdOutlineHistory } from 'react-icons/md';

const Sidebar = ({ documentId, collaborators }: { documentId: string, collaborators?: any[] }) => {

    const [history, setHistory] = useState<boolean>(false);
    const [showCollaborators, setShowCollaborators] = useState<boolean>(false);
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [moreVersion, setMoreVersion] = useState(true);
    const [showTextWithIcon, setShowTextWithIcon] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [err, setErr] = useState<string | null>(null);

    const handleHistory = () => {
        setShowCollaborators(false);
        setHistory(pre => {
            setShowTextWithIcon(pre);
            return !pre
        });
        setData(null);
        setMoreVersion(true);
        if (!history) setPage(0);
    }

    const handleShowCollab = () => {
        setHistory(false);
        setShowCollaborators(pre => {
            setShowTextWithIcon(pre);
            return !pre
        });
    }

    const handleNewCollab = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formdata = new FormData(e.currentTarget);
        const email = String(formdata.get('email')).trim();
        const role = formdata.get('role');

        if (!email) setErr('Email is required.');

        const body = {
            email: email,
            documentId: documentId,
            role: role
        }

        const response = await fetch('/api/addorUpdateCollaborator', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        setLoading(false);
        if (result.err) return setErr(result.err);
        setOpen(false);
    }

    useEffect(() => {
        if (history) {
            const fetchHistory = async () => {
                setLoading(true);
                try {
                    const res = await fetch(`/api/getAllDocumentVersions/${documentId}?page=${page}`, {
                        method: 'GET'
                    });
                    const json = await res.json();
                    if (json.data.length === 0) setMoreVersion(false);

                    setData(prev => [...(prev || []), ...json.data]);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchHistory();
        }
    }, [history, page]);

    return (
        <>
            {open &&
                <div className='present flex justify-center items-center text-slate-700 backdrop-brightness-50 backdrop-filter'>
                    <div className='flex flex-col px-8 py-4 rounded-xl bg-slate-50 w-[90%] sm:w-100 gap-4'>
                        <p className='text-base'>Enter the email of &nbsp;
                            <span className='text-[#FFCC00]'>User</span>
                        </p>
                        <form onSubmit={handleNewCollab}>
                            <div className='flex flex-col w-full gap-2'>
                                <label htmlFor='email' className='text-sm'>Email <span className='text-red-700'>*</span></label>
                                <div className='relative'>
                                    <Mail className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                                    <input
                                        className='pl-10 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder='yourmail@email.com'
                                        required
                                    />

                                </div>
                                <label htmlFor='role' className='text-sm'>Role</label>
                                <div className='relative'>
                                    <UserRound className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                                    <select
                                        id="role"
                                        name="role"
                                        defaultValue={'viewer'}
                                        className="pl-10 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>

                                </div>
                                {
                                    err && <p className='text-red-700 text-sm'>{err}</p>
                                }
                                <div className='flex justify-between py-2'>
                                    <button onClick={() => setOpen(false)} className='text-blue-700 text-sm hover:text-blue-900 cursor-pointer'>Cancel</button>
                                    <button type='submit' className='text-green-700 hover:text-green-900 text-sm cursor-pointer'>{loading ? 'Adding...' : 'Confirm'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <div className='flex absolute left-0 bottom-0 top-0 bg-slate-300 w-fit lg:w-[13rem] overflow-hidden z-10 border-r border-slate-400'>
                <div className='flex flex-col p-2 flex-1 gap-2'>
                    <Link
                        href={`?edit=true`}
                        className='flex justify-center py-2 px-2 lg:px-4 w-full text-slate-50 lg:justify-start items-center bg-slate-500 hover:bg-slate-700 cursor-pointer rounded-lg'
                    >
                        <MdEdit className='w-6 h-6' />
                        {showTextWithIcon && <span className='hidden lg:block'>&nbsp; Edit</span>}
                    </Link>
                    <button
                        onClick={handleHistory}
                        type='button'
                        className=' flex justify-center py-2 px-2 lg:px-4 w-full text-slate-50 lg:justify-start items-center bg-slate-500 hover:bg-slate-700 cursor-pointer rounded-lg'
                    >
                        <MdOutlineHistory className='w-6 h-6' />{showTextWithIcon && <span className='hidden lg:block'>&nbsp; History</span>}
                    </button>
                    <button
                        onClick={handleShowCollab}
                        type='button'
                        className=' flex justify-center py-2 px-2 lg:px-4 w-full text-slate-50 lg:justify-start items-center bg-slate-500 hover:bg-slate-700 cursor-pointer rounded-lg'
                    >
                        <UsersRound className='w-5 h-5' />{showTextWithIcon && <span className='hidden lg:block'>&nbsp; Collaborators</span>}
                    </button>
                </div>
                {
                    history &&
                    <div className='flex flex-col p-2 w-[-webkit-fill-available] gap-2 bg-slate-50 overflow-y-auto'>
                        {data && data.map((item: any) =>
                            <div key={item._id}>
                                <Link
                                    href={`?version=${item._id}`}
                                    onClick={handleHistory}
                                >{item._id?.slice(0, 12)}</Link>
                            </div>
                        )}
                        <button disabled={!moreVersion} onClick={() => setPage(prev => prev + 1)} className={`${moreVersion ? 'text-blue-700 cursor-pointer' : 'text-slate-400'} `} type='button'>{loading ? 'Loading...' : 'More...'}</button>
                    </div>
                }
                {
                    showCollaborators &&
                    <div className='flex flex-col p-2 w-[-webkit-fill-available] gap-2 bg-slate-50 overflow-y-auto'>
                        {
                            collaborators?.map((item: any) => {
                                return (
                                    <p key={item?._id}>{item?.user?.fullname && item?.user?.fullname}</p>
                                )
                            })
                        }
                        <button onClick={() => setOpen(true)} className='text-sm text-blue-600 hover:text-blue-900 cursor-pointer' type='button'>Add New</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Sidebar
