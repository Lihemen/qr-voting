import React from 'react';
import Input from '../Input';

function createFormFieldConfig(
  label,
  name,
  type,
  autoComplete,
  span,
  defaultValue = ''
) {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      // ADD A SWITCH STATEMENT TO CATER FOR OTHER FORM FIELD TYPES
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          span={span}
          handleChange={handleChange}
          errorMessage={error}
          autoComplete={autoComplete}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
  };
}

export default createFormFieldConfig;
