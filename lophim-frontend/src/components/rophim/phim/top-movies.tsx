import Link from 'next/link';

import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { fetchTopMovies } from '@/lib/directus/fetchers';
import { DirectusFile } from '@directus/sdk';

export default async function TopMovies({ topMovies }: { topMovies: Awaited<ReturnType<typeof fetchTopMovies>> }) {
    return (
        <div className='cc-top'>
            {topMovies.movies?.map(({ item: movie }, idx) => {
                const latestEpisode = movie.latest_episode;

                return (
                    <div className='item' key={idx}>
                        <div className='position'>{idx + 1}</div>
                        <div className='h-item'>
                            <div className='v-thumb-m'>
                                <Link className='v-thumbnail' href={`/phim/${movie.slug}`}>
                                    <img alt={movie.title} src={getDirectusAssetURL(movie.poster as DirectusFile)} />
                                </Link>
                            </div>
                            <div className='info'>
                                <h4 className='item-title lim-2'>
                                    <Link title={movie.title} href={`/phim/${movie.slug}`}>
                                        {movie.title}
                                    </Link>
                                </h4>
                                <div className='alias-title lim-1 mb-2'>{movie.english_title}</div>
                                <div className='info-line'>
                                    <div className='tag-small'>
                                        <strong>R18</strong>
                                    </div>
                                    {latestEpisode && <div className='tag-small'>{latestEpisode.title}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
