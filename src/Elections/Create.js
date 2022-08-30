import React from 'react';

import useForm from '../components/form/useForm';
import Button from '../components/Button';
import createFormFieldConfig from '../components/form/createFormFieldConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from '../components/form/validationRules';
import { useAlert } from 'react-alert';

import { electionServices } from '../services/election';
import { delayedRedirect } from '../util/redirect';

const electionForm = {
  name: {
    ...createFormFieldConfig('Election Name', 'name', 'text'),
    validationRules: [
      requiredRule('name'),
      minLengthRule('name', 3),
      maxLengthRule('name', 25),
    ],
  },
  start: {
    ...createFormFieldConfig('Start', 'start', 'date'),
    validationRules: [requiredRule('start')],
  },
  end: {
    ...createFormFieldConfig('End', 'end', 'date'),
    validationRules: [requiredRule('end')],
  },
};

export default function Create() {
  const { renderFormInputs, isFormValid, getFormValues } =
    useForm(electionForm);
  const alert = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await electionServices.createElection(getFormValues());
      alert.success('Election Created');
      return delayedRedirect(1000, '/elections');
    } catch (error) {
      alert.error(error.message);
    }
  };

  return (
    <>
      <form className='form'>
        <h2>Create New Election</h2>
        {renderFormInputs()}

        <Button
          type='submit'
          disabled={!isFormValid()}
          handleClick={handleSubmit}
          text='Create'
        />
      </form>
    </>
  );
}
