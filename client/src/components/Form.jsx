import React from 'react';
import { inject, observer } from 'mobx-react';

import './Form.scss';

@inject('store')
@observer
class Form extends React.Component {

  onChangeHandler = (e) => {
    this.props.store.updateInputsForm(e.target.value, e.target.name);
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.store.addProduct();
  }

  render() {

    const { formInputs } = this.props.store;

    return (
      <form onSubmit={this.submitHandler} className='form'>
        <div className='wrap'>
          <label>Название товара</label>
          <input name='name'
                 type='text'
                 placeholder='Название товара'
                 value={formInputs.name}
                 onChange={this.onChangeHandler}
          />
        </div>
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