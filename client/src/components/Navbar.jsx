import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { inject } from 'mobx-react';

import './Navbar.scss';

@inject('auth')
class Navbar extends Component {
  
  logoutHandler = (e) => {
    e.preventDefault()
    this.props.auth.logout()
  }

  render() {
    const { isAuthorized } = this.props
    return (
      <div className="navbar">
        <div className="container">
          <div className="btnContainer">
            {!isAuthorized && <div className="login"><Link to="/login">Войти</Link></div> }
            {!isAuthorized && <div className="registration"><Link to="/registration">Регистрация</Link></div> }
            {isAuthorized &&  <button className="logout" onClick={this.logoutHandler}>Выход</button> }
          </div>
        </div>
    </div>
    );
  }
}

export default Navbar;