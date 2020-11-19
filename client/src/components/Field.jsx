import React, { Component } from 'react';

import './Field.scss';


export default class Field extends Component {

  handleValueChange = e => this.props.onChange(e.target.value)

  render() {
    const { value, name, placeholder, error } = this.props;

    return (
      <label className='field'>
        <span className='label'>
          {name}
        </span>

        <input
          name={name}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={this.handleValueChange}
          className='input'
        />

        <span className='error'>
          {!!error ? error : ''}
        </span>
      </label>
    );
  }
};
