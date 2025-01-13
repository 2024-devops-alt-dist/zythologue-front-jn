import React, { useEffect, useState } from 'react';
import { getBreweries } from '../api/breweriesApi';

const BreweriesPage: React.FC = () => {
    const [breweries, setBreweries] = useState<any[]>([]);

    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const data = await getBreweries();
                setBreweries(data);
            } catch (error) {
                console.error('Error fetching breweries:', error);
            }
        };

        fetchBreweries();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Breweries</h1>
            <ul>
                {breweries.map((brewery) => (
                    <li key={brewery.id_brewery}>
                        <h2>{brewery.name}</h2>
                        <p>{brewery.country}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreweriesPage;
