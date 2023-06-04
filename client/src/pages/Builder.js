import React from "react";
import Container from 'react-bootstrap/Container';

import DeckBuilder from "../components/DeckBuilder/index.js";

const Builder = () => {
    return (
      // primary container for entire page
      <Container>
        <DeckBuilder />
       
      </Container>
    )
  };

export default Builder;
