import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import DeckDialog from './DeckDialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UserIcon from '@material-ui/icons/Face';
import LogOut from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  logOutButton: {
    position: 'absolute',
    backgroundColor: 'red',
    top: theme.spacing.unit * 1,
    right: theme.spacing.unit * 2
  },
  userDetailButton: {
    position: 'absolute',
    backgroundColor: 'red',
    top: theme.spacing.unit * 1,
    left: theme.spacing.unit * 2
  },
  centerTextContainer: {
    textAlign: 'center'
  }
});

class DeckList extends Component {
  state = {
    open: false
  };
  getDeckList = () => this.props.dispatch(actions.deckList.getDeckList(this.props.userId));

  openAddDeckDialog = () => {
    this.setState({
      open: true
    });
  };

  showDeckDetail = (deckId, deckName) => () => {
    this.props.dispatch(actions.deckBoard.showDeckDetail(deckId, deckName));
  };

  logoutUser = () => {
    this.props.dispatch(actions.user.logOut());
  };

  closeAddDeckDialog = () => {
    this.setState({
      open: false
    });
  };

  addDeck = ({ name }) => {
    this.props
      .dispatch(actions.deckList.addDeck(name, this.props.userId))
      .then(this.closeAddDeckDialog);
  };

  render() {
    const { deckList, classes, username } = this.props;
    let view;
    if (!deckList || !deckList.length) {
      view = (
        <Typography variant="subheading" className={classes.centerTextContainer}>
          Deck is empty
        </Typography>
      );
    } else {
      view = (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Deck Name</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {deckList.map(row => {
                return (
                  <TableRow key={row.id} onClick={this.showDeckDetail(row.id, row.name)}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>Click to see details</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );
    }
    return (
      <div>
        <AppBar position="static" color="default">
          <Typography variant="title" className={classes.centerTextContainer}>
            Deck List
          </Typography>
        </AppBar>
        {view}
        <Button
          variant="fab"
          onClick={this.openAddDeckDialog}
          color="primary"
          aria-label="Add"
          className={classes.button}
        >
          <AddIcon />
        </Button>
        <Button
          variant="fab"
          onClick={this.openAddDeckDialog}
          color="primary"
          aria-label="Add"
          className={classes.button}
        >
          <AddIcon />
        </Button>
        <Button
          variant="contained"
          onClick={this.logoutUser}
          color="secondary"
          aria-label="Logout"
          className={classes.logOutButton}
        >
          Logout:
          <LogOut />
        </Button>
        <Button
          variant="contained"
          color="primary"
          aria-label="User"
          className={classes.userDetailButton}
        >
          <UserIcon />
          {username}
        </Button>
        <DeckDialog
          open={this.state.open}
          onClose={this.closeAddDeckDialog}
          addDeck={this.addDeck}
        />
      </div>
    );
  }

  componentDidMount() {
    this.getDeckList();
  }
}

export default connect(({ user, deckList }) => {
  return {
    userId: user.id,
    username: user.name,
    deckList: deckList.data
  };
})(withStyles(styles)(DeckList));
