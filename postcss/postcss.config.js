const colorList = require( '../src/colors/brand-colors-new.json' );

const options = {
	colors: colorList,
};

module.exports = {
	plugins: [ require( './index.js' )( options ) ],
};
