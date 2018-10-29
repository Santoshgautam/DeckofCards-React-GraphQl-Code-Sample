let db = {
  users: [
    {
      id: '1',
      name: 'Peter'
    },
    {
      id: '2',
      name: 'William'
    },
    {
      id: '3',
      name: 'James'
    },
    {
      id: '4',
      name: 'Benjamin'
    }
  ],
  cardDecks: []
};

const DB = {
  find: (tableName, filter) =>
    (filter && db[tableName] && db[tableName].filter(filter)) || db[tableName] || [],
  save: (tableName, document) => {
    document.id = '' + new Date().getTime();
    db[tableName].push(document);
    return document;
  },
  findOne: (tableName, filter) => {
    return db[tableName].find(filter);
  },
  update: (tableName, filter, update) => {
    DB.find(tableName, filter).forEach(element => {
      element = { ...element, ...update };
    });
  }
};

export default DB;
