import React, { useState } from 'react';
import './voter.css';

import QrReader from 'react-qr-reader';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { useModal } from '../components/useModal';
import { voterService } from '../services/voter';
import { useAlert } from 'react-alert';
import { delayedRedirect } from '../util/redirect';

export default function Authenticate() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResults, setScanResults] = useState('');
  const [pin, setPin] = useState('');
  const { renderModal, toggleModal } = useModal();
  const alert = useAlert();

  const handleChange = (event) => {
    const { value } = event.target;
    setPin(value);
  };
  const handleScan = (data) => {
    if (data) {
      setScanResults(data);
    }
  };
  const handleError = (err) => {
    console.log(err);
  };

  const authenticate = async (event) => {
    event.preventDefault();
    try {
      const res = await voterService.authenticate(scanResults, pin);
      alert.success('Voter Authenticated, redirecting....', { timeout: 1000 });
      return delayedRedirect(1000, `/voters/${res._id}/vote`);
    } catch (error) {
      alert.error(error.message, { timeout: 1000 });
      console.log(error);
    }
  };

  return (
    <Dashboard>
      <ul>
        <li>
          Click Here to Get all Voters <Link to='/voters/all'>Get Voters</Link>
        </li>
        <li>
          Click Here to Register new voter{' '}
          <Link to='/voters/create'>Create</Link>
        </li>
        <li>
          Click Here to Scan QR Code{' '}
          <button
            className='btn btn--inline btn--rounded'
            onClick={() => setShowScanner((s) => !s)}
          >
            {showScanner ? 'Hide' : 'Scan'}{' '}
          </button>
        </li>
      </ul>
      {showScanner && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '300px' }}
          className='qr-scanner'
        />
      )}
      {scanResults && (
        <button className='btn' onClick={toggleModal}>
          Input Pin
        </button>
      )}
      {renderModal(
        <form className='form'>
          <div className='input_container'>
            <label htmlFor='pin'>Pin</label>
            <input
              type='numeric'
              name='pin'
              required='required'
              value={pin}
              onChange={handleChange}
            />
          </div>
          <button className='btn' onClick={authenticate}>
            Verify
          </button>
        </form>
      )}
    </Dashboard>
  );
}
