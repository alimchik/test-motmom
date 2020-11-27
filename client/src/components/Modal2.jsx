import React from 'react';
import { createPortal } from "react-dom";
import { Link } from 'react-router-dom';
import './Modal2.scss';

export default class Modal2 extends React.Component {
  render() {
    const { title, children } = this.props
    return createPortal(
      <div className="modalOverlay">
        <div className="window">
          <div className="header">
            <div className="title">{title}</div>
            <Link to='/products'>
              <i className='fas fa-times'></i>
            </Link>
          </div>
          <div className="body">
            {children}
          </div>
        </div>
      </div>,
      document.getElementById("portal"),
    );
  }
}