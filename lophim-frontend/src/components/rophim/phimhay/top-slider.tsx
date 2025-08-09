'use client';

import React from 'react';

import Link from 'next/link';

import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { Movie } from '@/types/directus-schema';

import { Heart, Info, Play } from 'lucide-react';
import { Autoplay, EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TopSlider = ({ movies }: { movies: Movie[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

    return (
        <div id='top_slide' className='relative'>
            <div className='slide-wrapper top-slide-wrap'>
                {/* Main Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
                    effect='fade'
                    fadeEffect={{
                        crossFade: true
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    loop={true}
                    className='top-slide-main'>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className='slide-elements relative h-[600px] overflow-hidden'>
                                <Link href={`/phim/${movie.slug}`} className='slide-url absolute inset-0 z-10' />

                                {/* Background Image */}
                                <div
                                    className='background-fade absolute inset-0 bg-cover bg-center'
                                    style={{ backgroundImage: `url(${movie.horizontal_poster})` }}
                                />

                                {/* Cover Image */}
                                <div className='cover-fade absolute inset-0'>
                                    <div className='cover-image h-full'>
                                        <img
                                            className='fade-in visible h-full w-full object-cover'
                                            title={movie.title}
                                            loading='lazy'
                                            src={getDirectusAssetURL(movie.poster)}
                                            alt={movie.title}
                                        />
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className='safe-area'>
                                    <div className='slide-content'>
                                        <div className='media-item'>
                                            {/* Title Image */}
                                            <div className='media-title-image mb-4'>
                                                <Link href={`/phim/${movie.slug}`}>
                                                    <img
                                                        alt={movie.title}
                                                        src={getDirectusAssetURL(movie.title_image)}
                                                        className='max-h-20 object-contain'
                                                    />
                                                </Link>
                                            </div>
                                            {/* Title */}
                                            <h2 className='media-title hidden'>
                                                <Link href={`/phim/${movie.slug}`} className=''>
                                                    {movie.title}
                                                </Link>
                                            </h2>
                                            {/* Alias Title */}
                                            <h3 className='media-alias-title'>
                                                <Link href={`/phim/${movie.slug}`} className=''>
                                                    {movie.title}
                                                </Link>
                                            </h3>

                                            {/* Tags */}
                                            {/* <div className='hl-tags'>
                                                <div className='tag-imdb'>
                                                    <span>{movie.imdb}</span>
                                                </div>
                                                {movie.quality && (
                                                    <div className='tag-quality'>
                                                        <span>{movie.quality}</span>
                                                    </div>
                                                )}
                                                <div className='tag-model'>
                                                    <span>{movie.rating}</span>
                                                </div>
                                                <div className='tag-classic'>
                                                    <span>{movie.year}</span>
                                                </div>
                                                <div className='tag-classic'>
                                                    <span>{movie.duration}</span>
                                                </div>
                                            </div> */}

                                            {/* Genre Tags */}
                                            <div className='hl-tags mb-4 flex flex-wrap gap-2'>
                                                {movie.tags?.map((genre, index) => (
                                                    <div key={index} className='tag-topic capitalize'>
                                                        {genre}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Description */}
                                            <div className='description lim-3 mb-6 line-clamp-3 text-gray-300'>
                                                {movie.overview}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className='touch'>
                                                <Link href={`/xem-phim/${movie.slug}`} className='button-play'>
                                                    <Play className='h-6 w-6' fill='currentColor' />
                                                </Link>

                                                <div className='touch-group'>
                                                    <a className='item'>
                                                        <div className='inc-icon icon-20'>
                                                            <Heart className='h-5 w-5' />
                                                        </div>
                                                    </a>
                                                    <Link href={`/phim/${movie.slug}`} className='item'>
                                                        <div className='inc-icon icon-20'>
                                                            <Info className='h-5 w-5' />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Slider */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Navigation, Pagination, Thumbs]}
                    spaceBetween={5}
                    slidesPerView={6}
                    watchSlidesProgress={true}
                    className='top-slide-small mt-4'>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <img
                                alt={movie.title}
                                loading='lazy'
                                src={getDirectusAssetURL(movie.poster)}
                                className='h-16 w-full cursor-pointer rounded object-cover opacity-60 transition-opacity hover:opacity-100'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopSlider;
