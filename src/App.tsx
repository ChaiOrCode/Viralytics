import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';

const App = () => {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        >
            <Home />
        </Auth0Provider>
    );
};

export default App;