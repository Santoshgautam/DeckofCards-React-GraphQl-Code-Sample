let defaultState = {
  hasError: false
};

export default (state = defaultState, { type }) => {
  switch (type) {
    case 'SET_APP_ERROR':
      return { ...state, hasError: true };
    default:
      return state;
  }
};
