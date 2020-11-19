import React from 'react';

import './Modal.scss';

class Modal extends React.Component {

  render() {
    const { title, children, isOpen, openModalHandler } = this.props
    return (
      <>
      {
        isOpen ?
        <div className="modalOverlay">
          <div className="modalWindow">
            <div className="modalHeader">
              <div className="modalTitle">{title}</div>
              <span onClick={openModalHandler}>
                <i className='fas fa-times'></i>
              </span>
            </div>
            <div className="modalBody">
              {children}
            </div>
          </div>
        </div> : null
      }
      </>
    )
  }
};

export default Modal;