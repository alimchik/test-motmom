import { decorate, observable, action, computed } from 'mobx';
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
  };
  itemChecked = {};

  getProducts = async (param ='') => {
    let result = [];
    const qweryParams = param ? `?name=${param}` : '';
    const url = new URL(qweryParams, 'http://localhost:5000/api/product');
    try {
      result = await axios.get(url);
    } catch (e) {
      console.log(e);
    }
    this.products = result.data

  }

  updateInputsForm = (value, name) => {
    this.formInputs[name] =value;
  }

  updateInput = (value) => {
    this.inputValue = value;
    this.getProducts(value);
  }

  checkItem = (id, check) => {
    this.itemChecked[id] =check;
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
      this.formInputs.name=''
      this.formInputs.count=''
      this.formInputs.price=''
      this.formInputs.date_add=''
      this.changeModalVisibility();
      this.getProducts();
    }
  }

  removeProductMulti = () => {
    const arrIds = Object.keys(this.itemChecked).filter(item => this.itemChecked[item]);
    this.removeProduct(arrIds);
    this.itemChecked = {...{}};
  }

  removeProduct = async (ids) => {
    let result = [];
    try{
      result = await axios({
        method: 'DELETE',
        url: 'http://localhost:5000/api/product',
        data: {
          data: ids 
        }
      })
    } catch (e) {
      console.log(e);
    }
    if (result.status) {
      this.getProducts(this.inputValue);
    }
  }

  changeModalVisibility = () => {
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

  get removedIds() {
    console.log(Object.entries(this.itemChecked));
    return Object.keys(this.itemChecked).some(item => this.itemChecked[item] === true);
  }

}

Store = decorate(Store, {
  products: observable,
  inputValue: observable,
  isOpen: observable,
  formInputs: observable,
  itemChecked: observable,
  getProducts: action,
  updateInput: action,
  removeProduct: action,
  addProduct: action,
  editProduct: action,
  removedIds: computed
})

export default new Store();