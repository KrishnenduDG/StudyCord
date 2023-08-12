import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';

import { Auth0Provider } from "@auth0/auth0-react";

import { BrowserRouter } from 'react-router-dom';

import {AUTH0_CLIENT_ID,AUTH0_DOMAIN,AUTH_0_REDIRECT_URI} from "./config/auth0.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: AUTH_0_REDIRECT_URI,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
