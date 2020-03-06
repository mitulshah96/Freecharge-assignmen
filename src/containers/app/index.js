import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components';

const Home = lazy(() => import('../../containers/home'));

export default function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Home />
        </Suspense>
    );
}
