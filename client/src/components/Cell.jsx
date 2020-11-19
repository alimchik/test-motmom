import React from 'react';
import { inject } from 'mobx-react';

import './Cell.scss';

@inject('store')
class Cell extends React.Component {

  state = {
    nameField: this.props.nameField,
    valueField: this.props.valueField,
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

  render() {
    return (
      this.state.isEdit 
      ? <td> 
          <input className='editInput'
                 autoFocus 
                 name={this.state.nameField} 
                 value={this.state.valueField} 
                 onChange={this.onChangeHandler} 
                 onBlur={this.onBlurHandler}
                 onKeyPress={this.onKeyPressHandler}
          /> 
        </td>
      : <td onDoubleClick={this.editHandler}>{this.state.valueField}</td>
    )
  }
}

export default Cell;