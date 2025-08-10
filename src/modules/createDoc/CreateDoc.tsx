'use client'
import TinyEditor from '@/modules/editor/TinyEditorWrapper';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import type { Editor as TinyMCEEditor } from 'tinymce';

const CreateDoc = ({ initialContent, edit, documentId }: { initialContent?: string | null, edit?: boolean, documentId?: string }) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef<TinyMCEEditor | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        setError(null);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = String(formData.get('title'));
        const description = String(formData.get('description'));
        let content, endpoint;
        if (editorRef.current) {
            content = String(editorRef.current.getContent());
        }

        // console.log(content);


        if (edit) {
            endpoint = 'editDocument'
        } else {
            endpoint = 'createDocument'
        }

        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                title,
                description,
                documentId
            }),
        });

        const data = await response.json();
        setLoading(false);
        if (data.err) return setError(data.err);
        router.push('/documents');

    }

    return (
        <div className='flex flex-col items-center w-full p-8'>
            <h1 className='flex w-full text-xl font-semibold'>{edit ? 'Edit Document' : 'New Document'}</h1>
            <form onSubmit={handleSubmit} className={`flex mt-4 w-full justify-center flex-col gap-2 ${edit ? '' : 'max-w-[794px]'}`}>
                {
                    !edit &&
                    <>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='title'>Title</label>
                            <input
                                className='text-base text-slate-500 max-w-[52rem] px-2 py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                                type='text'
                                name='title'
                                id='title'
                                placeholder='Title'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='description'>Description</label>
                            <input
                                className='text-base text-slate-500 px-2 max-w-[52rem] py-[6px] border-2 border-slate-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                                type='text'
                                name='description'
                                id='description'
                                placeholder='description'
                                required
                            />
                        </div>
                    </>
                }
                <TinyEditor editorRef={editorRef} initialContent={initialContent} />
                {
                    error && <p className='text-sm text-red-700'>{error}</p>
                }
                <div>
                    <button className='py-2 px-4 bg-blue-700 text-slate-50 rounded-md hover:bg-blue-800 cursor-pointer' type='submit'>{loading ? (edit ? 'Updating...' : 'Creating...') : (edit ? 'Save' : 'Create')}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDoc
