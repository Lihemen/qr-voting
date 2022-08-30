import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function useModal() {
  const [show, setShow] = useState(false);
  const hide = () => {
    setShow(false);
  };

  const toggleModal = () => {
    setShow((s) => !s);
  };
  const renderModal = (children) => {
    return (
      show && (
        <div className='modal__overlay'>
          <div className='modal'>
            <FaTimes onClick={hide} className='modal__hide' />
            {children}
          </div>
        </div>
      )
    );
  };
  return { renderModal, toggleModal };
}

export { useModal };
