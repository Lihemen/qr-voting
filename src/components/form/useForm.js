import { useState, useCallback } from 'react';

export default function useForm(initialValues) {
  const [state, setState] = useState(initialValues);

  function renderFormInputs() {
    return Object.values(state).map((inputObj) => {
      const { errorMessage, label, renderInput, valid, value } = inputObj;
      return renderInput(onInputChange, value, valid, errorMessage, label);
    });
  }
  const isInputFieldValid = useCallback(
    (inputField) => {
      for (const rule of inputField.validationRules) {
        if (!rule.validator(inputField.value, state)) {
          inputField.errorMessage = rule.message;
          return false;
        }
      }
      return true;
    },
    [state]
  );

  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const inputObj = { ...state[name] };
      inputObj.value = value;

      const isValidInput = isInputFieldValid(inputObj);
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        inputObj.valid = false;
      }

      inputObj.touched = true;
      setState({ ...state, [name]: inputObj });
    },
    [state, isInputFieldValid]
  );

  const isFormValid = useCallback(() => {
    let isValid = true;
    const arr = Object.values(state);

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }, [state]);

  const getFormValues = () => {
    const form = {};
    const arr = Object.keys(state);
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i];
      const val = state[arr[i]];
      form[key] = val.value;
    }
    return form;
  };

  return { renderFormInputs, isFormValid, getFormValues };
}
