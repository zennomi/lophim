'use client';

import { useState } from 'react';

import EpisodesList from '@/components/rophim/episodes-list';
import { fetchMovieBySlug, fetchTopMovies } from '@/lib/directus/fetchers';
import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import RecommendMovies from './recommend-movies';

type Movie = NonNullable<Awaited<ReturnType<typeof fetchMovieBySlug>>>;

export default function ContentGap({
    movie,
    topMovies
}: {
    movie: Movie;
    topMovies: Awaited<ReturnType<typeof fetchTopMovies>>;
}) {
    const [activeTab, setActiveTab] = useState<'episodes' | 'suggestion'>('episodes');

    return (
        <div className='content-gap'>
            <div className='cg-body'>
                <TabsPrimitive.Root value={activeTab} onValueChange={setActiveTab as any} className='cg-tabs'>
                    <TabsPrimitive.List className='v-tabs nav nav-tabs mb-0 flex' role='tablist'>
                        <TabsPrimitive.Trigger
                            value='episodes'
                            className={cn('nav-link', activeTab === 'episodes' && 'active')}
                            role='tab'
                            aria-selected={activeTab === 'episodes'}
                            tabIndex={0}>
                            Tập phim
                        </TabsPrimitive.Trigger>
                        <TabsPrimitive.Trigger
                            value='suggestion'
                            className={cn('nav-link', activeTab === 'suggestion' && 'active')}
                            role='tab'
                            aria-selected={activeTab === 'suggestion'}
                            tabIndex={0}>
                            Đề xuất
                        </TabsPrimitive.Trigger>
                    </TabsPrimitive.List>
                    <TabsPrimitive.Content value='episodes' className='tab-content fade tab-pane active show'>
                        <EpisodesList movie={movie} />
                    </TabsPrimitive.Content>
                    <TabsPrimitive.Content value='suggestion' className='tab-content fade tab-pane active show'>
                        <div className='cg-body-box is-suggest'>
                            <div className='box-header'>
                                <div className='heading-md mb-0'>Có thể bạn sẽ thích</div>
                            </div>
                            <div className='box-body'>
                                <RecommendMovies topMovies={topMovies} />
                            </div>
                        </div>
                    </TabsPrimitive.Content>
                </TabsPrimitive.Root>
            </div>
        </div>
    );
}
