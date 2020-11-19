import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class Auth {
  isAuthorized = true;
  inputs = {
   email: '',
   password: ''
  };

  updateInputsValue = (value, name) => {
    this.inputs[name] =value;
  }

  registr = async () => {
    const result = await axios.post('http://localhost:5000/api/auth/registr', this.inputs);
    console.log(result);
  }

  login = async () => {
    const result = await axios.post('http://localhost:5000/api/auth/login', this.inputs);
    console.log(result);
    if (result.status === 200) {
      localStorage.setItem('userData', JSON.stringify({
        userId: result.data.userId,
        token: result.data.token
      }));
      this.isAuthorized = !this.isAuthorized;
    }
  }


  autoLogin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.isAuthorized = !!userData.token;
    }
    return
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