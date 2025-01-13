import React, { useEffect, useState } from 'react';
import { getBeers } from '../api/beersApi';
import BeerList from '../components/BeerList';
import {useNavigate} from "react-router-dom";

const BeersPage: React.FC = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                const data = await getBeers();
                setBeers(data);
            } catch (error) {
                console.error('Error fetching beers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBeers();
    }, []);

    if (loading) {
        return <p>Loading beers...</p>;
    }

    return (
        <div>
            <h1>Beers</h1>
            <button style={styles.button} onClick={() => navigate('/beers/create')}>
                Add New Beer
            </button>
            <BeerList beers={beers}/>
        </div>
    );
};

const styles = {
    title: {
        // textAlign: 'center',
        // fontSize: '2rem',
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
};

export default BeersPage;

