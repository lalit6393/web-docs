import { editDoc } from "./editDoc";


export async function POST(req: Request) {
    try {

        const data = await req.json();
        
        const response = await editDoc(
            {
                documentId: data.documentId,
                content: data.content
            });

        return Response.json(response)

    } catch (_error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}