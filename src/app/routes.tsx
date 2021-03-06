import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../ui/layouts/DashboardLayout';
import MainLayout from '../ui/layouts/MainLayout';
import DashboardView from '../ui/view/DashboardView';

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
