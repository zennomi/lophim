import { DirectusFile } from '@directus/sdk';

import { DirectusFile as DirectusFileSchema } from '../../types/directus-schema';

export function getDirectusAssetURL(
    fileOrString: string | DirectusFile | null | undefined | DirectusFileSchema
): string {
    if (!fileOrString) return '';

    if (typeof fileOrString === 'string') {
        return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileOrString}`;
    }

    if (fileOrString.filename_disk) {
        return `${process.env.NEXT_PUBLIC_DIRECTUS_CDN_URL}/${fileOrString.filename_disk}`;
    }

    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileOrString.id}`;
}
