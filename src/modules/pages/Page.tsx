'use client'
import React, { useEffect, useRef, useState } from 'react'

const Page = ({ output }: { output: string | null | undefined }) => {


    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const targetWidth = 794; // your designed PDF width

    useEffect(() => {
        const resize = () => {
            if (containerRef.current) {
                const availableWidth = containerRef.current.offsetWidth;
                const newScale = availableWidth / targetWidth;
                setScale(newScale > 1 ? 1 : newScale);
            }
        };

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);


    return (
        <div ref={containerRef} className='w-full lg:w-[794px]'>
            {
                output ? (
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                        }}
                        className='text-slate-700 pdf-page'
                        dangerouslySetInnerHTML={{ __html: output }}
                    />
                ) : (<div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                    className='text-slate-700 pdf-page'
                ><p>No Content Found!</p>
                </div>)
            }
        </div>
    )
}

export default Page
