import React from 'react';
import { inject } from 'mobx-react';

import './Cell.scss';

@inject('store')
class Cell extends React.Component {

  state = {
    nameField: this.props.nameField,
    valueField: this.props.valueField,
    typeField: this.props.typeFild,
    id: this.props.id,
    isEdit: false
  }

  editHandler = () => {
    this.setState({isEdit: !this.state.isEdit})
  }

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({ valueField: value });
  }

  onBlurHandler = () => {
    this.props.store.editProduct(this.state.nameField, this.state.valueField, this.state.id);
    this.editHandler()
  }

  onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      this.props.store.editProduct(this.state.nameField, this.state.valueField, this.state.id);
      this.editHandler()
    }
  }

  formatDate = (date, format = 'dd.mm.yyyy') => {

    let date2 = new Date(date);
    
    let dd = date2.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    
    let mm = date2.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    
    let yy = date2.getFullYear();
    yy = yy < 10 ? '0' + yy : yy;
    
    let result = '';
    
    switch (format) {
      case 'dd.mm.yyyy':
        result = dd + '.' + mm + '.' + yy
        break;
      case 'yyyy-mm-dd' :
        result = yy + '-' + mm + '-' + dd
        break;
      default:
        break;
    }
    
    return result;
  }

  render() {
    return (
      this.state.isEdit 
      ? <td> 
          <input className='editInput'
                 autoFocus 
                 name={this.state.nameField} 
                 value={this.state.typeField === 'date' ? this.formatDate(this.state.valueField, 'yyyy-mm-dd') : this.state.valueField}
                 type={this.state.typeField}
                 onChange={this.onChangeHandler} 
                 onBlur={this.onBlurHandler}
                 onKeyPress={this.onKeyPressHandler}
          /> 
        </td>
      : <td onDoubleClick={this.editHandler}>{this.state.typeField === 'date' ? this.formatDate(this.state.valueField, 'dd.mm.yyyy') : this.state.valueField}</td>
    )
  }
}

export default Cell;