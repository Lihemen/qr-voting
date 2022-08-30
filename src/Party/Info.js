// ADD BUTTON TO ADD TO ELECTION
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../components/useModal';
import { partyServices } from '../services/party';
import Dashboard from '../Dashboard';
import Button from '../components/Button';
import { delayedRedirect } from '../util/redirect';
import { useAlert } from 'react-alert';

export default function Info() {
  const { partyId } = useParams();
  const [party, setParty] = useState({});
  const alert = useAlert();
  const { renderModal, toggleModal } = useModal();

  const fetchParty = async () => {
    const res = await partyServices.getParty(partyId);
    setParty({ ...res });
    console.log(res);
  };

  const deleteParty = async () => {
    try {
      // await partyServices.deleteParty(partyId);
      alert.success('Party Deleted', { timeout: 1500 });
      return delayedRedirect(500, '/parties');
    } catch (error) {
      alert.success('Unable to delete Party', { timeout: 1500 });
    }
  };

  useEffect(() => {
    fetchParty();
  });
  return (
    <Dashboard>
      <div className='card'>
        <h3>{party.name} </h3>
        <p>Acronym | {party.acronym}</p>
        <p>Candidate: {party.candidate?.name}</p>
        <Button text='Delete' handleClick={toggleModal} />

        {renderModal(
          <div>
            <p>Are you sure you want to delete this?</p>
            <Button text='Confirm' handleClick={deleteParty} />
          </div>
        )}
      </div>
    </Dashboard>
  );
}
