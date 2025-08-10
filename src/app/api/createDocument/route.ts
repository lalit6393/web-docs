import { createDoc } from "./createDoc";

export async function POST(req: Request) {
    try {

        const data = await req.json();
        const response = await createDoc(
            {
                content: data.content,
                title: data.title,
                description: data.description
            });

        return Response.json(response)

    } catch (_error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}