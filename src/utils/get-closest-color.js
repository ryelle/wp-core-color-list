/**
 * External dependencies
 */
import convert from 'color-convert';
import tinycolor from 'tinycolor2';

export default function getClosestColor( hex, colorList = {} ) {
	if ( ! Object.values( colorList ).length ) {
		return false;
	}
	const color = tinycolor( hex );
	if ( ! color || ! color.isValid() ) {
		return false;
	}
	const { r, g, b } = color.toRgb(); // @todo handle transparent colors?
	const lab = convert.rgb.lab( [ r, g, b ] );
	let lowestDiff = 9999999;
	let matchedColor = '';
	Object.values( colorList ).forEach( ( value ) => {
		const valueColor = tinycolor( value );
		const { r: r2, g: g2, b: b2 } = valueColor.toRgb();
		const lab2 = convert.rgb.lab( [ r2, g2, b2 ] );
		// See https://en.wikipedia.org/wiki/Color_difference
		const diff = Math.sqrt(
			Math.pow( lab2[ 0 ] - lab[ 0 ], 2 ) +
				Math.pow( lab2[ 1 ] - lab[ 1 ], 2 ) +
				Math.pow( lab2[ 2 ] - lab[ 2 ], 2 )
		);

		if ( diff < lowestDiff ) {
			lowestDiff = diff;
			matchedColor = value;
		}
	} );

	return matchedColor;
}
