import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    backgroundColor: 'red',
    color: 'white',
    marginLeft: '10px'
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
  }
  signIn = e => {
    e.preventDefault();
    let username = this.username.current.value;
    if (username) {
      return this.props.dispatch(actions.user.signIn(username));
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Deck Of Cards</h1>
        <form onSubmit={this.signIn}>
          <input type="text" placeholder="player name you want.." ref={this.username} />
          <Button className={this.props.classes.button} onClick={this.signIn}>
            Sign In
          </Button>
        </form>
        <h4>Sign in with any name to play!</h4>
      </React.Fragment>
    );
  }
}

export default connect(state => ({}))(withStyles(styles)(Login));
