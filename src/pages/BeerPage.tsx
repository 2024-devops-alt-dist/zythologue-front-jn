import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBeerById } from '../api/beersApi';

interface Beer {
    id_beer: string;
    name: string;
    description: string;
    abv: number;
    price: number;
    idBrewery: string;
    brewery_name: string;
    brewery_country: string
}

const BeerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [beer, setBeer] = useState<Beer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBeer = async () => {
            try {
                const data = await getBeerById(id!); // `id` is guaranteed to exist because of routing
                setBeer(data);
            } catch (error) {
                console.error('Error fetching beer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBeer();
    }, [id]);

    if (loading) {
        return <p>Loading beer details...</p>;
    }

    if (!beer) {
        return <p>Beer not found!</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{beer.name}</h1>
            <p style={styles.description}>{beer.description}</p>
            <p>
                <strong>ABV:</strong> {beer.abv}%
            </p>
            <p>
                <strong>Price:</strong> ${beer.price}
            </p>
            <p>
                <strong>Brewery:</strong> {beer.brewery_name} ({beer.brewery_country})
            </p>
        </div>
    );
};

const styles : { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '600px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '16px',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '16px',
        color: '#555',
    },
};

export default BeerPage;
