import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { documentId: string} }) {

    try {
        const { documentId } = params;
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "0");
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value || '';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/document/${documentId}?page=${page}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const res = await response.json();

        return Response.json(res);
    } catch (err) {
        return new Response('Internal Server Error', { status: 500 });
    }
}