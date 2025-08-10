import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getMovieUrlFromSlug(slug: string) {
    return `/phim/${slug}`;
}

export function getEpisodeUrlFromSlug({ slug, id }: { slug: string; id: number }) {
    return `/xem-phim/${slug}.${id}`;
}
