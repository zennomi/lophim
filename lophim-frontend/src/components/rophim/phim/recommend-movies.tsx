import Link from 'next/link';

import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { fetchTopMovies } from '@/lib/directus/fetchers';
import { getMovieUrlFromSlug } from '@/lib/utils';
import { DirectusFile } from '@directus/sdk';

export default function RecommendMovies({ topMovies }: { topMovies: Awaited<ReturnType<typeof fetchTopMovies>> }) {
    const movies = topMovies.movies?.map(({ item: movie }) => movie);

    return (
        <div className='cards-grid-wrapper de-suggest'>
            {movies.map((movie, idx) => {
                return (
                    <div key={idx} className='sw-item'>
                        <Link className='v-thumbnail' href={getMovieUrlFromSlug(movie.slug)}>
                            {movie.latest_episode && (
                                <div className='pin-new'>
                                    <div className='line-center line-tm'>
                                        <strong>{movie.latest_episode.title}</strong>
                                    </div>
                                </div>
                            )}
                            <div>
                                <img
                                    alt={movie.title}
                                    loading='lazy'
                                    src={getDirectusAssetURL(movie.poster as DirectusFile)}
                                />
                            </div>
                        </Link>
                        <div className='info'>
                            <h4 className='item-title lim-1'>
                                <Link title={movie.title} href={getMovieUrlFromSlug(movie.slug)}>
                                    {movie.title}
                                </Link>
                            </h4>
                            <h4 className='alias-title lim-1'>
                                <Link title={movie.english_title ?? ''} href={getMovieUrlFromSlug(movie.slug)}>
                                    {movie.english_title}
                                </Link>
                            </h4>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
