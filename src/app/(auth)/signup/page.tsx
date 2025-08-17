'use client'
import Link from '@/modules/link/Link';
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
            <form onSubmit={handleSubmit} className='w-[24rem] flex flex-col p-8 border shadow-lg border-slate-200 rounded-4xl box-border gap-2'>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl font-semibold">Create your account</h1>
                    <p className="text-sm text-gray-400 text-center pt-2">
                        It only takes a minute to join — and you will be ready to create, edit,
                        and collaborate instantly.
                    </p>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor='name' className='text-sm font-semibold'>Full Name <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <User className="absolute text-slate-400 w-4 h-full left-3 top-0 bottom-0" />
                        <input
                            className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
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
                    <label htmlFor='email' className='text-sm font-semibold'>Email <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <Mail className="absolute text-slate-400 w-4 h-full left-3 top-0 bottom-0" />
                        <input
                            className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
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
                    <label htmlFor='password' className='text-sm font-semibold'>Password <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <Lock className="absolute text-slate-400 w-4 h-full left-3 top-0 bottom-0" />
                        <input
                            className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
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
                    <label htmlFor='confirmPassword' className='text-sm font-semibold'>Confirm Password <span className='text-red-700'>*</span></label>
                    <div className='relative'>
                        <Lock className="absolute text-slate-400 w-4 h-full left-3 top-0 bottom-0" />
                        <input
                            className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
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
                    <label htmlFor='dob' className='text-sm font-semibold'>Date of birth (Optional)</label>
                    <input
                        className='text-sm w-full text-slate-500 bg-slate-100 px-2 py-[6px] pl-9 border-2 border-transparent rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700'
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
                    <button className='py-2 px-4 bg-gray-700 text-sm text-slate-50 rounded-xl hover:bg-gray-900 cursor-pointer' type='submit'>{loading ? 'Signing in...' : 'Signup'}</button>
                    <p className='text-sm'>Already have an account? <Link href='/login' className='text-blue-700 underline'>Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Signup
