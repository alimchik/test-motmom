import { decorate, observable, action, computed } from 'mobx';
import { toast } from 'react-toastify';
import * as _ from 'lodash';
import axios from 'axios';

class Store {
  products = [];
  inputValue = '';
  formInputs = {
    name: '',
    count: '',
    price: '',
    date_add: ''
  };

  getProducts = async (param ='') => {
    let result = [];
    const qweryParams = param ? `?name=${param}` : '';
    const url = new URL(qweryParams, 'http://localhost:5000/api/product');
    try {
      result = await axios.get(url);
    } catch (e) {
      toast.error(e.response.data.message);
    }
    
    const result2 = result.data.map(item => {
      item['selected'] = false
      return item
    })

    this.products = result2
  }

  updateInputsForm = (value, name) => {
    this.formInputs[name] = value;
  }

  updateInput = (value) => {
    this.inputValue = value;
    this.getProducts(value);
  }

  checkItem = (id, check) => {
    const result = this.products.map(item => {
      if(item._id === id) {
        return { ...item, selected: check }
      }
      return item
    })

    this.products = [ ...result ]
  }

  checkItemAll = (check) => {
    const result = this.products.map(item => {
      return { ...item, selected: check }
    })

    this.products = [ ...result ]
  }

  getProducts = _.debounce(this.getProducts, 200);

  addProduct = async () => {
    let status = null;
    let result = [];
    try {
      result = await axios.post('http://localhost:5000/api/product/add', this.formInputs);
      status = result.status;
    } catch (e) {
      toast.error(e.response.data.message);
    }

    if (status === 201) {
      this.formInputs.name=''
      this.formInputs.count=''
      this.formInputs.price=''
      this.formInputs.date_add=''
      this.getProducts();
      toast.success(result.data.message);
    }
  }

  removeProductMulti = () => {
    const arrIds = this.products.filter(item => item.selected);
    this.removeProduct(arrIds);
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
      toast.error(e.response.data.message);
    }
    if (result.status === 200) {
      this.getProducts(this.inputValue);
      toast.success(result.data.message);
    }
  }

  editProduct = async (field, value, id) => {
    console.log({ [field]: value })
    let result = []
    try {
      result = await axios.patch(`http://localhost:5000/api/product/${id}`, { [field]: value });
    } catch (e) {
      toast.error(e.response.data.message);
    }
    toast.success(result.data.message);
  }

  get isSomeItemSelected() {
    return this.products.some(item => item.selected === true )
  }

}

Store = decorate(Store, {
  products: observable,
  inputValue: observable,
  formInputs: observable,
  getProducts: action,
  updateInputsForm: action,
  updateInput: action,
  checkItem: action,
  checkItemAll: action,
  addProduct: action,
  removeProductMulti: action,
  removeProduct: action,
  editProduct: action,
  isSomeItemSelected: computed
})

export default new Store();