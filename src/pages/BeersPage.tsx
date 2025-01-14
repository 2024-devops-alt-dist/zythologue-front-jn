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

    // Sort beers based on the selected option
    const sortedBeers = [...filteredBeers].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'abv') {
            return a.abv - b.abv;
        } else if (sortOption === 'price') {
            return a.price - b.price; // Numerical sorting for ABV
        }
        return 0;
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

