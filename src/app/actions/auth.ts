'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type LoginFormState = {
    error?: string;
} | undefined;

export async function login(
    _state: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const username = String(formData.get('username')).trim();
    const password = String(formData.get('password')).trim();

    if (!username) {
        return {
            error: 'Email not found.'
        }
    } else if (!password) {
        return {
            error: 'Password not found.'
        }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    try {
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password }),
        });

        const data = await res.json();
        if (data.err) {
            return {
                error: data.err
            }
        }
        const cookieStore = await cookies();
        cookieStore.set("token", data.token, { maxAge: 24 * 60 * 60, httpOnly: true, path: '/' });
    } catch (_err) {
        return {
            error: 'Unknown error occured!'
        }
    }
    redirect('/documents');
}