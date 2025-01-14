import React, { useEffect, useState } from 'react';
import { getBeers, deleteBeer } from '../api/beersApi';
import BeerList from '../components/BeerList';
import {useNavigate} from "react-router-dom";

const BeersPage: React.FC = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [abvFilter, setAbvFilter] = useState<number | ''>('');
    const [sortOption, setSortOption] = useState<string>('name');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                const data = await getBeers();
                setBeers(data);
                setFilteredBeers(data);
            } catch (error) {
                console.error('Error fetching beers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBeers();
    }, []);
    useEffect(() => {
        let updatedBeers = beers;
        if (searchQuery) {
            updatedBeers = updatedBeers.filter((beer) =>
                beer.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (abvFilter !== '') {
            updatedBeers = updatedBeers.filter((beer) => beer.abv >= abvFilter);
        }

        setFilteredBeers(updatedBeers);
    }, [searchQuery, abvFilter, beers]);

    if (loading) {
        return <p>Loading beers...</p>;
    }
    const handleDelete = async (id: string) => {
        try {
            await deleteBeer(id);
            setBeers((prev) => prev.filter((beer) => beer.id_beer !== id)); // Update the state
        } catch (err) {
            console.error('Error deleting beer:', err);
            // setError('Failed to delete beer. Please try again.');
        }
    };
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };
    const toggleSortOrder = () => {
        setIsAscending((prev) => !prev);
    };
    const sortedBeers = [...filteredBeers].sort((a, b) => {
        let comparison = 0;
        if (sortOption === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortOption === 'abv') {
            comparison = a.abv - b.abv;
        } else if (sortOption === 'price') {
            comparison = a.price - b.price; // Numerical sorting for ABV
        }
        return isAscending ? comparison : -comparison;
    });

    return (
        <div>
            <h1>Beers</h1>
            <button style={styles.button} onClick={() => navigate('/beers/create')}>
                Add New Beer
            </button>
            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Min ABV (%)"
                    value={abvFilter}
                    onChange={(e) => setAbvFilter(e.target.value ? parseFloat(e.target.value) : '')}
                    style={styles.input}
                />
            </div>
            <button style={styles.clearButton} onClick={() => {
                setSearchQuery('');
                setAbvFilter('');
            }}>
                Clear Filters
            </button>
            {/* Sort Dropdown */}
            <div className="mt-4">
                <label htmlFor="sort" className="mr-2">Sort by:</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border p-2 rounded"
                >
                    <option value="name">Name</option>
                    <option value="abv">abv</option>
                    <option value="price">price</option>
                </select>
            </div>
            <button
                onClick={toggleSortOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {isAscending ? 'Ascending' : 'Descending'}
            </button>
            <BeerList beers={sortedBeers} onDelete={handleDelete}/>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        margin: '16px 0',
    },
    button: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        marginBottom: '16px',
        cursor: 'pointer',
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '16px',
    },
    input: {
        padding: '8px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    clearButton: {
        padding: '8px 12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default BeersPage;

