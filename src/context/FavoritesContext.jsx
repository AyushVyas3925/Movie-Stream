import { useState, createContext, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) return JSON.parse(savedFavorites);
        return [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);
            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.id !== movie.id);
            } else {
                return [...prevFavorites, movie];
            }
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some((fav) => fav.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
