import { gql } from 'apollo-server-express';
export default gql`
  type User {
    id: ID!
    name: String!
  }

  type Card {
    id: ID!
    suit: String!
    rank: Int!
  }

  type Deck {
    id: ID!
    cards: [Card]!
    owner: User!
    name: String
  }

  type Query {
    user: [User]

    getDeckById(id: String): Deck
    getDecksOfUser(userId: String): [Deck]
  }

  type Mutation {
    createDeck(userId: String, name: String): Deck
    createUserIfNotPresent(name: String): User
    dealCardFromDeck(id: String): Deck
    shuffleDeck(id: String): Deck
  }
`;
