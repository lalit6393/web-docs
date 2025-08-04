import { cookies } from "next/headers";

export async function getCurrentVersionDocument({ documentId }: { documentId: string }) {

    const cookieStore = await cookies();
    const token  = cookieStore.get('token')?.value || '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/document/${documentId}/version/latest`, {
        method:'GET',
        headers:{
            authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}