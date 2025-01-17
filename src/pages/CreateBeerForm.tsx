import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createBeer } from '../api/beersApi';
import { getBreweries } from '../api/breweriesApi';

interface CreateBeerPageProps {
    onCreate: (newBeer: any) => void;
    onClose: () => void; // Accept the close function from the parent
}

const CreateBeerForm: React.FC<CreateBeerPageProps> = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        id_brewery: '',
        name: '',
        description: '',
        abv: '',
        price: '',
    });

    const [breweries, setBreweries] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
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
            }
        };

        fetchBreweries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newBeer = await createBeer({
                id_brewery: formData.id_brewery,
                name: formData.name,
                description: formData.description,
                abv: parseFloat(formData.abv),
                price: parseFloat(formData.price),
            });
            onCreate(newBeer);
            onClose();
            navigate('/beers'); // Redirect to the beers list
        } catch (err) {
            console.error('Error creating beer:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
            <form onSubmit={handleSubmit} className='form'>
                <div className='formGroup'>
                    <label htmlFor="id_brewery">Select Brewery</label>
                    <select
                        id="id_brewery"
                        name="id_brewery"
                        value={formData.id_brewery}
                        onChange={handleInputChange}
                        required
                        className='select'
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
                <div className='formGroup'>
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
                <div className='formGroup'>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='formGroup'>
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
                <div className='formGroup'>
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
                <button type="submit" className='button' disabled={loading}>
                    {loading ? 'Creating...' : 'Create Beer'}
                </button>
            </form>
        // </div>
    );
};


export default CreateBeerForm;
