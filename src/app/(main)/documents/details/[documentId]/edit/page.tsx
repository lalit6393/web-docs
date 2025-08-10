import { getCurrentVersionDocument } from '@/app/api/getCurrentVersionDocument';
import { getSpecificVersionOfDocument } from '@/app/api/getSpecificVersionOfDocument';
import CreateDoc from '@/modules/createDoc/CreateDoc';
import React from 'react'

const Edit = async ({ params, searchParams }: { params: Promise<{ documentId: string }>, searchParams: Promise<{ version?: string }> }) => {

    const { documentId } = await params;
    const { version } = await searchParams;
    const data = version ? await getSpecificVersionOfDocument({ documentId, version }) : await getCurrentVersionDocument({ documentId });


    return (
        <div>
            <CreateDoc initialContent={data.data.currentVersion.content} edit={true} documentId={documentId} />
        </div>
    )
}

export default Edit
