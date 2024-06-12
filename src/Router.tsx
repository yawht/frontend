import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';

import { LandingPage, CreateGenerationPage, TimelinePage } from './pages';
import { BaseGenerationPage, GenerationPage } from './pages/CreateGenerationPage/CreateGenerationPage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/generation',
        element: <BaseGenerationPage />,
        children: [
            {
                path: ':id',
                element: <GenerationPage />,
            }, {
                path: '',
                element: <CreateGenerationPage />
            }
        ],
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
