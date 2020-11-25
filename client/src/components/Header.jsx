import React from 'react';
import { inject, observer } from 'mobx-react';
import Modal from './Modal';
import Form from './Form';

import './Header.scss';

@inject('store')
@observer
class Header extends React.Component {

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.props.store.updateInput(value);
  }
  
  openModalHandler = () => {
    this.props.store.changeModalVisibility();
  }

  removeProduct = (e) => {
    e.preventDefault()
    this.props.store.removeProductMulti()
  }

  render() {
    const { inputValue, isOpen } = this.props.store;
    return (
      <header className='container'>
        <div className='titel'>
          <h1>Товары</h1>
        </div>
        <div className='search-container'>
          <div className='search'>
            <span><i className="fa fa-search"></i></span>
            <input type='text'
                   value={inputValue}
                   placeholder='Поиск' 
                   onChange={this.onChangeHandler}                 
            />
          </div>
          <div className="btnContainer">
            <button className={this.props.store.removedIds ? 'rmvActive' : 'rmvDisabled'} 
                    onClick={this.removeProduct}
                    disabled={!this.props.store.removedIds}
            >Удалить товары</button>
            <button className='add' onClick={this.openModalHandler}>Добавить товар</button>
          </div>
        </div>
        <Modal title='Добавить товар' isOpen={isOpen} openModalHandler={this.openModalHandler}>
          <Form />
        </Modal>
      </header>
    )
  }
}

export default Header;