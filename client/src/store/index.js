import { decorate, observable, action } from 'mobx';
import * as _ from 'lodash';
import axios from 'axios';

class Store {
  products = [];
  inputValue = '';
  isOpen = false;
  formInputs = {
    name: '',
    count: '',
    price: '',
    date_add: ''
  }

  getProducts = async (param ='') => {
    let result = [];
    const qweryParams = param ? `?name=${param}` : '';
    const url = new URL(qweryParams, 'http://localhost:5000/api/product');
    try {
      const a =_.debounce((e) => {
        console.log('dasdasd')
      },1000)
      console.log(a)
      result = await axios.get(url);
    } catch (e) {
      console.log(e);
    }
    this.products = result.data
    //console.log('продукты',this.products)
  }

  updateInputsForm = (value, name) => {
    this.formInputs[name] =value;
  }

  updateInput = (value) => {
    this.inputValue = value;
    this.getProducts(value);
  }

  getProducts = _.debounce(this.getProducts, 200);

  addProduct = async () => {
    let status = null
    try {
      const result = await axios.post('http://localhost:5000/api/product/add', this.formInputs);
      status = result.status;
    } catch (e) {
      console.log(e)
    }

    if (status === 201) {
      this.openModal();
      this.getProducts();
    }
  }

  removeProduct = async (id) => {
    let result = [];
    try{
      console.log(`http://localhost:5000/api/product/${id}`)
      result = await axios.delete(`http://localhost:5000/api/product/${id}`);
      
    } catch (e) {
      console.log(e);
    }
    if (result.status) {
      this.getProducts(this.inputValue);
    }
  }

  openModal = () => {
    this.isOpen = !this.isOpen;
  }

  editProduct = async (field, value, id) => {
    console.log({ [field]: value })
    let result = []
    try {
      result = await axios.patch(`http://localhost:5000/api/product/${id}`, { [field]: value });
    } catch (e) {
      console.log(e);
    }
    console.log(result);
  }

}

Store = decorate(Store, {
  products: observable,
  inputValue: observable,
  isOpen: observable,
  formInputs: observable,
  getProducts: action,
  updateInput: action,
  removeProduct: action,
  addProduct: action,
  editProduct: action
})

export default new Store();