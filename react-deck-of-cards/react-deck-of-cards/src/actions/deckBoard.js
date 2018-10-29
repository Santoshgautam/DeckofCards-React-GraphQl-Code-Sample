import network from '../network';
const setCards = ({ cards }, dispatch) => dispatch({ type: 'SET_DECK_CARDS', cards });
export default {
  showDeckDetail: (deckId, deckName) => dispatch => {
    dispatch({ type: 'SHOW_DECK_DETAIL', deckId, deckName });
    network.getDeckDetail(deckId).then(data => setCards(data, dispatch));
  },
  hideDeckDetail: dispatch => {
    dispatch({ type: 'HIDE_DECK_DETAIL' });
  },
  shuffleDeck: deckId => dispatch => {
    network.shuffleDeck(deckId).then(data => setCards(data, dispatch));
  },
  dealACard: deckId => dispatch => {
    network.dealACard(deckId).then(data => setCards(data, dispatch));
  }
};
