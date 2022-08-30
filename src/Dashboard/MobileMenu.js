import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';
import { FaUserCircle, FaChartLine, FaLayerGroup } from 'react-icons/fa';

import { BsGridFill } from 'react-icons/bs';

export default function MobileMenu() {
  return (
    <div>
      <nav className='mob-menu-opened'>
        <ul className='dashboard__menu'>
          <li className='menu__heading'>
            <h3>Admin</h3>
          </li>
          <li>
            <Link to='/elections'>
              <FaLayerGroup />
              <span>Elections</span>
            </Link>
          </li>
          <li>
            <Link to='/voters'>
              <FaUserCircle />
              <span>Voters</span>
            </Link>
          </li>
          <li>
            <Link to='/parties'>
              <BsGridFill />
              <span>Parties</span>
            </Link>
          </li>
          <li>
            <Link to='#'>
              <FaChartLine />
              <span>Trends</span>
            </Link>
          </li>

          <li>
            <div className='logout-btn'>Logout</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
