import React from 'react';
import { voterService } from '../services/voter/index';

import useForm from '../components/form/useForm';
import Button from '../components/Button';
import createFormFieldConfig from '../components/form/createFormFieldConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from '../components/form/validationRules';

import { useAlert } from 'react-alert';
import { history } from '../util/history';

const voterForm = {
  firstName: {
    ...createFormFieldConfig('Firstname', 'firstName', 'text', 'given-name'),
    validationRules: [
      requiredRule('firstName'),
      minLengthRule('firstName', 3),
      maxLengthRule('firstname', 25),
    ],
  },
  lastName: {
    ...createFormFieldConfig('Lastname', 'lastName', 'text', 'family-name'),
    validationRules: [
      requiredRule('lastName'),
      minLengthRule('lastName', 3),
      maxLengthRule('lastName', 25),
    ],
  },
  email: {
    ...createFormFieldConfig('Email', 'email', 'email', 'email'),
    validationRules: [requiredRule('email')],
  },
  password: {
    ...createFormFieldConfig('Password', 'password', 'password', 'password'),
    validationRules: [
      requiredRule('password'),
      minLengthRule('password', 4),
      maxLengthRule('password', 16),
    ],
  },

  stateOfOrigin: {
    ...createFormFieldConfig('State of Origin', 'stateOfOrigin', 'text'),
    validationRules: [requiredRule('stateOfOrigin')],
  },
  lga: {
    ...createFormFieldConfig('Local Government', 'lga', 'text'),
    validationRules: [requiredRule('lga')],
  },
  phoneNumber: {
    ...createFormFieldConfig('Phone Number', 'phoneNumber', 'tel', 'tel'),
    validationRules: [requiredRule('phoneNumber')],
  },
  dob: {
    ...createFormFieldConfig('Date of Birth', 'dob', 'date', 'dob'),
    validationRules: [requiredRule('dob')],
  },
};

export default function Create() {
  const { renderFormInputs, isFormValid, getFormValues } = useForm(voterForm);
  const alert = useAlert();

  const handleSubmit = async (event) => {
    // SEND VOTER CREATION REQUEST
    event.preventDefault();
    try {
      await voterService.register(getFormValues());
      alert.success('Voter Created', { timeout: 1000 });
      return history.goBack();
    } catch (error) {
      alert.error('Error creating voter', { timeout: 2000 });
    }
  };
  return (
    <>
      <form className='form form__dual'>
        <h2>Register New Voter</h2>
        {renderFormInputs()}

        <Button
          type='submit'
          text='Register'
          handleClick={handleSubmit}
          disabled={!isFormValid()}
        />
      </form>
    </>
  );
}
