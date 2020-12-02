import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Products from './pages/Products';
import Auth from './pages/Auth';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import Form from './components/Form';

@inject('auth')
@observer
class App extends React.Component {
  
  componentDidMount() {
    this.props.auth.autoLogin();
  }

  render() {
    const { isAuthorized } = this.props.auth;
    return (
      <Router>
          <Navbar isAuthorized={isAuthorized} />
          <ToastContainer />
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
                  <Modal title='Добавить товар'>
                    <Form />
                  </Modal>
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
