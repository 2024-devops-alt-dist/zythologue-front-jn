import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

interface BeerCardProps {
    id: string
    name: string;
    description: string;
    abv: number;
    price: number;
    idBrewery: string;
    breweryName: string;
    breweryCountry: string;
    onDelete: (id: string) => void;
}

const BeerCard: React.FC<BeerCardProps> = ({ id, name, description, abv, price, breweryName, breweryCountry, onDelete }) => {
    const navigate = useNavigate();
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
            <div style={styles.actions}>
                <button style={styles.editButton} onClick={() =>navigate(`/beers/edit/${id}`)}>
                    Edit
                </button>
                <button style={styles.deleteButton} onClick={() => onDelete(id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '250px',
        height: '403px'
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
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '16px',
    },
    editButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default BeerCard;
