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
                beers={beers}
                onDelete={handleDelete}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    filterAndSort: {
        display: 'flex',
        gap: '20px',
    },
};

export default BeersPage;