import { fetchTopMovies } from '@/lib/directus/fetchers';
import { Movie } from '@/types/directus-schema';

import TopCollection from '../../../components/rophim/phimhay/top-collection';
import TopSlider from '../../../components/rophim/phimhay/top-slider';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default async function PhimHay() {
    const topMovies = await fetchTopMovies();

    return (
        <>
            <TopSlider movies={topMovies.movies.map((movie) => movie.item as Movie)} />
            <TopCollection />
        </>
    );
}
