import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { delayedRedirect } from '../util/redirect';

import useForm from '../components/form/useForm';
import Button from '../components/Button';
import createFormFieldConfig from '../components/form/createFormFieldConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from '../components/form/validationRules';
import { useAlert } from 'react-alert';

import { voterService } from '../services/voter';

const loginForm = {
  email: {
    ...createFormFieldConfig('Email', 'email', 'email', 'given-name'),
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
};

export default function Login(props) {
  const { getFormValues, isFormValid, renderFormInputs } = useForm(loginForm);
  const alert = useAlert();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await voterService.login(getFormValues());
      alert.success('Login Successful');

      const location = props.location;
      const { state } = location;

      if (user.role === 'admin' && state === undefined) {
        return delayedRedirect(2000, '/admin');
      } else if (user.role !== 'admin') {
        return delayedRedirect(5000, `/voters/${user._id}`);
      } else {
        return delayedRedirect(5000, state.from.pathname);
      }
    } catch (error) {
      setError(error);
      alert.error('Error Logging in');
    }
  };
  return (
    <div className='form__container'>
      <form className='form'>
        <h2>Login</h2>

        {renderFormInputs()}

        <Button
          type='submit'
          text='Login'
          handleClick={handleSubmit}
          disabled={!isFormValid()}
        />

        {error && (
          <p>
            Don't have an Account? <Link to='/voters/create'>Click Here</Link>
          </p>
        )}
      </form>
    </div>
  );
}
