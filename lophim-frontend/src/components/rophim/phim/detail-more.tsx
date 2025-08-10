'use client';

import { useState } from 'react';

import { fetchMovieBySlug } from '@/lib/directus/fetchers';
import { cn } from '@/lib/utils';

import { ChevronDown, ChevronUp } from 'lucide-react';

type Movie = NonNullable<Awaited<ReturnType<typeof fetchMovieBySlug>>>;

export default function DetailMore({ movie }: { movie: Movie }) {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div
                id='toggle-detail'
                className='btn btn-block btn-basic primary-text mb-2'
                onClick={() => setShowDetail((v) => !v)}
                style={{ cursor: 'pointer' }}>
                <span>Thông tin phim</span>
                {showDetail ? (
                    <ChevronUp className='ms-2 inline' size={18} />
                ) : (
                    <ChevronDown className='ms-2 inline' size={18} />
                )}
            </div>
            <div className={cn('detail-more', showDetail && 'show')}>
                {' '}
                {/* show/hide by state */}
                <div className='hl-tags'>
                    <div className='tag-imdb'>
                        <span>3.6</span>
                    </div>
                    <div className='tag-model'>
                        <span className='last'>
                            <strong>R18</strong>
                        </span>
                    </div>
                    <div className='tag-classic'>
                        <span>2025</span>
                    </div>
                    <div className='tag-classic'>
                        <span>2h 10m</span>
                    </div>
                </div>
                <div className='hl-tags'>
                    {movie?.tags?.map((tag, idx) => (
                        <a className='tag-topic capitalize' key={idx}>
                            {tag}
                        </a>
                    ))}
                </div>
                <div className='detail-line'>
                    <div className='de-title d-block mb-2'>Giới thiệu:</div>
                    <div className='description'>{movie?.overview}</div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Thời lượng:</div>
                    <div className='de-value'>2h 10m</div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Quốc gia:</div>
                    <div className='de-value'>
                        <span>Nhật Bản</span>
                    </div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Đạo diễn:</div>
                    <div className='de-value'>
                        <span>Micheal Bay</span>
                    </div>
                </div>
            </div>
        </>
    );
}
