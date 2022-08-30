import React from 'react';
import { Link } from 'react-router-dom';

import { FaSearch, FaUserCircle } from 'react-icons/fa';

import Dashboard from '../Dashboard';

import electionImage from '../components/icons/archive.png';
import votersImage from '../components/images/ballot-box.png';
import partiesImage from '../components/icons/current.png';
import analtyics from '../components/images/webanalytics.png';

export default function Admin() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  return (
    <Dashboard>
      <section className='search-and-user'>
        <form>
          <input type='search' placeholder='Search Pages...' />
          <button type='submit' aria-label='submit form'>
            <FaSearch />
          </button>
        </form>
        <div className='admin-profile'>
          <span className='greeting'>Hello {admin.firstName}</span>
          <div className='notifications'>
            <span className='badge'>1</span>
            <FaUserCircle />
          </div>
        </div>
      </section>
      <section className='dashboard__grid'>
        <article>
          <div className='image__container'>
            <img src={analtyics} alt='analytics' />
          </div>
        </article>
        <article>
          <Link to='/elections'>
            <div className='image__container'>
              <img src={electionImage} alt='archive' loading='lazy' />
            </div>
            <h4>Monitor Elections</h4>
          </Link>
        </article>
        <article>
          <Link to='/parties'>
            <div className='image__container'>
              <img src={partiesImage} alt='party' loading='lazy' />
            </div>
            <h4>Manage Political Parties</h4>
          </Link>
        </article>
        <article>
          <Link to='/voters'>
            <div className='image__container'>
              <img src={votersImage} alt='ballot box' loading='lazy' />
            </div>
            <h4>Manage Voters</h4>
          </Link>
        </article>
        <article></article>
      </section>
    </Dashboard>
  );
}
