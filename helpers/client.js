const javalon = require('javalon');
javalon.config.api = process.env.AVALON_API || 'https://avalon.d.tube/';
module.exports = javalon;
