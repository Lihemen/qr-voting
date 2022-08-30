import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { voterService } from '../services/voter';
import './voter.css';

import { useModal } from '../components/useModal';
import { useAlert } from 'react-alert';

export default function Info() {
  const [voter, setVoter] = useState({});
  const { id } = useParams();
  const { renderModal, toggleModal } = useModal();
  const [pin, setPin] = useState('');
  const alert = useAlert();

  const handleChange = (event) => {
    const { value } = event.target;
    setPin(value);
  };

  const download = async (url, title) => {
    try {
      await voterService.downloadQRImage(url, title);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVoterDetails = async () => {
    try {
      const res = await voterService.getVoter(id);
      setVoter({ ...res });
    } catch (error) {
      setVoter({});
    }
  };

  const generateQR = async (key) => {
    if(String(key).length < 4) {
      alert.error('Pin must be at least 4 characters', {timeout: 1000})
      return;
    }
    try {
      await voterService.generateQRCode(key);
      alert.success('QR Code generated', {timeout: 1000});
    } catch (error) {
      console.log(error);
      alert.error('Unable to Generate QR Code', {timeout: 1000});
    }
  };
  useEffect(() => {
    fetchVoterDetails();
  });

  return (
    <>
      {voter && (
        <div className='row'>
          <div className='col'>
            <form className='form'>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Voter Details
              </h3>
              <div className='input_container'>
                <label htmlFor='firstname'>Firstname</label>
                <input
                  type='text'
                  disabled
                  value={voter.firstName}
                  name='firstname'
                />
              </div>
              <div className='input_container'>
                <label htmlFor='lastname'>Lastname</label>
                <input
                  type='text'
                  disabled
                  value={voter.lastName}
                  name='lastname'
                />
              </div>
              <div className='input_container'>
                <label htmlFor='email'>Email</label>
                <input type='email' disabled value={voter.email} name='email' />
              </div>
              <div className='input_container'>
                <label htmlFor='tel'>Telephone</label>
                <input
                  type='tel'
                  disabled
                  value={voter.phoneNumber}
                  name='tel'
                />
              </div>
              {!voter.qrcode && (
                <button
                  className='btn'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal();
                  }}
                >
                  Generate QR Code
                </button>
              )}
              {renderModal(
                <div className='form'>
                  <div className='input_container'>
                    <label htmlFor='pin'>Pin</label>
                    <input
                      type='numeric'
                      value={pin}
                      onChange={handleChange}
                      name='pin'
                    />
                    <span className='inline__error'>
                      NB: Keep this PIN Safe
                    </span>
                  </div>
                  <button
                    className='btn'
                    onClick={(e) => {
                      e.preventDefault();
                      generateQR(pin);
                    }}
                  >
                    Generate
                  </button>
                </div>
              )}
            </form>
          </div>
          <div className='col'>
            {voter.qrcode && (
              <div className='input_container'>
                <img
                  src={voter.qrcode}
                  alt='qr code'
                  className='qr-code'
                  loading='lazy'
                />
                <button
                  className='btn'
                  onClick={() =>
                    download(voter.qrcode, `${voter.email}-qrcode.png`)
                  }
                >
                  Download
                </button>
                {/* <a
                  href={voter.qrcode}
                  target='_blank'
                  download={`${voter.email}-qrcode.png`}
                  className='btn'
                >
                  Download
                </a> */}
              </div>
            )}
            {!voter.qrcode && <p>No QR Code Yet, Create Pin and Generate </p>}
          </div>
        </div>
      )}
      {!voter && <p>Loading...</p>}
    </>
  );
}
