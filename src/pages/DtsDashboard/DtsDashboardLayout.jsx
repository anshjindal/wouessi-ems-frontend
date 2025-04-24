import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DtsDashboardLayout = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">DTS Dashboard</h1>
            <nav className="space-x-4 mb-4">
                <Link to="/dts_dashboard">Home</Link>
                <Link to="/dts_dashboard/vetting">Vetting</Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default DtsDashboardLayout;
