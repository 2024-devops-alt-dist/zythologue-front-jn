import React, { useEffect, useState } from 'react';
import { getBeers, deleteBeer } from '../api/beersApi';
import BeerList from '../components/BeerList';
import Filters from '../components/Filters';
import Sorting from '../components/Sorting';
import { filterBeers, sortBeers } from '../utils/beersUtils';
import { useNavigate } from 'react-router-dom';

const FAVORITES_KEY = 'favoriteBeers'; // Key for localStorage

const BeersPage: React.FC = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [abvFilter, setAbvFilter] = useState<number | ''>('');
    const [sortOption, setSortOption] = useState<string>('name');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<string[]>([]); // List of favorite beer IDs
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeers = async () => {
            const data = await getBeers();
            setBeers(data);
            setFilteredBeers(data);
            localStorage.setItem('all_beers', JSON.stringify(data)); // Save all beers locally
            // Load favorites from localStorage
            const savedFavorites = localStorage.getItem(FAVORITES_KEY);
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        };
        fetchBeers();
    }, []);

    useEffect(() => {
        const filtered = filterBeers(beers, searchQuery, abvFilter);
        setFilteredBeers(filtered);
    }, [searchQuery, abvFilter, beers]);

    // Handle toggling a beer as a favorite
    const handleToggleFavorite = (id: string) => {
        const isAlreadyFavorite = favorites.includes(id);

        let updatedFavorites;
        if (isAlreadyFavorite) {
            // Remove from favorites
            updatedFavorites = favorites.filter((favId) => favId !== id);
        } else {
            // Add to favorites
            updatedFavorites = [...favorites, id];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites)); // Save to localStorage
    };

    const handleDelete = async (id: string) => {
        await deleteBeer(id);
        setBeers((prev) => prev.filter((beer) => beer.id_beer !== id));
    };

    const sortedBeers = sortBeers(filteredBeers, sortOption, isAscending);

    return (
        <div>
            <h1>Beers</h1>
            <div style={styles.filterAndSort}>
                <button onClick={() => navigate('/beers/create')} style={{ marginBottom: '16px' }}>
                    Add New Beer
                </button>
                <Filters
                    searchQuery={searchQuery}
                    abvFilter={abvFilter}
                    onSearchChange={setSearchQuery}
                    onAbvChange={setAbvFilter}
                    onClear={() => {
                        setSearchQuery('');
                        setAbvFilter('');
                    }}
                />
                <Sorting
                    sortOption={sortOption}
                    isAscending={isAscending}
                    onSortChange={setSortOption}
                    onToggleOrder={() => setIsAscending((prev) => !prev)}
                />
            </div>
            <BeerList
                beers={sortedBeers}
                onDelete={handleDelete}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
};

const styles : { [key: string]: React.CSSProperties } = {
    filterAndSort: {
        display: 'flex',
        gap: '20px'
    },
};

export default BeersPage;
