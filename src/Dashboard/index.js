import React, { useState } from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaChartLine,
  FaLayerGroup,
  FaBrush,
  FaChartBar,
  FaCog,
  FaChevronDown,
} from 'react-icons/fa';

import { BsGridFill } from 'react-icons/bs';
import { IoMdOptions } from 'react-icons/io';
import MobileMenu from './MobileMenu';

export default function Dashboard({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <header className='dashboard__header'>
        {showMenu && <MobileMenu />}
        <nav>
          <Link aria-label='logo' to='/admin' className='logo'>
            QR Voting
          </Link>
          <FaChevronDown
            className='toggle-mob-menu'
            aria-expanded='false'
            aria-label='open mobile menu'
            onClick={() => setShowMenu((s) => !s)}
          />
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
              <Link to='/elections/results'>
                <FaChartLine />
                <span>Results</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <FaBrush />
                <span>Appearance</span>
              </Link>
            </li>
            <li className='menu__heading'>
              <h3>Settings</h3>
            </li>
            <li>
              <Link to='#'>
                <IoMdOptions />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <FaCog />
                <span>Options</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <FaChartBar />
                <span>Charts</span>
              </Link>
            </li>
            <li className='menu__heading'>
              <h3>Others</h3>
            </li>
            <li>
              <div className='logout-btn'>Logout</div>
            </li>
          </ul>
        </nav>
      </header>
      <section className='dashboard__content'>{children}</section>
    </div>
  );
}
