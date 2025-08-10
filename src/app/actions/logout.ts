'use server'
import { cookies } from "next/headers";

export async function logout() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('token');
        return true;
    } catch (_err) {
        return false;
    }
}