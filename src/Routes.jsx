import React from 'react';


import Login from './Pages/Login';
import Home from './Pages/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
               
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                


            </Routes>
        </Router>
    );
}

export default AppRoutes;
