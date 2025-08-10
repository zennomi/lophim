import Link from 'next/link';

import { fetchMovieBySlug } from '@/lib/directus/fetchers';
import { getEpisodeUrlFromSlug } from '@/lib/utils';

type Movie = NonNullable<Awaited<ReturnType<typeof fetchMovieBySlug>>>;

export default function EpisodesList({ movie }: { movie: Movie }) {
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
                                    alt='Xem Phim Superman Vietsub HD Online - Rophim'
                                    loading='lazy'
                                    src='https://static.nutscdn.com/vimg/300-0/0e190589111b3c28e1451cde7b82ca3e.jpg'
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
                                <div className='btn btn-sm btn-light'>Xem tập này</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
