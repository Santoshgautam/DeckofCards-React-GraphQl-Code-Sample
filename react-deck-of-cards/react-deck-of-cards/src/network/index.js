const fetchData = (tableName, props, fields, mutation) =>
  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `${(mutation === true && 'mutation') || ''}{${tableName +
        (props ? `(${props})` : '')}{${fields}}}`
    })
  })
    .then(res => res.json())
    .then(res => {
      if (!res.errors) {
        return res.data[tableName];
      }
      alert('Network: ' + res.errors[0].message);
    });

export default {
  signIn: user => fetchData('createUserIfNotPresent', `name: "${user}"`, 'id,name', true),
  addDeck: (name, userId) =>
    fetchData('createDeck', `name:"${name}",userId: "${userId}"`, 'id,name', true),
  shuffleDeck: deckId => fetchData('shuffleDeck', `id: "${deckId}"`, 'cards{id,suit,rank}', true),
  dealACard: deckId =>
    fetchData('dealCardFromDeck', `id: "${deckId}"`, 'cards{id,suit,rank}', true),
  getDeckList: userId => fetchData('getDecksOfUser', `userId: "${userId}"`, 'id,name'),
  logError: userId => {
    // Error to network could be logged here.
  },
  getDeckDetail: deckId => fetchData('getDeckById', `id: "${deckId}"`, 'cards{id,suit,rank}')
};
