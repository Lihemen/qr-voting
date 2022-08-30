// REROUTE TO INFO ON SUCCESSFUL CREATION
import React from 'react';
import useForm from '../components/form/useForm';
import Button from '../components/Button';

import createFormFieldConfig from '../components/form/createFormFieldConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from '../components/form/validationRules';

import Dashboard from '../Dashboard';
import { useAlert } from 'react-alert';
import { partyServices } from '../services/party';
import { delayedRedirect } from '../util/redirect';

const partyForm = {
  partyName: {
    ...createFormFieldConfig('Party Name', 'partyName', 'text'),
    validationRules: [requiredRule('partyName'), minLengthRule('partyName', 3)],
  },
  acronym: {
    ...createFormFieldConfig('Party Acronym', 'acronym', 'text'),
    validationRules: [
      requiredRule('acronym'),
      minLengthRule('acronym', 3),
      maxLengthRule('acronym', 5),
    ],
  },
  candidateName: {
    ...createFormFieldConfig('Party Candidate', 'candidateName', 'text'),
    validationRules: [
      requiredRule('candidateName'),
      minLengthRule('candidateName', 3),
    ],
  },
  candidatePosition: {
    ...createFormFieldConfig(
      'Contesting Position',
      'candidatePosition',
      'text'
    ),
    validationRules: [requiredRule('candidatePosition')],
  },
  candidateLga: {
    ...createFormFieldConfig('Candidate LGA', 'candidateLga', 'text'),
    validationRules: [requiredRule('candidateLga')],
  },
};

export default function Create() {
  const { renderFormInputs, isFormValid, getFormValues } = useForm(partyForm);
  const alert = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = { ...getFormValues() };
      const party = {
        name: form.partyName,
        acronym: form.acronym,
        candidate: {
          name: form.candidateName,
          position: form.candidatePosition,
          lga: form.candidateLga,
        },
      };
      await partyServices.createParty(party);
      alert.success('Party Created');
      delayedRedirect(5000, '/parties');
    } catch (error) {
      alert.error('Unable to create Party');
    }
  };
  return (
    <Dashboard>
      <form className='form'>
        <h2>Create Party</h2>
        {renderFormInputs()}

        <Button
          type='submit'
          handleClick={handleSubmit}
          disabled={!isFormValid()}
          text='Create'
        />
      </form>
    </Dashboard>
  );
}
