import { lazy } from 'react'
const Sales = lazy(() => import('../../components/dashboards/sale/sale'));


export const RouteData = [
    { id: 1, path: `${import.meta.env.BASE_URL}dashboards/sales`, element: <Sales /> },
    
];