/**
 * External dependencies
 */
const postcss = require( 'postcss' );
const tinycolor = require( 'tinycolor2' );
const { parse } = require( 'postcss-values-parser' );

/**
 * Internal dependencies
 */
const { getClosestColor } = require( '../build/lib/lib.js' );

module.exports = postcss.plugin( 'color-match', function ( options ) {
	const colorList = options.colors || {};

	return function ( root ) {
		// No colors passed in.
		if ( ! Object.values( colorList ).length ) {
			return;
		}

		// If we find this directive, this file should be skipped.
		if ( '@no-color-match' === root.first.text ) {
			return;
		}

		root.walkRules( ( rule ) => {
			rule.walkDecls( ( decl ) => {
				let hasNewColor = false;

				try {
					const valueAst = parse( decl.value );
					valueAst.walkWords( ( node ) => {
						if ( ! node.isColor ) {
							return;
						}
						const color = node.value;
						// @todo transparent colors need special handling.
						if ( tinycolor( color ).getAlpha() !== 1 ) {
							return;
						}
						const newColor = getClosestColor( color, colorList );
						node.value = newColor;
						hasNewColor = true;
					} );

					if ( hasNewColor ) {
						decl.value = valueAst.toString();
					}
				} catch ( e ) {}
			} );
		} );
	};
} );
