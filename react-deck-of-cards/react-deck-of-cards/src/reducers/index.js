import { combineReducers } from 'redux';
import user from './user';
import deckList from './deckList';
import deckBoard from './deckBoard';
import errorLogger from './errorLogger';

const reducers = combineReducers({
  user,
  deckList,
  deckBoard,
  errorLogger
});

export default reducers;
