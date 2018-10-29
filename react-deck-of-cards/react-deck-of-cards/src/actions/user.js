import network from '../network';
export default {
  signIn: user => dispatch =>
    network.signIn(user).then(user => dispatch({ type: 'ADD_USER', id: user.id, name: user.name })),
  logOut: _ => ({ type: 'REMOVE_USER' })
};
