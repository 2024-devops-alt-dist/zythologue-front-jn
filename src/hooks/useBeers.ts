import { useState, useEffect } from 'react';
import { getBeers, deleteBeer } from '../api/beersApi';
import { filterBeers, sortBeers } from '../utils/beersUtils';

// const FAVORITES_KEY = 'favoriteBeers';
const ALL_BEERS_KEY = 'all_beers';

export const useBeers = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState<string>('name');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [abvFilter, setAbvFilter] = useState<number | ''>('');

    useEffect(() => {
        const fetchBeers = async () => {
            const data = await getBeers();
            setBeers(data);
            setFilteredBeers(data);
            localStorage.setItem(ALL_BEERS_KEY, JSON.stringify(data));
        };
        fetchBeers();
    }, []);

    useEffect(() => {
        const filtered = filterBeers(beers, searchQuery, abvFilter);
        setFilteredBeers(filtered);
    }, [searchQuery, abvFilter, beers]);

    const handleDelete = async (id: string) => {
        await deleteBeer(id);
        setBeers((prev) => prev.filter((beer) => beer.id_beer !== id));
    };

    const sortedBeers = sortBeers(filteredBeers, sortOption, isAscending);

    return {
        beers: sortedBeers,
        searchQuery,
        abvFilter,
        sortOption,
        isAscending,
        setSearchQuery,
        setAbvFilter,
        setSortOption,
        setIsAscending,
        handleDelete,
    };
};