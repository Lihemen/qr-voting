import React from 'react';

function Input(props) {
  const {
    autoComplete,
    label,
    type,
    name,
    handleChange,
    errorMessage,
    isValid,
    span,
    value,
  } = props;

  return (
    <div className={`input_container ${span ? 'span' : ''}`}>
      <label>{label}</label>
      <input
        className='input'
        autoComplete={autoComplete}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {errorMessage && !isValid && (
        <p className='inline__error'><span>{errorMessage}</span></p>
      )}
    </div>
  );
}

export default Input;
