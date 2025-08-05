import { cookies } from "next/headers"

export async function editDoc({
    documentId,
    content
}: {
    documentId: string,
    content: string | null
}) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    const body = {
        content,
        documentId
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/document/${documentId}`, {
        method: 'PUT',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;

}