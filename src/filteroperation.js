const client = require('../helpers/client');

const filter = tx => {
  const type = Object.keys(client.TransactionType).find(key => client.TransactionType[key] === tx.type);
  const payload = tx.data;
  switch (type) {
    case 'VOTE': {
      //TODO
      break;
    }
    case 'TRANSFER': {
      //TODO
      break;
    }
    default: {
      break;
    }
  }

};
module.exports = {
  filter
};
