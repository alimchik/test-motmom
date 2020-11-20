import React from 'react';
import Cell from './Cell';
import { observer, inject } from 'mobx-react';

import './Table.scss';

@inject('store')
@observer
class Table extends React.Component {

  formatDate (date) {

    let date2 = new Date(date);

    let dd = date2.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date2.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date2.getFullYear();
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
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
      this.props.store.removeProduct(id);
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