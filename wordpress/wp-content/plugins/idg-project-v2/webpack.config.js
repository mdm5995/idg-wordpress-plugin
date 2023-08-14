const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// defaultConfig.entry() is a function that returns an object
// of all folders with block.json files
const entryConfig = defaultConfig.entry();

// in order to add the index.js file, we're taking that output and
// adding the path to ./src/index.js as an entry with key 'index'
entryConfig.index = path.resolve(process.cwd(), 'src', 'index.js');

// then we take that entry config and add it to the derfaultConfig.entry key
defaultConfig.entry = entryConfig;

// finally we export the updated defaultConfig
module.exports = defaultConfig;
