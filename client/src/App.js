import React, { useReducer } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { useFetch } from './hooks';
import { AppReducer } from './lib/app';
import { DispatchContext, StateContext } from './lib/app/context';
import { IndexRoute, NotFoundRoute } from './routes';
import './scss/App.scss';

/**
 * The client app is served via a Cloudflare worker
 * The worker can also also compute requests similar to "/functions" from Netlify
 */
const apiEndpoint = 
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8787/api' // Local `wrangler dev` instance
    : '/api' // Live Instance

function App() {
  const [state, dispatch] = useReducer(AppReducer, {})

  const {data, loading} = useFetch(apiEndpoint)
  console.log(`useFetch(${apiEndpoint})`, {data, loading})

  return (
    <div className="App">
      <Router>
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>
            <Switch>
              <Route exact path='/' render={()=> <IndexRoute/>} />
              <Route path='' render={()=> <NotFoundRoute/>} />
            </Switch>
          </StateContext.Provider>
        </DispatchContext.Provider>
      </Router>
    </div>
  );
}

export default App;
