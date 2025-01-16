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
    isFavorite: boolean; // Whether the beer is a favorite
    onToggleFavorite: (id: string) => void; // Function to toggle favorite status
}

const BeerCard: React.FC<BeerCardProps> = ({
                                               id,
                                               name,
                                               description,
                                               abv,
                                               price,
                                               breweryName,
                                               breweryCountry,
                                               onDelete,
                                               isFavorite,
                                               onToggleFavorite,
}) => {
    const navigate = useNavigate();
    return (
        <div className="card">
            <h2 className="title">{name}</h2>
            <p className="description">{description}</p>
            <p className="details">
                <strong>ABV:</strong> {abv}%
            </p>
            <p className="details">
                <strong>Price:</strong> ${price}
            </p>
            <p className="details">
                <strong>Brewery:</strong> {breweryName}
            </p>
            <p className="details">
                <strong>Country:</strong> {breweryCountry}
            </p>
            <p>
                <Link to={`/beers/${id}`} className="link">More infos...</Link>
            </p>
            <div className="actions">
                <button className="editButton" onClick={() => navigate(`/beers/edit/${id}`)}>
                    Edit
                </button>
                <button className="deleteButton" onClick={() => onDelete(id)}>
                    Delete
                </button>
                <button
                    className={isFavorite ? 'favoriteButtonActive' : 'favoriteButton'}
                    onClick={() => onToggleFavorite(id)}
                >
                    {isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
            </div>
        </div>
    );
};

export default BeerCard;
