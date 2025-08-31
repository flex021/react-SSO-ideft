import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { RENDER_API_ENDPOINT } from './utils/constants.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-afs26bivertitevu.us.auth0.com"
    clientId="heyloaBYSs5ivLHNQKFbMlp6gquIZJat"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: RENDER_API_ENDPOINT
    }}
    //refresh token
    useRefreshTokens={true}
    useRefreshTokensFallback={true}

    //SSO
    cookieDomain={
    window.location.hostname.includes("localhost") ? ".ideft.local" : undefined
  }
    cacheLocation="memory"
  >
    <App />
  </Auth0Provider>
)
