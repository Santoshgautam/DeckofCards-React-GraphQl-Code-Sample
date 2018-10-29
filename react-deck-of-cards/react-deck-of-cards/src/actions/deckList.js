import network from '../network';

const getDeckList = userId => dispatch =>
  network.getDeckList(userId).then(data => {
    dispatch({ type: 'UPDATE_DECK_DATA', data });
  });

export default {
  getDeckList,
  addDeck: (name, userId) => dispatch =>
    network.addDeck(name, userId).then(_ => dispatch(getDeckList(userId)))
};
