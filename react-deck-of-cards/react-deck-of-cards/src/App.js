import React from 'react';
import { connect } from 'react-redux';
import Login from './component/Login';
import DeckBoard from './component/DeckBoard';
import './App.css';
import actions from './actions';

class App extends React.Component {
  render() {
    let { user, hasError } = this.props;
    if (hasError) {
      return <h1>Oops!, Something went wrong. we are working on getting this fixed soon.</h1>;
    } else if (user.id) {
      return <DeckBoard />;
    }
    return <Login />;
  }

  componentDidCatch(error, info) {
    this.props.dispatch(actions.errorLogger.logError({ error, info }));
  }
}

export default connect(({ user, errorLogger }) => ({
  user,
  hasError: errorLogger.hasError
}))(App);
