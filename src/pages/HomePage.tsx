import React, { useEffect, useState } from 'react';
import { getBeers } from '../api/beersApi';
import { getBreweries } from '../api/breweriesApi';
import CustomCarousel from "../components/CustomCarousel.tsx";
import BeerCard from "../components/BeerCard.tsx";

const HomePage: React.FC = () => {
    const [beers, setBeers] = useState<any[]>([]);
    const [breweries, setBreweries] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const beersData = await getBeers();
                const breweriesData = await getBreweries();
                setBeers(beersData);
                setBreweries(breweriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome to Beers and Breweries</h1>

            <h2>Featured Beers</h2>
            <CustomCarousel
                items={beers}
                renderItem={(beer) => (
                    <BeerCard
                        key={beer.id_beer}
                        id={beer.id_beer}
                        name={beer.name}
                        description={beer.description}
                        abv={beer.abv}
                        price={beer.price}
                        idBrewery={beer.id_brewery}
                        breweryName={beer.brewery_name}
                        breweryCountry={beer.brewery_country}
                        onDelete={()=>''}
                        isFavorite={false}
                        onToggleFavorite={()=>''}
                    />
                )}
                style={{ margin: '20px auto' }}
                visibleItems={3}
            />

            <h2>Featured Breweries</h2>
            <CustomCarousel
                items={breweries}
                renderItem={(brewery) => (
                    <div style={{ textAlign: 'center' }}>
                        <h3>{brewery.name}</h3>
                        <p>{brewery.country}</p>
                    </div>
                )}
                style={{ maxWidth: '800px', margin: '20px auto' }}
                visibleItems={3}

            />
        </div>
    );
};


export default HomePage;
