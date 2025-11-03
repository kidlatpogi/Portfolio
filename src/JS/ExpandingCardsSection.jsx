import React from 'react';
import ExpandingCards from '../JS/ExpandingCards.jsx';

function ExpandingCardsSection() {
  return (
    <section className='ExpandingCards' id='ExpandingCards'>
      <div className="container">
        <h2>Graphic Design Portfolio</h2>
        <ExpandingCards />
      </div>
    </section>
  );
}

export default ExpandingCardsSection;