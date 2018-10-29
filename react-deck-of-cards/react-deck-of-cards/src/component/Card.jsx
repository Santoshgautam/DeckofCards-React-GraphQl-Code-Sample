import React from 'react';
import SuitAndRank from './SuitAndRank.jsx';
import SuitSymbol from './SuitSymbol.jsx';
import RankSymbol from './RankSymbol.jsx';
import { Colors, CardsLayouts } from '../constants';

const Card = ({ rank, suit }) => {
  let suitSymbols;
  let rankSymbol;
  let _style = {
    color: Colors[suit]
  };

  if (Array.isArray(CardsLayouts[rank])) {
    suitSymbols = CardsLayouts[rank].map((style, i) => (
      <SuitSymbol style={style} suit={suit} key={i} />
    ));
  } else rankSymbol = <RankSymbol symbol={CardsLayouts[rank]} />;

  return (
    <div style={_style} className="playCard">
      <SuitAndRank suit={suit} rank={rank} position={{ top: 4, left: 5 }} />
      <SuitAndRank suit={suit} rank={rank} position={{ bottom: 4, right: 5 }} />
      {suitSymbols}
      {rankSymbol}
    </div>
  );
};

export default Card;
