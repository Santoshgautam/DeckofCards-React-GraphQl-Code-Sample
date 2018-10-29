import React from 'react';

const RankSymbol = ({ symbol }) => {
  return (
    <div
      style={{
        fontSize: 40,
        paddingTop: 57,
        margin: 'auto',
        lineHeight: '55px',
        width: 50,
        height: 53,
        textAlign: 'center'
      }}
    >
      {symbol}
    </div>
  );
};

export default RankSymbol;
