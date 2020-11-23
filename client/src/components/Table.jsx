import React from 'react';
import Cell from './Cell';
import { observer, inject } from 'mobx-react';

import './Table.scss';

@inject('store')
@observer
class Table extends React.Component {

/*
  state = {
    itemChecked: {}
  }*/

  formatDate (date) {

    let date2 = new Date(date);

    let dd = date2.getDate();
    dd = dd < 10 ? '0' + dd : dd;
  
    let mm = date2.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
  
    let yy = date2.getFullYear();
    yy = yy < 10 ? '0' + yy : yy;
  
    return dd + '.' + mm + '.' + yy;
  }

  checkItem = (id) => (e) => {
    this.props.store.checkItem(id, e.target.checked)
  }

  renderTable (products) {
    if (products.length === 0) {
      return (
        <div>
          Товаров нет 
        </div>
      )
    }
    return (
      <table className="products">
        <thead>
          <tr>
            <th></th>
            <th>Название</th>
            <th>Количество(шт)</th>
            <th>Цена(руб)</th>
            <th>Дата и время добавления</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox" onChange={this.checkItem(item._id)}/>
                  </td>
                  <Cell nameField='name' valueField={item.name} id={item._id} />
                  <Cell nameField='count' valueField={item.count} id={item._id} />
                  <Cell nameField='price' valueField={item.price} id={item._id} />
                  <Cell nameField='date_add' valueField={this.formatDate(item.date_add)} id={item._id} />
                  <td onClick={this.removeProductHandler(item._id)}>
                    <i className="far fa-trash-alt rm-product"></i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
  
  componentDidMount() {
    const { getProducts  } = this.props.store;
    getProducts();
  }

  removeProductHandler = (id) => (e) => {
    e.preventDefault();
    let conf = window.confirm('Вы действительно хотите удалить товар?');
    if (conf) {
      this.props.store.removeProduct([id]);
    }
  }

  render() {
    const { products } = this.props.store;
    return (
      <section className="table-section container">
        {
          this.renderTable(products)
        }
      </section>
    )
  }
};

export default Table;