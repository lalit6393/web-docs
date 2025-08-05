'use client'

import { logout } from '@/app/actions/logout'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationTransition } from '@/app/context/loading/loadingLink';

const Logout = ({ data }: { data: any }) => {

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigationTransition();

    const handleLogout = async () => {
        setLoading(true);
        const res = await logout();
        setLoading(false);
        if (res) {
            navigate('/');
        }
    }

    return (
        <div className={`sticky right-0 top-0 flex flex-col sm:p-2 gap-1 border-0 sm:border rounded-4xl transition-all ease-in-out bg-transparent sm:bg-slate-100 ${visible && 'rounded-2xl'}`}>
            <div className='flex justify-end sm:justify-start'>
                <div
                    className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 border border-slate-400 p-1 mx-2'
                    onClick={() => setVisible(!visible)}
                >
                    <div className='relative w-full h-full'>
                        <Image
                            src={'/profile.svg'}
                            fill={true}
                            objectFit='contain'
                            alt='u'
                        />
                    </div>
                </div>
                <div className='hidden sm:block'>
                    <p className='text-sm font-semibold'>{data && data.fullname}</p>
                    <p className='text-sm'>{data && data.email}</p>
                </div>
                <div className='hidden sm:flex items-center justify-center p-2'>
                    <button type='button' onClick={() => setVisible(!visible)}>
                        <ChevronDown className={`ease-linear transition-all cursor-pointer ${visible && 'rotate-180'}`} />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {
                    visible && (
                        <motion.div
                            key="box"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className='overflow-hidden box-border hidden sm:block'
                            transition={{ duration: 0.2, ease: 'linear' }}
                        >
                            <div className='py-2 px-4'>
                                <button
                                    className='flex w-full cursor-pointer px-2 py-1 rounded-xl hover:bg-slate-200 hover:text-red-800'
                                    onClick={handleLogout}
                                    type='button'
                                >
                                    {loading ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Logout
