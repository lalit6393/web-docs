'use client'
import Link from "@/modules/link/Link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const username = String(formData.get('username') || '').trim();
        const password = String(formData.get('password') || '').trim();

        if (!username || !password) {
            setLoading(false);
            return setError('Please fill all required fields!');
        }

        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        setLoading(false);
        if (data.err) return setError(data.err);

        router.push('/documents');
    }

    return (
        <div className='flex h-screen items-center w-full justify-center'>
            <form onSubmit={handleSubmit} className='w-[26rem] flex flex-col px-4 py-8 border-2 border-slate-400 rounded-2xl box-border gap-2'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='username'>Username <span className='text-red-700'>*</span></label>
                    <input
                        className='text-base text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type='text'
                        name='username'
                        id='username'
                        placeholder='yourmail@email.com or username'
                        required
                        autoFocus
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='password'>Password <span className='text-red-700'>*</span></label>
                    <input
                        className='text-base text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type='password'
                        name='password'
                        id='password'
                        placeholder='password'
                        required
                    />
                </div>
                {
                    error && <p className='text-red-700 text-sm'>{error}</p>
                }
                <div>
                    <button className='py-2 px-4 bg-blue-700 text-slate-50 rounded-md hover:bg-blue-800 cursor-pointer' type='submit'>{loading ? 'Logging in...' : 'Login'}</button>
                </div>
                <p className='text-sm'>Create Account? <Link href='/signup' className='text-blue-700 underline'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login
