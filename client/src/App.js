import React, { useEffect, useReducer } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import EventReducer from './lib/events';
import { DispatchProvider, StateProvider } from './lib/providers';
import { IndexRoute, NotFoundRoute } from './routes';
import './scss/App.scss';

function App() {
  const [state, dispatch] = useReducer(EventReducer, {})
  const {ready} = state
  useEffect(()=> {
    dispatch({type: 'reset'})

    dispatch({type: 'suspend'})

    dispatch({type: 'ready'})
  },[])

  return ready 
  ? (
    <div className="App">
      <Router>
        <DispatchProvider value={dispatch}>
          <StateProvider value={state}>
            <Switch>
              <AppRoutesAndViews/>
            </Switch>
          </StateProvider>
        </DispatchProvider>
      </Router>
    </div>
  ) 
  : <AppSplashScreen/>
}


// DECLARE APP ROUTES
const AppRoutesAndViews = () => (
  <>
    <Route exact path='/' render={()=> <IndexRoute/>} />
    <Route path='' render={()=> <NotFoundRoute/>} />
  </>
)

// SPLASHSCREEN
const AppSplashScreen = () => (
  <div className="appSplashscreen">
    <span>App Loading...</span>
  </div>
)

export default App;
