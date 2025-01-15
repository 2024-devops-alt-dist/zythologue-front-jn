import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favoriteBeers';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        // Load favorites from localStorage on mount
        const savedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const handleToggleFavorite = (id: string) => {
        const isAlreadyFavorite = favorites.includes(id);

        let updatedFavorites;
        if (isAlreadyFavorite) {
            updatedFavorites = favorites.filter((favId) => favId !== id);
        } else {
            updatedFavorites = [...favorites, id];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites)); // Save to localStorage
    };

    return {
        favorites,
        handleToggleFavorite,
    };
};