import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner({ title, subtitle, heroImage, linkText, link }) {
  return (
    <div className='banner'>
      <div className='banner__text'>
        <h1 className='banner__title'> {title} </h1>
        <p className='banner__subtitle'>{subtitle} </p>

        <Link to={`/${link}`} className='banner__link'>
          {linkText}{' '}
        </Link>
      </div>

      <div className='banner__image'>
        <img alt='banner hero' src={heroImage} />
      </div>
    </div>
  );
}
