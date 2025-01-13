import axiosClient from './axiosClient';

// Fetch all beers
export const getBeers = async () => {
    const response = await axiosClient.get('/beers');
    return response.data;
};

// Fetch a single beer by ID
export const getBeerById = async (id: string) => {
    const response = await axiosClient.get(`/beers/${id}`);
    return response.data;
};

// Create a new beer
export const createBeer = async (beerData: {
    id_brewery: string;
    name: string;
    description: string;
    abv: number;
    price: number;
}) => {
    const response = await axiosClient.post('/beers', beerData);
    return response.data;
};

// // Update a beer by ID
// export const updateBeer = async (id: string, beerData: Partial<typeof beerData>) => {
//     const response = await axiosClient.put(`/beers/${id}`, beerData);
//     return response.data;
// };

// Update a beer by ID
export const updateBeer = async (id: string, beerData: Partial<{
    id_brewery: string;
    name: string;
    description: string;
    abv: number;
    price: number;
}>) => {
    const response = await axiosClient.put(`/beers/${id}`, beerData);
    return response.data;
};

// Delete a beer by ID
export const deleteBeer = async (id: string) => {
    const response = await axiosClient.delete(`/beers/${id}`);
    return response.data;
};
