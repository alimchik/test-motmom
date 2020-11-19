import React from 'react';
import { inject, observer } from 'mobx-react';

import Field from './Field';

import './Form.scss';

@inject('store')
@observer
class Form extends React.Component {

  state = {
    nameErr: null,
  }

  onChangeHandler = (e) => {
    this.props.store.updateInputsForm(e.target.value, e.target.name);
  }

  handleOnChange = ({ name, value, isRequired }) => {
    if (isRequired && value === '') {
      this.handleOnErrorChange(`${name}Err`, 'Это поле обязательно к заполнению');
    } else {
      this.handleOnErrorChange(`${name}Err`, '');
    }

    this.props.store.updateInputsForm(value, name);
  }

  handleOnErrorChange = (key, value) => this.setState({ [key]: value })

  submitHandler = (e) => {
    e.preventDefault();

    const errKeys = Object.keys(this.state);

    errKeys.forEach(key => {
      if (this.state[key] !== '') {
        this.handleOnErrorChange(key, 'Это поле обязательно к заполнению');
      }
    });

    if (errKeys.every(key => this.state[key] === '')) {
      this.props.store.addProduct();
    }
  }

  render() {

    const { formInputs } = this.props.store;
    const { nameErr } = this.state;

    return (
      <form onSubmit={this.submitHandler} className='form'>
        <Field
          name='Название товара'
          placeholder='Введите строку'
          value={formInputs.name}
          error={nameErr}
          onChange={value => this.handleOnChange({
            name: 'name',
            value: value,
            isRequired: true
          })}
        />

        <div className='wrap'>
          <label>Количество товара(шт)</label>
          <input name='count' 
                 type='text'
                 value={formInputs.count}
                 onChange={this.onChangeHandler}
          />
        </div>
        <div className='wrap'>
          <label>Стоимость товара(руб)</label>
          <input name='price'
                 type='text'
                 value={formInputs.price}
                 onChange={this.onChangeHandler} 
          />
        </div>
        <div className='wrap'>
          <label>Дата и время</label>
          <input name='date_add'
                 type='date'
                 value={formInputs.date_add}
                 onChange={this.onChangeHandler} 
          />
        </div>
        <button onSubmit={this.submitHandler}>Добавить товар</button>
      </form>
    )
  }
}

export default Form;