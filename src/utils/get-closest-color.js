import tinycolor from 'tinycolor2';
import colors from './colors.json';

export default function getClosestColor( hex, colorList = colors ) {
	var color = tinycolor( hex );
	if ( ! color || ! color.isValid() ) {
		return false;
	}
	const { r, g, b } = color.toRgb(); // @todo handle transparent colors?
	const { h, s } = color.toHsl();
	let lowestDiff = 9999999;
	let matchedColor = '';
	Object.values( colorList ).forEach( ( value ) => {
		const valueColor = tinycolor( value );
		const { r: r2, g: g2, b: b2 } = valueColor.toRgb();
		const { h: h2, s: s2 } = valueColor.toHsl();
		// See https://en.wikipedia.org/wiki/Color_difference
		const diff = Math.sqrt(
			Math.pow( r2 - r, 2 ) +
				Math.pow( g2 - g, 2 ) +
				Math.pow( b2 - b, 2 )
		);
		if ( diff < lowestDiff ) {
			lowestDiff = diff;
			matchedColor = value;
		}
	} );

	return matchedColor;
}
