'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export default function Player() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'lophim-ready') {
                setReady(true);
            }
        });

        return () => {
            window.removeEventListener('message', () => {});
        };
    }, []);

    return (
        <div className='relative h-full w-full'>
            <iframe
                className={cn('h-full w-full', !ready && 'hidden')}
                src='https://www.youtube.com/embed/lTet7rASZZs?lophimToken=21LNJ9J1PYDNWXSHCSFF&lophimThumbnail=https://goatembed.com/images/denied-bg.webp'
                allowFullScreen
                allow='autoplay; encrypted-media; fullscreen'
            />

            <div id='body-load' className={cn(ready && 'hidden')}>
                <div className='bl-logo'>
                    <img src='https://www.rophim.me/images/logo.svg' alt='logo' />
                    <div className='text-h1 text-center'>
                        Xem Phim Miễn Phí Cực Nhanh, Chất Lượng Cao Và Cập Nhật Liên Tục
                    </div>
                </div>
            </div>
        </div>
    );
}
