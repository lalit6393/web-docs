import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
type Props = {
  editorRef: React.RefObject<TinyMCEEditor | null>;
  initialContent?: string | null
};

export default function TinyEditor({ editorRef, initialContent }: Props) {

  return (
    <div className='w-full'>
      <Editor
        apiKey='fk30zx25r68pd25k4f5qmed834q9h1obd61l65u1xkc9v0er'
        // disabled={true}
        // readonly={true}
        onInit={(_evt, editor) => editorRef.current = editor}
        init={{
          // height: '100vh',
          width: '100%',
          resize: false,
          // menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help'
          // tinycomments_mode: 'embedded',
          // tinycomments_author: 'Author name',
          // mergetags_list: [
          //   { value: 'First.Name', title: 'First Name' },
          //   { value: 'Email', title: 'Email' },
          // ],
          // ai_request: (request: any, respondWith: { string: (arg0: () => Promise<never>) => any; }) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        }}
        initialValue={initialContent || "Welcome to TinyMCE!"}
      />
    </div>
  );
}