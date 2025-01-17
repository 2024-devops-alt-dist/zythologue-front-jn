import { useState, useEffect, useMemo } from 'react';
import { getBeers, deleteBeer } from '../api/beersApi';
import { filterBeers, sortBeers } from '../utils/beersUtils';

const ALL_BEERS_KEY = 'all_beers';

export const useBeers = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Input for search bar
    const [abvFilter, setAbvFilter] = useState<number | ''>(''); // ABV filter
    const [sortOption, setSortOption] = useState<string>('name'); // Sorting option
    const [isAscending, setIsAscending] = useState<boolean>(true); // Sorting order

    useEffect(() => {
        const fetchBeers = async () => {
            const data = await getBeers();
            setBeers(data);
            localStorage.setItem(ALL_BEERS_KEY, JSON.stringify(data)); // Cache beers in localStorage
        };

        fetchBeers();
    }, []);

    // Filter beers based on searchQuery and abvFilter (memoized)
    const filteredBeers = useMemo(() => {
        return filterBeers(beers, searchQuery, abvFilter);
    }, [beers, searchQuery, abvFilter]);

    // Sort beers based on sortOption and isAscending (memoized)
    const sortedBeers = useMemo(() => {
        return sortBeers(filteredBeers, sortOption, isAscending);
    }, [filteredBeers, sortOption, isAscending]);

    // Generate suggestions for autocomplete based on the search query
    const suggestions = useMemo(() => {
        if (!searchQuery) return [];
        return beers
            .filter((beer) =>
                beer.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((beer) => beer.name); // Return matching beer names
    }, [beers, searchQuery]);

    const handleDelete = async (id: string) => {
        await deleteBeer(id);
        setBeers((prev) => prev.filter((beer) => beer.id_beer !== id));
    };

    return {
        beers: sortedBeers, // Final sorted and filtered beers
        suggestions, // Suggested beer names for autocomplete
        searchQuery,
        abvFilter,
        sortOption,
        isAscending,
        setBeers,
        setSearchQuery,
        setAbvFilter,
        setSortOption,
        setIsAscending,
        handleDelete,
    };
};