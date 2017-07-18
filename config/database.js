//creating a secrete code
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://localhost:27017' + this.db,
  secrete: crypto,
  db: 'meanblog-2'
}
