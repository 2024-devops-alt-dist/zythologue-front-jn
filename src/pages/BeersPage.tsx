import React from 'react';
import { useBeers } from '../hooks/useBeers';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import BeerList from '../components/BeerList';
import Filters from '../components/Filters';
import Sorting from '../components/Sorting';

const BeersPage: React.FC = () => {
    const navigate = useNavigate();

    const {
        beers,
        suggestions,
        searchQuery,
        abvFilter,
        sortOption,
        isAscending,
        setSearchQuery,
        setAbvFilter,
        setSortOption,
        setIsAscending,
        handleDelete,
    } = useBeers();

    const { favorites, handleToggleFavorite } = useFavorites();

    return (
        <div className='main'>
            <h1>Beers</h1>
            <div className='filterAndSort'>
                <button onClick={() => navigate('/beers/create')}>
                    Add New Beer
                </button>
                <Filters
                    searchQuery={searchQuery}
                    abvFilter={abvFilter}
                    suggestions={suggestions}
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
                beers={beers}
                onDelete={handleDelete}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
};

export default BeersPage;