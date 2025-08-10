import Link from 'next/link';

import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { fetchMovieBySlug } from '@/lib/directus/fetchers';
import { getEpisodeUrlFromSlug } from '@/lib/utils';
import { DirectusFile } from '@directus/sdk';

type Movie = NonNullable<Awaited<ReturnType<typeof fetchMovieBySlug>>>;

export default function EpisodesList({ movie, currentEpisodeId }: { movie: Movie; currentEpisodeId?: number }) {
    return (
        <div className='cg-body-box is-eps'>
            <div className='box-header'>
                <div className='heading-md mb-0'>Các tập phim</div>
            </div>
            <div className='box-body'>
                <div className='de-type'>
                    {movie.episodes.map((episode) => (
                        <Link key={episode.id} className='item pd' href={getEpisodeUrlFromSlug(episode)}>
                            <div className='m-thumbnail'>
                                <img
                                    alt={movie.title}
                                    loading='lazy'
                                    src={getDirectusAssetURL(movie.poster as DirectusFile)}
                                />
                            </div>
                            <div className='info'>
                                <div className='ver line-center'>
                                    <div className='inc-icon icon-20'>
                                        <img src='https://www.rophim.me/images/icons/pd.svg' alt='' />
                                    </div>
                                    <span>Phụ đề</span>
                                </div>
                                <div className='media-title lim-2 mb-0'>{episode.title}</div>
                                {currentEpisodeId === episode.id ? (
                                    <div className='btn btn-sm btn-light'>Đang xem</div>
                                ) : (
                                    <div className='btn btn-sm btn-light'>Xem tập này</div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
