import network from '../network';

export default {
  logError: errorData => dispatch => {
    dispatch({ type: 'SET_APP_ERROR' });
    network.logError(errorData);
  }
};
