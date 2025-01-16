import React from 'react';

interface FiltersProps {
    searchQuery: string;
    abvFilter: number | '';
    suggestions: string[];
    onSearchChange: (query: string) => void;
    onAbvChange: (abv: number | '') => void;
    onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({
                                             searchQuery,
                                             abvFilter,
                                             suggestions,
                                             onSearchChange,
                                             onAbvChange,
                                             onClear
}) => {
    return (
        <div className='filters'>
            <div>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    list="beer-suggestions" // Use the datalist element for autocomplete
                />
                <datalist id="beer-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion}/>
                    ))}
                </datalist>
            </div>
            <input
                className="minAbv"
                type="number"
                placeholder="Min ABV (%)"
                value={abvFilter}
                onChange={(e) => onAbvChange(e.target.value ? parseFloat(e.target.value) : '')}
            />
            <button onClick={onClear}>Clear Filters</button>
        </div>
    );
};

export default Filters;
