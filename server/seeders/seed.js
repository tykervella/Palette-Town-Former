const db = require('../config/connection');
const { User, Deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const deckSeeds = require('./deckSeeds.json');

db.once('open', async () => {
  try {
    await Deck.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < deckSeeds.length; i++) {
      const { _id, deckOwner } = await Deck.create(deckSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: deckOwner },
        {
          $addToSet: {
            decks: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // await Listing.deleteMany();

  // const listings = await Listing.insertMany([
  //   {
  //     cardId: 1,
  //     cardName: 'Bulbasaur',
  //     cardImage: 'bulbasaur.jpg',
  //     cardType: 'Normal',
  //     price: 2999.99,
  //     seller: 'Gary',
  //     createdAt: '',
  //   },
  // ]);

  // console.log('listings seeded');

  console.log('all done!');
  process.exit(0);
});
