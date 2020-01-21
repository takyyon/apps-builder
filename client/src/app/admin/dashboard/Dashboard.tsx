import React from 'react';
import { RouteComponentProps } from '@reach/router';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps & RouteComponentProps> = props => {
    return (
        <>Admin Dashboard</>
    );
};

export default Dashboard;