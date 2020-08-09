export default function getColorTitle( color, colorList ) {
	const colorListEntries = Object.entries( colorList );
	const [ name ] = colorListEntries.find(
		( [ , value ] ) => color === value
	);
	return name.replace( /-/g, ' ' ).replace( 'wp', 'WP' );
}
