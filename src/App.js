import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { AdminRoute } from './components/AdminRoute';

import Home from './Home';
import ElectionRouter from './Elections';
import PartyRouter from './Party';
import VoterRouter from './Voter';
import Login from './Login';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <AdminRoute path='/admin' component={Admin} />
        <AdminRoute path='/elections' component={ElectionRouter} />
        <AdminRoute path='/parties' component={PartyRouter} />
        <Route path='/voters' component={VoterRouter} />
        <Route path='/login' exact component={Login} />
        <Redirect path='**' to='/login' />
      </Switch>
    </Router>
  );
}

export default App;
