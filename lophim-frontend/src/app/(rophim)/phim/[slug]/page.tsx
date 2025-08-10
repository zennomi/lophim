import Link from 'next/link';
import { notFound } from 'next/navigation';

import Actors from '@/components/rophim/actors';
import CommentArea from '@/components/rophim/comment-area';
import TopMovies from '@/components/rophim/phim/top-movies';
import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import { fetchMovieBySlug, fetchTopMovies } from '@/lib/directus/fetchers';
import { getEpisodeUrlFromSlug } from '@/lib/utils';

import ContentGap from '../../../../components/rophim/phim/content-gap';
import DetailMore from '../../../../components/rophim/phim/detail-more';
import { Heart, MessageCircle, Play, Share2 } from 'lucide-react';

export default async function PhimPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const movie = await fetchMovieBySlug(slug);
    const topMovies = await fetchTopMovies();
    if (!movie) {
        return notFound();
    }

    return (
        <>
            <div className='top-detail-wrap'>
                <div
                    className='background-fade'
                    style={{
                        backgroundImage: `url(${getDirectusAssetURL(movie.backdrop)})`
                    }}></div>
                <div className='cover-fade'>
                    <div
                        className='cover-image'
                        style={{
                            backgroundImage: `url(${getDirectusAssetURL(movie.horizontal_poster)})`
                        }}></div>
                </div>
            </div>
            <div id='wrapper' className='wrapper-w-slide'>
                <div className='detail-container'>
                    <div className='dc-side'>
                        <div className='ds-info'>
                            <div className='v-thumb-l mb-3'>
                                <div className='v-thumbnail'>
                                    <img
                                        alt={`Xem Phim ${movie.title} Vietsub HD Online - Lophim`}
                                        loading='lazy'
                                        src={getDirectusAssetURL(movie.poster)}
                                    />
                                </div>
                            </div>
                            <h2 className='heading-md media-name'>{movie.title}</h2>
                            <div className='alias-name'>{movie.english_title}</div>
                            <DetailMore movie={movie} />
                        </div>
                        {/* Top phim tuần này */}
                        <div className='child-box child-top'>
                            <div className='child-header'>
                                <div className='inc-icon'>
                                    {/* SVG from HTML, keep as is for now */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='25'
                                        viewBox='0 0 24 25'
                                        fill='none'>
                                        <g clipPath='url(#clip0_137_1522)'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M1.88063 16.9893C1.85433 14.5926 3.02764 11.8941 5.01236 10.0083C6.37475 8.71478 9.24978 6.77138 13.4408 7.83575L12.9199 8.87882C12.8072 9.09921 12.5893 9.25197 12.3376 9.28829L8.75391 9.81296C8.44337 9.84426 8.15161 9.98951 7.93247 10.2199C7.67577 10.4879 7.53929 10.8385 7.54805 11.2092C7.55682 11.5761 7.70708 11.9154 7.97004 12.1646L10.5758 14.6715C10.7536 14.838 10.835 15.0847 10.7937 15.3289L10.7499 15.5793C8.00009 14.1844 4.54279 15.2888 1.88063 16.9893ZM23.5748 12.1671C23.799 11.9555 23.9455 11.6675 23.988 11.3532C24.0356 10.9863 23.938 10.6244 23.7151 10.3351C23.4909 10.0459 23.1666 9.86054 22.8047 9.81421L19.2097 9.28829C18.958 9.25197 18.7401 9.09921 18.6299 8.88133L17.0221 5.66319L17.0208 5.66069C16.8869 5.39773 16.6777 5.19112 16.4198 5.06214C16.0867 4.88934 15.7085 4.85678 15.3517 4.96823C14.9935 5.07967 14.7018 5.32635 14.5277 5.66319L14.2986 6.12275C10.4356 5.00955 6.58762 5.92114 3.71885 8.64591C0.810006 11.4095 -0.591196 15.5255 0.233998 18.8876C0.310382 19.1982 0.539533 19.4473 0.841311 19.5513C0.941486 19.5863 1.04417 19.6026 1.14685 19.6026C1.35471 19.6026 1.56132 19.5325 1.72912 19.3998C3.68629 17.8521 7.69831 15.7096 10.3216 17.4977C10.3492 17.5165 10.3805 17.519 10.4093 17.5352L10.1776 18.8601C10.1275 19.1493 10.1776 19.4599 10.3216 19.7366C10.6797 20.4128 11.5225 20.672 12.2012 20.3189L15.4143 18.6547C15.6384 18.537 15.9101 18.5357 16.1343 18.6535L19.3562 20.3226C19.5703 20.4266 19.7919 20.4792 20.0098 20.4792C20.0812 20.4792 20.1513 20.4729 20.2202 20.4616C20.9778 20.3326 21.4949 19.6164 21.371 18.8601L20.7574 15.3289C20.7148 15.0835 20.795 14.838 20.9765 14.669L23.5748 12.1671Z'
                                                fill='currentColor'></path>
                                        </g>
                                    </svg>
                                </div>
                                <span>Top phim tuần này</span>
                            </div>
                            <div className='child-content'>
                                <TopMovies topMovies={topMovies} />
                            </div>
                        </div>
                        {/* Diễn viên */}
                        <Actors />
                    </div>
                    <div className='dc-main'>
                        <div className='dm-bar'>
                            <div className='elements'>
                                {movie.latest_episode && (
                                    <Link
                                        className='btn btn-xl btn-rounded button-play flex-shrink-0'
                                        href={getEpisodeUrlFromSlug(movie.latest_episode)}>
                                        <Play size={20} style={{ marginRight: 8 }} />
                                        <span>Xem Ngay</span>
                                    </Link>
                                )}
                                <div className='touch-group flex-grow-1'>
                                    <div className='is-left flex-grow-1'>
                                        <div className='item item-like'>
                                            <a className='item-v'>
                                                <div className='inc-icon icon-16'>
                                                    <Heart size={16} />
                                                </div>
                                                <span>Yêu thích</span>
                                            </a>
                                        </div>
                                        <div className='dropdown'>
                                            <div className='item item-playlist'>
                                                <a className='item-v'>
                                                    <div className='inc-icon icon-16'>
                                                        {/* Playlist SVG from HTML, keep as is for now */}
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='100'
                                                            height='100'
                                                            viewBox='0 0 100 100'
                                                            fill='none'>
                                                            <path
                                                                d='M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z'
                                                                fill='currentColor'></path>
                                                        </svg>
                                                    </div>
                                                    <span>Thêm vào</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className='item item-share'>
                                            <a className='item-v' title='Chia sẻ'>
                                                <div className='inc-icon icon-16'>
                                                    <Share2 size={16} />
                                                </div>
                                                <span>Chia sẻ</span>
                                            </a>
                                        </div>
                                        <div className='item item-comment'>
                                            <a className='item-v'>
                                                <div className='inc-icon icon-16'>
                                                    <MessageCircle size={16} />
                                                </div>
                                                <span>Bình luận</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='is-right'>
                                        <div className='v-rating'>
                                            <div className='ro-rating'>
                                                <div className='ro-icon'></div>
                                                <span className='point'>3.6</span>
                                                <span className='a-rate'>Đánh giá</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ContentGap movie={movie} topMovies={topMovies} />
                        <CommentArea />
                    </div>
                </div>
            </div>
        </>
    );
}
