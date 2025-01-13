import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createBeer } from '../api/beersApi';
import { getBreweries } from '../api/breweriesApi';

const CreateBeerPage: React.FC = () => {
    const [formData, setFormData] = useState({
        id_brewery: '',
        name: '',
        description: '',
        abv: '',
        price: '',
    });

    const [breweries, setBreweries] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createBeer({
                id_brewery: formData.id_brewery,
                name: formData.name,
                description: formData.description,
                abv: parseFloat(formData.abv),
                price: parseFloat(formData.price),
            });
            navigate('/beers'); // Redirect to the beers list
        } catch (err) {
            console.error('Error creating beer:', err);
            setError('Failed to create beer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Create a New Beer</h1>
            {error && <p style={styles.error}>{error}</p>}
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
                    {loading ? 'Creating...' : 'Create Beer'}
                </button>
            </form>
        </div>
    );
};

const styles : { [key: string]: React.CSSProperties } = {
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
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px',
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
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default CreateBeerPage;
