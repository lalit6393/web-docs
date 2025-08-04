'use client'
import { Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const Signup = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<{ name: string, message: string } | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: ''
        }

        const keys = ["name", "email", "password", "confirmPassword", "dob"] as const;

        for (const key of keys) {
            const val = String(formData.get(key)).trim();
            if (key !== 'dob' && !val) {
                setErr({ name: key, message: 'This field is required to fill.' });
                setLoading(false);
                return;
            }
            data[key] = val;
        }

        if (data.password !== data.confirmPassword) {
            setErr({ name: 'confirmPassword', message: 'Password missmatch.' });
            setLoading(false);
            return;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

        const isValidPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(data.password);

        if (!isValidEmail) {
            setErr({ name: 'email', message: 'Email does not look valid' });
            setLoading(false);
            return
        }

        if (!isValidPass) {
            setErr({ name: 'password', message: 'Password should contain capital & small letters, number, special character.' });
            setLoading(false);
            return;
        }

        const body = {
            email: data.email,
            password: data.password,
            fullname: data.name,
            dob: data.dob
        };

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await res.json();

        setLoading(false);
        if (result.err) return setErr({ name: 'final', message: result.err });

        router.push('/documents');
    }

    return (
        <div className='flex w-full h-full justify-center items-center p-4'>
            <form onSubmit={handleSubmit} className='w-full sm:w-[26rem] flex flex-col px-4 py-8 border-2 border-slate-400 rounded-xl box-border gap-2'>
                <div className='pb-4'>
                    <h1 className='text-3xl font-bold tracking-tight'>Sign Up</h1>
                    <p className='text-sm'>Create your account to get started.</p>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor='name' className='text-sm'>Full Name <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <User className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                        <input
                            className='w-full text-base pl-10 text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='text'
                            name='name'
                            id='name'
                            placeholder='John Doe'
                            required
                            autoFocus
                        />
                    </div>
                    {
                        err?.name === 'name' && <p className='text-red-700 text-sm'>{err.message}</p>
                    }
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor='email' className='text-sm'>Email <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <Mail className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                        <input
                            className='pl-10 w-full text-base text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='email'
                            name='email'
                            id='email'
                            placeholder='yourmail@email.com'
                            required
                        />
                        {
                            err?.name === 'email' && <p className='text-red-700 text-sm'>{err.message}</p>
                        }
                    </div>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor='password' className='text-sm'>Password <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <Lock className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                        <input
                            className='pl-10 w-full text-base text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='password'
                            name='password'
                            id='password'
                            placeholder='password'
                            required
                        />
                    </div>
                    {
                        err?.name === 'password' && <p className='text-red-700 text-sm'>{err.message}</p>
                    }
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor='confirmPassword' className='text-sm'>Confirm Password <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <Lock className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 " />
                        <input
                            className='pl-10 w-full text-base text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder='confirm password'
                            required
                        />
                        {
                            err?.name === 'confirmPassword' && <p className='text-red-700 text-sm'>{err.message}</p>
                        }
                    </div>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor='dob' className='text-sm'>Date of birth (Optional)</label>
                    <input
                        className='text-base text-slate-500 px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type='date'
                        name='dob'
                        id='dob'
                        placeholder='date of birth'
                    />
                </div>
                <div className='flex flex-col pt-4 gap-1'>
                    {
                        err?.name === 'final' && <p className='text-red-700 text-sm'>{err.message}</p>
                    }
                    <button className='w-full py-2 px-4 bg-blue-700 text-slate-50 rounded-md hover:bg-blue-800 cursor-pointer' type='submit'>{loading ? 'Signing in...' : 'Signup'}</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
