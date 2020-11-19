import React from 'react';
import './Auth.scss';
import { observer, inject } from 'mobx-react';

@inject('auth')
@observer
class Auth extends React.Component {

  onChangeHandler = (e) => {
    this.props.auth.updateInputsValue(e.target.value, e.target.name);
  };

  registrHandler = (e) => {
    e.preventDefault();
    this.props.auth.registr();
  }

  loginHandler = (e) => {
    e.preventDefault();
    this.props.auth.login();
  }

  render() {

    const { inputs } = this.props.auth;
    return (
      <div className='containerr'>
        <div className='form-wrap'>
          <div className='input-wrap'>
            <input name='email' 
                   type='email' 
                   placeholder='email' 
                   value={inputs.email} 
                   onChange={this.onChangeHandler}
            />
            <input name='password' 
                   type='password' 
                   placeholder='password' 
                   value={inputs.password}
                   onChange={this.onChangeHandler}
            />
          </div>
          <div className='button-wrap'>
            <button onClick={this.registrHandler} >Зарегистрироваться</button>
            <button onClick={this.loginHandler} >Войти</button>
          </div>
        </div>
      </div>
    )
  }
};

export default Auth;