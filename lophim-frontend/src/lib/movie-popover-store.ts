import { Movie } from '@/types/directus-schema';

import { create } from 'zustand';

interface MoviePopoverState {
    isVisible: boolean;
    movie: Movie | null;
    position: { x: number; y: number };
    hovered: boolean;
    showPopover: (movie: Movie, position: { x: number; y: number }) => void;
    hidePopover: () => void;
    setHovered: (hovered: boolean) => void;
}

export const useMoviePopoverStore = create<MoviePopoverState>((set) => ({
    isVisible: false,
    movie: null,
    position: { x: 0, y: 0 },
    hovered: false,
    showPopover: (movie, position) =>
        set({
            isVisible: true,
            movie,
            position
        }),
    hidePopover: () =>
        set((state) => {
            if (!state.hovered) {
                return {
                    isVisible: false,
                    movie: null,
                    position: { x: 0, y: 0 }
                };
            }

            return {};
        }),
    setHovered: (hovered) => set({ hovered })
}));
