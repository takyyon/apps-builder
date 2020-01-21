import React from 'react';
import { Router } from '@reach/router';
import Apps from './apps/Apps';
import Dashboard from './dashboard/Dashboard';
import Categories from './categories/Categories';
import Tags from './tags/Tags';
import Problems from './problems/Problems';
import Platforms from './platforms/Platforms';
import Features from './features/Features';

interface AdminProps {}

const Admin: React.FC<AdminProps> = props => {
    return (
        <div>
            <Router>
                <Apps path='/admin/apps/*' />
                <Features path='/admin/features/*' />
                <Categories path='/admin/categories/*' />
                <Tags path='/admin/tags/*' />
                <Problems path='/admin/problems/*' />
                <Platforms path='/admin/platforms/*' />
                <Dashboard path='/admin/*' />
            </Router>
        </div>
    );
};

export default Admin;