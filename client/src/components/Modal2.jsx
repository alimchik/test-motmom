import React from 'react';
import { createPortal } from "react-dom";
import { Link, withRouter } from 'react-router-dom';
import './Modal2.scss';

class Modal2 extends React.Component {

  closeModal = (e) => {
    const modalOverlay = document.querySelectorAll('.modalOverlay');
    if (e.target === modalOverlay[0]){
      this.props.history.push('/products');
    }
  }
   
  render() {
    const { title, children } = this.props
    return createPortal(
      <div className="modalOverlay" onClick={this.closeModal}>
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
export default  withRouter(Modal2);