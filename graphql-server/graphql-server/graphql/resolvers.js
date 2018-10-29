import db from '../db';
const resolvers = {
  Query: {
    user: () => db.find('users'),
    getDeckById: (root, { id }) => db.findOne('cardDecks', deck => deck.id === id),
    getDecksOfUser: (root, { userId }, context, info) =>
      db.find('cardDecks', deck => deck.owner.id === userId)
  },
  Mutation: {
    createDeck: (root, { name, userId }) => {
      const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];
      let cards = [];
      suits.forEach((suit, k) => {
        ranks.forEach((rank, i) => {
          cards.push({ id: '' + new Date().getTime() + k + i, suit, rank });
        });
      });
      let user = db.findOne('users', user => user.id === userId);
      if (user) {
        let deckWithSameName = db.findOne(
          'cardDecks',
          deck => deck.name === name && deck.owner.id === user.id
        );
        if (!deckWithSameName) {
          return db.save('cardDecks', {
            id: new Date().getTime(),
            name,
            owner: user,
            cards
          });
        } else {
          throw new Error('Duplicate Deck Names not allowed.');
        }
      } else {
        throw new Error('No User Found.');
      }
    },
    createUserIfNotPresent: (root, { name }) => {
      let user = db.findOne('users', user => user.name === name);
      if (user) {
        return user;
      }
      return db.save('users', {
        id: new Date().getTime(),
        name
      });
    },
    dealCardFromDeck: (root, { id }) => {
      let deck = db.findOne('cardDecks', deck => deck.id === id);
      if (deck) {
        deck.cards.pop();
        db.update('cardDecks', deck => deck.id === id, { cards: deck.cards });
        return deck;
      } else {
        throw new Error('No Deck Found.');
      }
    },
    shuffleDeck: (root, { id }) => {
      let deck = db.findOne('cardDecks', deck => deck.id === id);
      if (deck) {
        let cards = deck.cards;
        let currentIndex = cards.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = cards[currentIndex];
          cards[currentIndex] = cards[randomIndex];
          cards[randomIndex] = temporaryValue;
        }

        db.update('cardDecks', deck => deck.id === id, { cards: deck.cards });
        return deck;
      } else {
        throw new Error('No Deck Found.');
      }
    }
  }
};

export default resolvers;
