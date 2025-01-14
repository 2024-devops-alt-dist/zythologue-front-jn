// components/Sorting.tsx
import React from 'react';

interface SortingProps {
    sortOption: string;
    isAscending: boolean;
    onSortChange: (option: string) => void;
    onToggleOrder: () => void;
}

const Sorting: React.FC<SortingProps> = ({ sortOption, isAscending, onSortChange, onToggleOrder }) => {
    return (
        <div style={{ marginTop: '16px' }}>
            <label htmlFor="sort" style={{ marginRight: '8px' }}>Sort by:</label>
            <select
                id="sort"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                style={{ padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', marginRight: '16px' }}
            >
                <option value="name">Name</option>
                <option value="abv">ABV</option>
                <option value="price">Price</option>
            </select>
            <button
                onClick={onToggleOrder}
                style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                {isAscending ? 'Ascending' : 'Descending'}
            </button>
        </div>
    );
};

export default Sorting;
