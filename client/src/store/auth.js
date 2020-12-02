import { decorate, observable, action } from 'mobx';
import { toast } from 'react-toastify';
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
        toast.success(result.data.message);
      }
    } catch(e) {
      toast.error(e.response.data.message);
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
      toast.error(e.response.data.message);
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
      localStorage.removeItem('token');
    }
  }

}

decorate(Auth, {
  isAuthorized: observable,
  user: observable,
  inputs: observable,
  updateInputsValue: action,
  registr: action,
  login: action,
  setUser: action,
  logout: action,
  autoLogin: action
})

export default new Auth();