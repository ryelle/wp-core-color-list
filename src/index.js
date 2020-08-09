/**
 * Internal dependencies
 */
import { newBrandColors as colorList, coreColors } from './colors';
import { getClosestColor, getColorTitle } from './utils';

// Styles
import './style.css';

const colorMap = {};
coreColors.forEach( ( color ) => {
	const mappedColor = getClosestColor( color, colorList );
	if ( colorMap.hasOwnProperty( mappedColor ) ) {
		colorMap[ mappedColor ].push( color );
		return;
	}
	colorMap[ mappedColor ] = [ color ];
} );

const nodes = [];
Object.values( colorList ).forEach( ( coreColor ) => {
	if ( ! colorMap.hasOwnProperty( coreColor ) ) {
		return;
	}
	const title = document.createElement( 'h2' );
	title.innerHTML = getColorTitle( coreColor, colorList );
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
