import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import './Header.scss';

@inject('store')
@observer
class Header extends React.Component {

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.props.store.updateInput(value);
  }

  removeProduct = (e) => {
    e.preventDefault()
    let conf = window.confirm('Вы действительно хотите удалить товар?');
    if (conf) {
      this.props.store.removeProductMulti();
    }
  }

  render() {
    const { inputValue } = this.props.store;
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
            <button className={this.props.store.isSomeItemSelected ? 'rmvActive' : 'rmvDisabled'} 
                    onClick={this.removeProduct}
                    disabled={!this.props.store.isSomeItemSelected}
            >Удалить товары</button>
            <Link to='products/add' className='add'>Добавить товар</Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;