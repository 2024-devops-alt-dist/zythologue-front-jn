import axiosClient from './axiosClient';

// Fetch all breweries
export const getBreweries = async () => {
    const response = await axiosClient.get('/breweries');
    return response.data;
};

// Fetch a single brewery by ID
export const getBreweryById = async (id: string) => {
    const response = await axiosClient.get(`/breweries/${id}`);
    return response.data;
};

// Create a new brewery
export const createBrewery = async (breweryData: { name: string; country: string }) => {
    const response = await axiosClient.post('/breweries', breweryData);
    return response.data;
};

// // Update a brewery by ID
// export const updateBrewery = async (id: string, breweryData: Partial<typeof breweryData>) => {
//     const response = await axiosClient.put(`/breweries/${id}`, breweryData);
//     return response.data;
// };

// Delete a brewery by ID
export const deleteBrewery = async (id: string) => {
    const response = await axiosClient.delete(`/breweries/${id}`);
    return response.data;
};
