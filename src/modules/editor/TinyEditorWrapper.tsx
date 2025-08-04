'use client'
import dynamic from 'next/dynamic';

const TinyEditor = dynamic(() => import('./TinyEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default TinyEditor;
