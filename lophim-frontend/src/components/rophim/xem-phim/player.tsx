'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import logo from '@/app/(rophim)/assets/logo.svg';
import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { fetchEpisodeById } from '@/lib/directus/fetchers';
import { cn } from '@/lib/utils';
import { DirectusFile } from '@directus/sdk';

type Episode = NonNullable<Awaited<ReturnType<typeof fetchEpisodeById>>>;

export default function Player({ episode }: { episode: Episode }) {
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
                src={`https://www.youtube.com/embed/${episode.youtube_id}?lophimToken=${episode.token}&lophimThumbnail=${getDirectusAssetURL(episode.movie.backdrop as DirectusFile)}`}
                allowFullScreen
                allow='autoplay; encrypted-media; fullscreen'
            />

            <div id='body-load' className={cn(ready && 'hidden')}>
                <div className='bl-logo'>
                    <Image src={logo} alt='logo' />
                    <div className='text-h1 text-center'>
                        Xem Phim Miễn Phí Cực Nhanh, Chất Lượng Cao Và Cập Nhật Liên Tục
                    </div>
                </div>
            </div>
        </div>
    );
}
