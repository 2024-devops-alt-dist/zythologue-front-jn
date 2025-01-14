// components/Filters.tsx
import React from 'react';

interface FiltersProps {
    searchQuery: string;
    abvFilter: number | '';
    onSearchChange: (query: string) => void;
    onAbvChange: (abv: number | '') => void;
    onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({ searchQuery, abvFilter, onSearchChange, onAbvChange, onClear }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                type="number"
                placeholder="Min ABV (%)"
                value={abvFilter}
                onChange={(e) => onAbvChange(e.target.value ? parseFloat(e.target.value) : '')}
                style={{ padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
                onClick={onClear}
                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Clear Filters
            </button>
        </div>
    );
};

export default Filters;
