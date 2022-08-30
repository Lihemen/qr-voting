import React from 'react';
import { BsBoxArrowInRight } from 'react-icons/bs';

export default function Button({ text, disabled, handleClick, type, attr }) {
  const Icon = type === 'submit' ? <BsBoxArrowInRight /> : '';
  return (
    <button
      className={`btn btn__${attr}`}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {text} {Icon}
    </button>
  );
}
