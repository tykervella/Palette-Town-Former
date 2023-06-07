import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CaughtDecks = () => {
  const cards = [
    {
      title: 'FlwrPwr',
      image: 'https://product-images.tcgplayer.com/274436.jpg',
    },
    {
      title: 'PokeLuver',
      image: 'https://www.codewithmike.com/wp-content/uploads/2022/09/buy-this-charizard.jpg',
    },
    {
      title: 'BugL0v3r',
      image: 'https://www.codewithmike.com/wp-content/uploads/2022/10/the-best-investment-pokemon-cards-in-2022.jpg',
    },
  ];

  return (
    <>
      <h2 className="text-black mb-4 mt-4">Caught Decks</h2>
      <Container>
        <Row className='mt-4 justify-content-center'>
          {cards.map((card, index) => (
            <Col key={index} className='border border-black rounded-xl bg-slate-600 mt-10 mx-2'>
              <div>
                <img src={card.image} alt={card.title} />
                <h3 className='mt-4 mb-0 text-white text-center'>{card.title}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default CaughtDecks;

