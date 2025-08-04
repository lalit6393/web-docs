import { cookies } from "next/headers"

export async function editDoc({
    documentId,
    content
}: {
    documentId : string,
    content: string | null
}) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    const body = {
        content,
        documentId
    }

    const response = await fetch(`http://localhost:3000/document/${documentId}`, {
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