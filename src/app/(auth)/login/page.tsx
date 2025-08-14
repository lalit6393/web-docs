'use client'
import Link from "@/modules/link/Link";
import { LockKeyhole, Mail } from "lucide-react";
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
            <form onSubmit={handleSubmit} className='w-[24rem] flex flex-col p-8 border shadow-lg border-slate-200 rounded-4xl box-border gap-2'>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl font-semibold">Sign in with email</h1>
                    <p className="text-sm text-gray-400 text-center">Log in to create, edit, and collaborate on documents with your team.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='username' className="text-sm font-semibold">Email <span className='text-red-700'>*</span></label>
                    <div className="flex w-full relative">
                        <Mail className="absolute text-slate-400 w-4 h-full left-3 top-0 bottom-0" />
                        <input
                            className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
                            type='text'
                            name='username'
                            id='username'
                            placeholder='yourmail@email.com'
                            required
                            autoFocus
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='password' className="text-sm font-semibold">Password <span className='text-red-700'>*</span></label>
                    <div className="flex w-full relative">
                        <LockKeyhole className="absolute text-slate-400 w-4 h-full left-3 top-0 bottom-0" />
                        <input
                            className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
                            type='password'
                            name='password'
                            id='password'
                            placeholder='password'
                            required
                        />
                    </div>
                </div>
                {
                    error && <p className='text-red-700 text-sm'>{error}</p>
                }
                <button className='py-2 px-4 mt-2 bg-gray-700 text-sm text-slate-50 rounded-xl hover:bg-gray-900 cursor-pointer' type='submit'>{loading ? 'Logging in...' : 'Get Started'}</button>
                <p className='text-sm'>Create Account? <Link href='/signup' className='text-blue-700 underline'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login
