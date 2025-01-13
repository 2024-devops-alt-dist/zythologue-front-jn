import React, { useEffect, useState } from 'react';
import { getBeers } from '../api/beersApi';
import BeerList from '../components/BeerList';

const BeersPage: React.FC = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            <BeerList beers={beers} />
        </div>
    );
};

// const styles = {
//     title: {
//         textAlign: 'center',
//         fontSize: '2rem',
//         margin: '16px 0',
//     },
// };

export default BeersPage;

