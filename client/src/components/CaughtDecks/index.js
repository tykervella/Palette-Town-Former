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
      image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_42.png',
    },
  ];

  return (
    <>
      {/* <h2 className="text-black mb-4 mt-4">Caught Decks</h2> */}
      <Container>
        <Row className='justify-content-center'>
          {cards.map((card, index) => (
            <Col key={index} className='border border-black rounded-xl bg-[#AFD7CA] mt-18 mx-2 mb-2'>
              <div>
                <img className="mt-4" src={card.image} alt={card.title} />
                <h3 className='mt-4 mb-4 text-white text-center'>{card.title}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default CaughtDecks;
