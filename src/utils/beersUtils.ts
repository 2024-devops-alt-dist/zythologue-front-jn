// utils/beersUtils.ts
export const filterBeers = (beers: any[], searchQuery: string, abvFilter: number | '') => {
    let updatedBeers = beers;

    if (searchQuery) {
        updatedBeers = updatedBeers.filter((beer) =>
            beer.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (abvFilter !== '') {
        updatedBeers = updatedBeers.filter((beer) => beer.abv >= abvFilter);
    }

    return updatedBeers;
};

export const sortBeers = (beers: any[], sortOption: string, isAscending: boolean) => {
    return [...beers].sort((a, b) => {
        let comparison = 0;

        if (sortOption === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortOption === 'abv') {
            comparison = a.abv - b.abv;
        } else if (sortOption === 'price') {
            comparison = a.price - b.price;
        }

        return isAscending ? comparison : -comparison;
    });
};
