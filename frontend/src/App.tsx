import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
    console.log('Rendering App component');

    const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'dev-c8lveanmr6117xrn.us.auth0.com';
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'WBQdzxVxnWQ7rJvVyT8aCMHWpeyAaTnP';

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <Home />
            <Analytics />
        </Auth0Provider>
    );
};

export default App;
