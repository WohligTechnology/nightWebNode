
module.exports = {
  ssl: {
      key: require('fs').readFileSync(__dirname + '/ssl/key.pem'),
      cert: require('fs').readFileSync(__dirname + '/ssl/cert.pem')
  }
};
