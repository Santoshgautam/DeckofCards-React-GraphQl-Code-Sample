import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import Card from './Card';
import DeckList from './DeckList';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  menuButton: {
    marginRight: 20
  },
  centerTextContainer: {
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    marginLeft: '10px'
  }
});

class DeckBoard extends Component {
  shuffleDeck = () => {
    this.props.dispatch(actions.deckBoard.shuffleDeck(this.props.deckId));
  };
  dealACard = () => {
    this.props.dispatch(actions.deckBoard.dealACard(this.props.deckId));
  };
  hideDeckDetail = () => {
    this.props.dispatch(actions.deckBoard.hideDeckDetail);
  };
  render() {
    const { cards, show, classes, deckName } = this.props;
    if (!show) {
      return <DeckList />;
    }
    return (
      <div>
        <AppBar position="static" color="default">
          <div className="flexRow">
            <IconButton
              onClick={this.hideDeckDetail}
              className={classes.menuButton}
              color="inherit"
              aria-label="Go Back"
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="title" className={classes.centerTextContainer}>
              Deck Deatil: {deckName}
            </Typography>
            <Button className={classes.button} onClick={this.shuffleDeck}>
              Suffle Deck
            </Button>
            <Button className={classes.button} onClick={this.dealACard}>
              Deal A Card
            </Button>
          </div>
        </AppBar>
        <div className="cardContainer">
          {cards.map(({ id, suit, rank }) => (
            <Card key={id} rank={rank} suit={suit} />
          ))}
        </div>
        <Paper />
      </div>
    );
  }
}

export default connect(({ deckBoard: { show, deckId, deckName, cards } }) => {
  return {
    show,
    deckId,
    cards,
    deckName
  };
})(withStyles(styles)(DeckBoard));
