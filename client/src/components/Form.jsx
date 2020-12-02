import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom'

import Field from './Field';

import './Form.scss';

@inject('store')
@observer
class Form extends React.Component {

  state = {
    nameErr: null,
    countErr: null,
    priceErr: null,
  }

  onChangeHandler = (e) => {
    this.props.store.updateInputsForm(e.target.value, e.target.name);
  }

  handleOnChange = ({ name, value, isRequired, type = 'string'}) => {
    
    if (isRequired && value === '') {
      this.handleOnErrorChange(`${name}Err`, 'Это поле обязательно к заполнению');
    } else {
      this.handleOnErrorChange(`${name}Err`, '');
    }

    if (type === 'number') {
      if (isRequired && !Number(value)) {
        this.handleOnErrorChange(`${name}Err`, 'Это поле должно быть числом');
      } else {
        this.handleOnErrorChange(`${name}Err`, '');
      }
    }
    
    this.props.store.updateInputsForm(value, name);
  }

  handleOnErrorChange = (key, value) => this.setState({ [key]: value })

  submitHandler = (e) => {
    e.preventDefault();

    const errKeys = Object.keys(this.state);

    errKeys.forEach(key => {
      if (this.state[key] !== '') {
        this.handleOnErrorChange(key, this.state[key]);
      }
    });

    if (errKeys.every(key => this.state[key] === '')) {
      this.props.store.addProduct();
      this.props.history.push('/products');
    }
  }

  render() {

    const { formInputs } = this.props.store;
    const { nameErr, countErr, priceErr } = this.state;
    const disabledBtn = !!formInputs.name && !!formInputs.count && !!formInputs.price && !!formInputs.date_add;
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
          type='text'
        />

        <Field
          name='Количество товра'
          placeholder='шт'
          value={formInputs.count}
          error={countErr}
          onChange={value => this.handleOnChange({
            name: 'count',
            value: value,
            isRequired: true,
            type:'number'
          })}
          type='text'
        />

        <Field
          name='Стоимость товара'
          placeholder='руб.'
          value={formInputs.price}
          error={priceErr}
          onChange={value => this.handleOnChange({
            name: 'price',
            value: value,
            isRequired: true,
            type:'number'
          })}
          type='text'
        />

        <Field
          name='Дата и время'
          placeholder=''
          value={formInputs.date_add}
          error={null}
          onChange={value => this.handleOnChange({
            name: 'date_add',
            value: value,
            isRequired: true,
            type:'text'
          })}
          type='date'
        />

        <button className={ disabledBtn ? 'active' : 'disabled' } 
                onSubmit={this.submitHandler} 
                disabled={!disabledBtn}
        >Добавить товар</button>
      </form>
    )
  }
}

export default withRouter(Form);