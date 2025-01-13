import React from 'react';
import BeerCard from './BeerCard';

interface Beer {
    id_beer: string;
    name: string;
    description: string;
    abv: number;
    price: number;
    id_brewery: string;
    brewery_name: string;
    brewery_country: string
}

interface BeerListProps {
    beers: Beer[];
}

const BeerList: React.FC<BeerListProps> = ({ beers }) => {
    return (
        <div style={styles.wrapper}>
            {beers.map((beer) => (
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
                />
            ))}
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        // flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
    },
};

export default BeerList;
