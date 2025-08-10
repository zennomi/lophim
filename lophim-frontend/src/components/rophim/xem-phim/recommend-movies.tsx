import Link from 'next/link';

import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { fetchTopMovies } from '@/lib/directus/fetchers';
import { getMovieUrlFromSlug } from '@/lib/utils';
import { DirectusFile } from '@directus/sdk';

export default async function RecommendMovies() {
    const movies = await fetchTopMovies();

    return (
        <div className='cc-top'>
            {movies.movies.map(({ item: movie }, idx) => (
                <div className='item' key={idx}>
                    <div className='h-item'>
                        <div className='v-thumb-m'>
                            <Link className='v-thumbnail' href={getMovieUrlFromSlug(movie.slug)}>
                                <img alt={movie.title} src={getDirectusAssetURL(movie.poster as DirectusFile)} />
                            </Link>
                        </div>
                        <div className='info'>
                            <h4 className='item-title lim-2'>
                                <Link title={movie.title} href={getMovieUrlFromSlug(movie.slug)}>
                                    {movie.title}
                                </Link>
                            </h4>
                            <div className='alias-title lim-1 mb-2'>{movie.english_title}</div>
                            <div className='info-line'>
                                <div className='tag-small'>
                                    <strong>R18</strong>
                                </div>
                                <div className='tag-small'>2025</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
