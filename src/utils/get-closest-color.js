import tinycolor from 'tinycolor2';
import colors from './colors.json';

export default function getClosestColor( hex, colorList = colors ) {
	var color = tinycolor( hex );
	if ( ! color || ! color.isValid() ) {
		return false;
	}
	const { r, g, b } = color.toRgb();
	let lowestDiff = 766; // Technically, diff can't be larger than 765.
	let matchedColor = '';
	Object.values( colorList ).forEach( ( value ) => {
		const { r: r2, g: g2, b: b2 } = tinycolor( value ).toRgb();
		const diff = Math.abs( r2 - r ) + Math.abs( g2 - g ) + Math.abs( b2 - b );
		if ( diff < lowestDiff ) {
			lowestDiff = diff;
			matchedColor = value;
		}
	} );

	return matchedColor;
}
