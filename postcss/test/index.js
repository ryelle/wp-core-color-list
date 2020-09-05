/**
 * External dependencies
 */
import postcss from 'postcss';

/**
 * Internal dependencies
 */
import plugin from '../';

async function run( input, opts = {} ) {
	const result = await postcss( [ plugin( opts ) ] ).process( input, {
		from: undefined,
	} );
	return result.css;
}

describe( 'Color Match PostCSS Plugin', () => {
	const colors = {
		red: '#f00',
		green: '#0f0',
		blue: '#00f',
	};

	it( 'should not replace non-color values', async () => {
		const input = 'p { font-size: 1rem; }';
		const output = await run( input, { colors } );
		expect( output ).toEqual( 'p { font-size: 1rem; }' );
	} );

	it( 'should ignore CSS when `@no-color-match` is used', async () => {
		const input = `/* @no-color-match */\np { font-size: 1rem; }`;
		const output = await run( input, { colors } );
		expect( output ).toEqual(
			`/* @no-color-match */\np { font-size: 1rem; }`
		);
	} );

	it( 'should replace the source css colors with new values', async () => {
		const input = 'p { color: #a11; }';
		const output = await run( input, { colors } );
		expect( output ).toEqual( 'p { color: #f00; }' );
	} );

	it( 'should replace named color values with same values in color list', async () => {
		const input = 'p { color: red; }';
		const output = await run( input, { colors } );
		expect( output ).toEqual( 'p { color: #f00; }' );
	} );

	it( 'should ignore color-like values that are not colors', async () => {
		const input = 'p { background-image: url( logo-red.png ); }';
		const output = await run( input, { colors } );
		expect( output ).toEqual(
			'p { background-image: url( logo-red.png ); }'
		);
	} );
} );
