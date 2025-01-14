import React, { useEffect, useState } from 'react';
import { getBeers, deleteBeer } from '../api/beersApi';
import BeerList from '../components/BeerList';
import Filters from '../components/Filters';
import Sorting from '../components/Sorting';
import { filterBeers, sortBeers } from '../utils/beersUtils';
import { useNavigate } from 'react-router-dom';

const BeersPage: React.FC = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [abvFilter, setAbvFilter] = useState<number | ''>('');
    const [sortOption, setSortOption] = useState<string>('name');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeers = async () => {
            const data = await getBeers();
            setBeers(data);
            setFilteredBeers(data);
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

    return (
        <div>
            <h1>Beers</h1>
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
            <BeerList beers={sortedBeers} onDelete={handleDelete} />
        </div>
    );
};

export default BeersPage;
