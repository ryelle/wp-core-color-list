import allColors from './utils/colors.json';
import colors from './core-colors.json';
import getClosestColor from './utils/get-closest-color';

import './style.css';

const colorMap = {};

colors.forEach( ( color ) => {
	const mappedColor = getClosestColor( color );
	if ( colorMap.hasOwnProperty( mappedColor ) ) {
		colorMap[ mappedColor ].push( color );
		return;
	}
	colorMap[ mappedColor ] = [ color ];
} );

function getColorTitle( color ) {
	const allColorsEntries = Object.entries( allColors );
	const [ name ] = allColorsEntries.find(
		( [ name, value ] ) => color === value
	);
	return name;
}

const nodes = [];
Object.values( allColors ).forEach( ( coreColor ) => {
	if ( ! colorMap.hasOwnProperty( coreColor ) ) {
		return;
	}
	const title = document.createElement( 'h2' );
	title.innerHTML = getColorTitle( coreColor )
		.replace( /-/g, ' ' )
		.replace( 'wp', 'WP' );
	nodes.push( title );

	const node = document.createElement( 'div' );
	node.className = 'color-row';

	const chip = document.createElement( 'span' );
	chip.className = 'color-chip color-title';
	chip.innerHTML = coreColor;
	chip.style.cssText = `background-color: ${ coreColor }`;

	const group = document.createElement( 'div' );
	colorMap[ coreColor ].forEach( ( color ) => {
		const item = document.createElement( 'span' );
		item.className = 'color-chip';
		item.style.cssText = `background-color: ${ color }`;
		item.setAttribute( 'aria-label', color );

		group.appendChild( item );
	} );

	node.appendChild( chip );
	node.appendChild( group );

	nodes.push( node );
} );

const container = document.getElementById( 'container' );
nodes.forEach( ( n ) => container.appendChild( n ) );
