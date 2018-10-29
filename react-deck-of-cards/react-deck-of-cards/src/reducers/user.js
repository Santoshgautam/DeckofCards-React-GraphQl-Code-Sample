let defaultState = {
  id: null,
  name: null
};

export default (state = defaultState, { type, id, name }) => {
  switch (type) {
    case 'ADD_USER':
      return { ...state, name, id };
    case 'REMOVE_USER':
      return { ...state, name: null, id: null };
    default:
      return state;
  }
};
