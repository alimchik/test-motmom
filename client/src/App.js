import React from 'react';
import Products from './pages/Products';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('auth')
@observer
class App extends React.Component {
  
  componentDidMount() {
    this.props.auth.autoLogin();
  }

  render() {
    const { isAuthorized } = this.props.auth;
    console.log(isAuthorized);
    return (
      <Router>
          {
            isAuthorized ?
              <Switch>
                <Route exact path='/products'>
                  <Products />
                </Route>
                <Redirect to='/products'/>
              </Switch>
            : <Switch>
                <Route exact path='/auth'>
                  <Auth />
                </Route>
                <Redirect to='/auth'/>
              </Switch>
          }
      </Router>
    );
  }
}

export default App;
