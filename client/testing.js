const axios = require('axios');

function getCards(search) {
  axios.get('https://api.pokemontcg.io/v2/cards', {
    params: {
      q: "name:"+search,
      page: 1,
      pageSize: 5
    }
  })
  .then(response => {
    // Handle the response data here
    const rawData = response.data;
  
    // Accessing each object within the data array
    rawData.data.forEach(card => {
      // Access individual properties of each card object
      const id = card.id;
      const name = card.name;
      const images = card.images;
      const types = card.types;
      // ...and so on
      
      console.log('Card ID:', id);
      console.log('Name:', name);
      console.log('Images:', images);
      console.log('Types:', types);
      console.log('-----------------------------------');
    });
  })
  .catch(error => {
    // Handle the error
    console.error(error);
  });
}

getCards("wooper");