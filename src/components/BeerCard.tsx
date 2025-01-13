import React from 'react';
import { Link } from 'react-router-dom';

interface BeerCardProps {
    id: string
    name: string;
    description: string;
    abv: number;
    price: number;
    idBrewery: string;
    breweryName: string;
    breweryCountry: string
}

const BeerCard: React.FC<BeerCardProps> = ({ id, name, description, abv, price, breweryName, breweryCountry }) => {
    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{name}</h2>
            <p style={styles.description}>{description}</p>
            <p style={styles.details}>
                <strong>ABV:</strong> {abv}%
            </p>
            <p style={styles.details}>
                <strong>Price:</strong> ${price}
            </p>
            <p style={styles.details}>
                <strong>Brewery:</strong> {breweryName}
            </p>
            <p style={styles.details}>
                <strong>Country:</strong> {breweryCountry}
            </p>
            <p>
                <Link to={`/beers/${id}`} style={styles.link}>More infos...</Link>
            </p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        maxWidth: '300px',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '8px',
        color: '#333',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    },
    description: {
        fontSize: '1rem',
        color: '#555',
    },
    details: {
        fontSize: '0.9rem',
        color: '#666',
        marginTop: '4px',
    },
};

export default BeerCard;
