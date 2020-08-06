/**
 * Internal dependencies
 */
import getClosestColor from '../get-closest-color';

test( 'Invalid values should return false.', () => {
	expect( getClosestColor( '' ) ).toBe( false );
	expect( getClosestColor( false ) ).toBe( false );
	expect( getClosestColor( '#' ) ).toBe( false );
	expect( getClosestColor( 'xyz' ) ).toBe( false );
	expect( getClosestColor( 32.3 ) ).toBe( false );
} );

test( 'Custom color lists work.', () => {
	const colors = {
		'red': '#f00',
		'green': '#0f0',
		'blue': '#00f',
	};
	expect( getClosestColor( '#e00', colors ) ).toBe( '#f00' );
	expect( getClosestColor( '#a10', colors ) ).toBe( '#f00' );
	expect( getClosestColor( '#089', colors ) ).toBe( '#00f' );
} );

test( 'Matching values should return the exact color.', () => {
	expect( getClosestColor( '#e8eaeb' ) ).toBe( '#e8eaeb' );
	expect( getClosestColor( '#b02828' ) ).toBe( '#b02828' );
	expect( getClosestColor( '#826eb4' ) ).toBe( '#826eb4' );
	expect( getClosestColor( '#008ec2' ) ).toBe( '#008ec2' );
} );

test( 'Hex values match with or without the #.', () => {
	expect( getClosestColor( '#e8eaeb' ) ).toBe( '#e8eaeb' );
	expect( getClosestColor( 'e8eaeb' ) ).toBe( '#e8eaeb' );
} );

test( 'Nearby values should return the correct color.', () => {
	expect( getClosestColor( '#103369' ) ).toBe( '#4e426c' );
	expect( getClosestColor( '#97d936' ) ).toBe( '#90d296' );
	expect( getClosestColor( '#9995cb' ) ).toBe( '#9b8bc3' );
	expect( getClosestColor( '#511a29' ) ).toBe( '#23282d' );
} );

test( 'RGB values work.', () => {
	expect( getClosestColor( 'rgb(218, 242, 252)' ) ).toBe( '#e6f6fb' );
	expect( getClosestColor( 'rgb(54, 240, 251)' ) ).toBe( '#33b3db' );
} );

test( 'RGBA values work.', () => {
	expect( getClosestColor( 'rgba( 219, 86, 121, 1 )' ) ).toBe( '#e35b5b' );
	expect( getClosestColor( 'rgba( 21, 21, 11, 0.6 )' ) ).toBe( '#191e23' );
} );
