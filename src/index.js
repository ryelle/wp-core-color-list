/**
 * External dependencies
 */
import { mostReadable } from 'tinycolor2';

/**
 * Internal dependencies
 */
import { newBrandColors as colorList, coreColors } from './colors';
import { getClosestColor, getColorTitle } from './utils';

// Styles
import './style.css';

const colorMap = {};
const outliers = [];
coreColors.forEach( ( color ) => {
	const [ mappedColor, diff ] = getClosestColor( color, colorList, true );
	if ( diff > 25 ) {
		outliers.push( color );
	} else {
		if ( colorMap.hasOwnProperty( mappedColor ) ) {
			colorMap[ mappedColor ].push( color );
			return;
		}
		colorMap[ mappedColor ] = [ color ];
	}
} );

function getColorRowNode( coreColor, matches ) {
	const node = document.createElement( 'div' );
	node.className = 'color-row';

	const chip = document.createElement( 'span' );
	chip.className = 'color-chip color-title';
	chip.innerHTML = coreColor;
	const textColor = mostReadable( coreColor, [
		'white',
		'black',
	] ).toHexString();
	chip.style.cssText = `background-color: ${ coreColor }; color: ${ textColor }`;

	const group = document.createElement( 'div' );
	matches.forEach( ( color ) => {
		const item = document.createElement( 'span' );
		item.className = 'color-chip';
		item.style.cssText = `background-color: ${ color }`;
		item.setAttribute( 'aria-label', color );

		group.appendChild( item );
	} );

	node.appendChild( chip );
	node.appendChild( group );
	return node;
}

const nodes = [];
Object.values( colorList ).forEach( ( coreColor ) => {
	if ( ! colorMap.hasOwnProperty( coreColor ) ) {
		return;
	}
	const title = document.createElement( 'h2' );
	title.innerHTML = getColorTitle( coreColor, colorList );
	nodes.push( title );

	const node = getColorRowNode( coreColor, colorMap[ coreColor ] );

	nodes.push( node );
} );

if ( outliers.length ) {
	const title = document.createElement( 'h2' );
	title.innerHTML = 'Unmatched Colors';
	nodes.push( title );

	const group = document.createElement( 'div' );
	outliers.forEach( ( color ) => {
		const item = document.createElement( 'span' );
		item.className = 'color-chip';
		const textColor = mostReadable( color, [
			'white',
			'black',
		] ).toHexString();
		item.style.cssText = `background-color: ${ color }; color: ${ textColor }`;
		item.innerHTML = color;

		group.appendChild( item );
	} );

	nodes.push( group );
}

const container = document.getElementById( 'container' );
nodes.forEach( ( n ) => container.appendChild( n ) );
