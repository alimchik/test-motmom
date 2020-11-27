import React from 'react';
import Products from './pages/Products';
import Auth from './pages/Auth';
import Modal2 from './components/Modal2';
import Form from './components/Form';
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
              <div>  
                <Switch>
                  <Route path='/products'>
                    <Products />
                  </Route>
                  <Redirect to='/products'/>
                </Switch>
                <Route path='/products/add'>
                  <Modal2 title='Добавить товар'>
                    <Form />
                  </Modal2>
                </Route>
              </div>
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
