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
                                    'tags'
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
