import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BeersPage from '../pages/BeersPage';
import BreweriesPage from '../pages/BreweriesPage';
import BeerPage from "../pages/BeerPage.tsx";
import UpdateBeerPage from "../pages/UpdateBeerPage.tsx";
import BreweryPage from "../pages/BreweryPage.tsx";
import FavoritesPage from "../pages/FavoritesPage.tsx";
import Layout from "../components/Layout.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/beers" element={<BeersPage />} />
                    <Route path="/beers/:id" element={<BeerPage />} />
                    <Route path="/beers/edit/:id" element={<UpdateBeerPage />} />
                    <Route path="/breweries" element={<BreweriesPage />} />
                    <Route path="/brewery/:id" element={<BreweryPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
