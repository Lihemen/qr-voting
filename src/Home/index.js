import React from 'react';
import Banner from '../components/Banner';
import bannerImage from '../components/images/banner-image.svg';

export default function Home() {
  return (
    <main className='home'>
      <Banner
        title='We give the power back to the Masses'
        subtitle='The time is now for you to get involved and change the world. It all starts with you'
        linkText='Get Started'
        link='login'
        heroImage={bannerImage}
      />
    </main>
  );
}
