import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';

import { LandingPage, CreateGenerationPage, GenerationPage, TimelinePage } from './pages';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/generation/create',
        element: <CreateGenerationPage />,
    },
    {
        path: '/generation/:id',
        element: <GenerationPage />,
    },
    {
        path: '/timeline',
        element: <TimelinePage />
    }
];

const router = createBrowserRouter([
    {
        path: '/',
        element: null,
        children: routes,
        errorElement: null,
    },
]);

export const Router: React.FC = () => (
    <RouterProvider router={router} />
);
