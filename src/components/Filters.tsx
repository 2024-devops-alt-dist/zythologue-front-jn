// components/Filters.tsx
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
        <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px'}}>
            <div style={styles.filterGroup}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={styles.input}
                    list="beer-suggestions" // Use the datalist element for autocomplete
                />
                <datalist id="beer-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion}/>
                    ))}
                </datalist>
            </div>
            <input
                type="number"
                placeholder="Min ABV (%)"
                value={abvFilter}
                onChange={(e) => onAbvChange(e.target.value ? parseFloat(e.target.value) : '')}
                style={{padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc'}}
            />
            <button
                onClick={onClear}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Clear Filters
            </button>
        </div>
    );
};

const styles : { [key: string]: React.CSSProperties } = {
    filters: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        marginBottom: '16px',
    },
    filterGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    clearButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Filters;
