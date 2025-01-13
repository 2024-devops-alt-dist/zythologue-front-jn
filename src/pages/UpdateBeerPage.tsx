import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBeerById, updateBeer } from '../api/beersApi';
import { getBreweries } from '../api/breweriesApi';

const UpdateBeerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_brewery: '',
        name: '',
        description: '',
        abv: '',
        price: '',
    });
    const [breweries, setBreweries] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBeer = async () => {
            try {
                const data = await getBeerById(id!); // Get the beer details
                setFormData({
                    id_brewery: data.id_brewery,
                    name: data.name,
                    description: data.description,
                    abv: data.abv.toString(),
                    price: data.price.toString(),
                });
            } catch (err) {
                console.error('Error fetching beer:', err);
                setError('Failed to load beer. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBeer();
    }, [id]);

    // Fetch breweries for the dropdown
    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const data = await getBreweries();
                setBreweries(data);
            } catch (err) {
                console.error('Error fetching breweries:', err);
                setError('Failed to load breweries. Please try again later.');
            }
        };

        fetchBreweries();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await updateBeer(id!, {
                id_brewery: formData.id_brewery,
                name: formData.name,
                description: formData.description,
                abv: parseFloat(formData.abv),
                price: parseFloat(formData.price),
            });
            navigate('/beers'); // Redirect to beers list
        } catch (err) {
            console.error('Error updating beer:', err);
            setError('Failed to update beer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading beer details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Update Beer</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="id_brewery">Select Brewery</label>
                    <select
                        id="id_brewery"
                        name="id_brewery"
                        value={formData.id_brewery}
                        onChange={handleInputChange}
                        required
                        style={styles.select}
                    >
                        <option value="" disabled>
                            -- Select a Brewery --
                        </option>
                        {breweries.map((brewery) => (
                            <option key={brewery.id_brewery} value={brewery.id_brewery}>
                                {brewery.name} ({brewery.country})
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="name">Beer Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="abv">ABV (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        id="abv"
                        name="abv"
                        value={formData.abv}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Beer'}
                </button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default UpdateBeerPage;
