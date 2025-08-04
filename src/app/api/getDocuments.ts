import { cookies } from "next/headers";

export async function getDocuments() {
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/documents`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}