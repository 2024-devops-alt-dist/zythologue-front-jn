import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getBeersByBrewery, getBreweryById} from '../api/breweriesApi';
import BeerList from "../components/BeerList.tsx";
import {deleteBeer} from "../api/beersApi.tsx";

interface Brewery {
    id: string;
    name: string;
    country: string;
}

interface Beer {
    id_beer: string;
    name: string;
    description: string;
    abv: number;
    price: number;
    id_brewery: string;
    brewery_name: string;
    brewery_country: string;
    onDelete: (id: string) => void;
}

const BreweryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [brewery, setBrewery] = useState<Brewery | null>(null);
    const [beers, setBeers] = useState<Beer[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            await deleteBeer(id);
            setBeers((prev) => prev.filter((beer) => beer.id_beer !== id)); // Update the state
        } catch (err) {
            console.error('Error deleting beer:', err);
            // setError('Failed to delete beer. Please try again.');
        }
    };

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const breweryData = await getBreweryById(id!);
                setBrewery(breweryData);
                const beersData = await getBeersByBrewery(id!);
                setBeers(beersData);
            } catch (error) {
                setError(`Failed to fetch datas: ${error}`);
            }
        };

        fetchBrewery();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!brewery) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">{brewery.name}</h1>
            <p><strong>Country:</strong> {brewery.country}</p>
            <BeerList beers={beers} onDelete={handleDelete}/>
        </div>
    );
};

export default BreweryPage;
