let defaultState = {
  data: []
};

export default (state = defaultState, { type, data }) => {
  switch (type) {
    case 'UPDATE_DECK_DATA':
      return { ...state, data };
    default:
      return state;
  }
};
