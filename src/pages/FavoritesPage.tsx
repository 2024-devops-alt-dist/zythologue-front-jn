import React, { useEffect, useState } from 'react';
import BeerList from '../components/BeerList';
const FAVORITES_KEY = 'favoriteBeers'; // Key to fetch favorites from localStorage

const FavoritesPage: React.FC = () => {
    const [favoriteBeers, setFavoriteBeers] = useState<any[]>([]);

    useEffect(() => {
        const fetchFavoriteBeers = () => {
            const allBeers = JSON.parse(localStorage.getItem('all_beers') || '[]'); // All beers stored locally
            const favoriteIds = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); // Favorite beer IDs

            // Filter the full list of beers by favorite IDs
            const filteredBeers = allBeers.filter((beer: any) => favoriteIds.includes(beer.id_beer));
            setFavoriteBeers(filteredBeers);
        };

        fetchFavoriteBeers();
    }, []);

    return (
        <div>
            <h1 style={styles.title}>My Favorite Beers</h1>
            {favoriteBeers.length > 0 ? (
                <BeerList
                    onDelete={()=> ''}
                    beers={favoriteBeers}
                    favorites={[]}
                    onToggleFavorite={() => {}}
                />
            ) : (
                <p style={styles.noFavorites}>No favorite beers yet. Start adding some!</p>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        margin: '16px 0',
    },
    noFavorites: {
        textAlign: 'center',
        color: '#666',
        marginTop: '20px',
        fontSize: '1.2rem',
    },
};

export default FavoritesPage;