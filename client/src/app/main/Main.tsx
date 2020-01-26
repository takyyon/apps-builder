import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './dashboard/Dashboard';
import { mainDivStyle } from './Main.styles';

interface MainProps {}

const Main: React.FC<MainProps> = props => {
    return (
        <div className={mainDivStyle}>
            <Router>
                <Dashboard path='/'/>
            </Router>
        </div>
    );
};

export default Main;