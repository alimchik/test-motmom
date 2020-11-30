import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class Auth {
  isAuthorized = false;
  user = {};
  inputs = {
   email: '',
   password: ''
  };

  updateInputsValue = (value, name) => {
    this.inputs[name] =value;
  }

  registr = async () => {
    try {
      const result = await axios.post('http://localhost:5000/api/auth/registr', this.inputs);
      if (result.status === 201) {
        alert('Регистрация успешно прошла');
      }
    } catch(e) {
      console.log(e.response.data.message)
    }
  }

  login = async () => {
    try {
      const result = await axios.post('http://localhost:5000/api/auth/login', this.inputs);
      if (result.status === 200) {
        localStorage.setItem('token', result.data.token);
        this.setUser(result.data.user);
      }
    } catch(e) {
      console.log(e.response.data.message)
    }
  }

  setUser = (user) => {
    this.user = { ...user };
    this.isAuthorized = true;
  }
  
  logout = () => {
    localStorage.removeItem('token');
    this.user = { ...{} };
    this.isAuthorized = false;
  }

  autoLogin = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/auth/autologin', {headers: {Authorization:localStorage.getItem('token') }})
      this.setUser(result.data.user);
      localStorage.setItem('token', result.data.token)
    } catch(e) {
      console.log(e.response.data.message);
      localStorage.removeItem('token');
    }
  }

}

decorate(Auth, {
  isAuthorized: observable,
  inputs: observable,
  updateInputsValue: action,
  registr: action,
  login: action
})

export default new Auth();