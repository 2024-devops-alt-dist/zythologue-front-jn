import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BeersPage from '../pages/BeersPage';
import BreweriesPage from '../pages/BreweriesPage';
import BeerPage from "../pages/BeerPage.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/beers" element={<BeersPage />} />
                <Route path="/beers/:id" element={<BeerPage />} />
                <Route path="/breweries" element={<BreweriesPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
