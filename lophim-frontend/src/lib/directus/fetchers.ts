import { useDirectus } from './directus';

export const fetchTopMovies = async () => {
    const { directus, readSingleton } = useDirectus();

    const topMovies = await directus.request(
        readSingleton('top_movies', {
            fields: [
                'id',
                {
                    movies: [
                        'id',
                        'item',
                        {
                            item: {
                                movie: [
                                    'id',
                                    'title',
                                    'english_title',
                                    'original_title',
                                    'slug',
                                    {
                                        poster: ['id', 'filename_disk']
                                    },
                                    {
                                        horizontal_poster: ['id', 'filename_disk']
                                    },
                                    {
                                        backdrop: ['id', 'filename_disk']
                                    },
                                    {
                                        title_image: ['id', 'filename_disk']
                                    },
                                    'overview',
                                    'tags',
                                    {
                                        latest_episode: ['id', 'title', 'slug']
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        })
    );

    return topMovies;
};

export const fetchNewMovies = async () => {
    const { directus, readItems } = useDirectus();

    const newMovies = await directus.request(
        readItems('movie', {
            fields: [
                'id',
                'title',
                'slug',
                {
                    poster: ['id', 'filename_disk']
                },
                {
                    horizontal_poster: ['id', 'filename_disk']
                },
                {
                    backdrop: ['id', 'filename_disk']
                },
                {
                    title_image: ['id', 'filename_disk']
                },
                'overview',
                'tags',
                {
                    latest_episode: ['id', 'title', 'slug']
                }
            ],
            limit: 10,
            sort: 'date_created',
            filter: {
                status: {
                    _eq: 'published'
                }
            }
        })
    );

    return newMovies;
};

export const fetchMovieBySlug = async (slug: string) => {
    const { directus, readItems } = useDirectus();

    const movie = await directus.request(
        readItems('movie', {
            fields: [
                'id',
                'title',
                'english_title',
                'slug',
                'overview',
                'tags',
                {
                    poster: ['id', 'filename_disk'],
                    horizontal_poster: ['id', 'filename_disk'],
                    backdrop: ['id', 'filename_disk'],
                    title_image: ['id', 'filename_disk'],
                    latest_episode: ['id', 'title', 'slug']
                }
            ],
            filter: { slug: { _eq: slug } }
        })
    );

    if (movie.length === 0) {
        return null;
    }

    const movieData = movie[0];

    const episodes = await directus.request(
        readItems('episode', {
            fields: ['id', 'title', 'slug'],
            filter: { movie: { _eq: movieData.id } }
        })
    );

    return { ...movieData, episodes };
};
