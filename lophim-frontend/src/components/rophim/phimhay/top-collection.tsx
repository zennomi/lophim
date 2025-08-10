'use client';

import Link from 'next/link';

import { useMovieHover } from '@/hooks/use-movie-hover';
import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { getMovieUrlFromSlug } from '@/lib/utils';
import { Episode, Movie } from '@/types/directus-schema';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TopCollection({ movies }: { movies: Movie[] }) {
    const { handleMouseEnter, handleMouseLeave } = useMovieHover();

    return (
        <div className='cards-row cards-slide wide overflow-hidden'>
            <div className='row-header'>
                <h2 className='category-name'>Top 10 phim bộ hôm nay</h2>
            </div>
            <div className='row-content'>
                <div className='cards-slide-wrapper top-up'>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.sw-next',
                            prevEl: '.sw-prev'
                        }}
                        slidesPerView={5}
                        spaceBetween={16}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 8
                            },
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 12
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 14
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 16
                            }
                        }}
                        className='swiper'>
                        {movies.map((movie, index) => {
                            const episode =
                                typeof movie.latest_episode === 'object' ? (movie.latest_episode as Episode) : null;

                            return (
                                <SwiperSlide key={index} className='swiper-slide'>
                                    <div
                                        className='sw-item'
                                        onMouseEnter={(e) => handleMouseEnter(e, movie)}
                                        onMouseLeave={handleMouseLeave}>
                                        <Link className='v-thumbnail' href={getMovieUrlFromSlug(movie.slug)}>
                                            <div className='mask'></div>
                                            <div className='pin-new m-pin-new'>
                                                {episode && (
                                                    <div className='line-center line-pd'>
                                                        <span></span>
                                                        <strong>{episode.title}</strong>
                                                    </div>
                                                )}
                                                {/*
                                                {movie.pinTm && (
                                                    <div className='line-center line-tm'>
                                                        <span></span>
                                                        <strong>{movie.pinTm}</strong>
                                                    </div>
                                                )}
                                                {movie.pinLt && (
                                                    <div className='line-center line-lt'>
                                                        <span></span>
                                                        <strong>{movie.pinLt}</strong>
                                                    </div>
                                                )} */}
                                            </div>

                                            <div>
                                                <img
                                                    alt={`Xem Phim ${movie.title} Vietsub HD Online - Rophim`}
                                                    loading='lazy'
                                                    src={getDirectusAssetURL(movie.poster)}
                                                />
                                            </div>
                                        </Link>
                                        <div className='info info-v w-chart'>
                                            <div className='number'>{index + 1}</div>
                                            <h4 className='item-title lim-1'>
                                                <Link title={movie.title} href={getMovieUrlFromSlug(movie.slug)}>
                                                    {movie.title}
                                                </Link>
                                            </h4>
                                            <div className='alias-title lim-1'>{movie.english_title}</div>
                                            <div className='info-line'>
                                                {/* <div className='tag-small'>
                                                    <strong>{movie.rating}</strong>
                                                </div> */}
                                                {/* <div className='tag-small'>{movie.part}</div> */}
                                                <div className='tag-small'>{episode?.title || ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
