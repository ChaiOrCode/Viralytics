import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';

const App: React.FC = () => {
    console.log('Rendering App component');

    return (
        <Auth0Provider
            domain="dev-c8lveanmr6117xrn.us.auth0.com"
            clientId="WBQdzxVxnWQ7rJvVyT8aCMHWpeyAaTnP"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <Home />
        </Auth0Provider>
    );
};

export default App;