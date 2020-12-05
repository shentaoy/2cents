import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import DashboardView from './views/reports/DashboardView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/2cents', element: <Navigate to="/app/dashboard" /> }
    ]
  }
];

export default routes;
