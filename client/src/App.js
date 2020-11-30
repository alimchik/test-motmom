import React from 'react';
import Products from './pages/Products';
import Auth from './pages/Auth';
import Modal2 from './components/Modal2';
import Navbar from './components/Navbar';
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
    console.log('asdad',isAuthorized);
    return (
      <Router>
          <Navbar isAuthorized={isAuthorized} />
          {
            isAuthorized ?
              <div className='App'>  
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
                <Route path='/registration'>
                  <Auth titel='Регистрация' type='registration' />
                </Route>
                
                <Route path='/login'>
                  <Auth titel='Войти' type='login' />
                </Route>
                <Redirect to='/registration'/>
              </Switch>
          }
      </Router>
    );
  }
}

export default App;
