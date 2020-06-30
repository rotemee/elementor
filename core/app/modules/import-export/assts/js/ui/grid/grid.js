import './grid.scss';

export default function Grid( props ) {
	const baseClassName = 'import-export-grid';
	let classes = [ baseClassName, props.className ],
		layoutModifiers = [];

	if ( props.container ) {
		classes.push( baseClassName + '-container' );
	}

	if ( props.item ) {
		classes.push( baseClassName + '-item' );
	}

	if ( [ 'row', 'column' ].includes( props.direction ) ) {
		layoutModifiers.push( 'direction-' + props.direction );
	}

	if ( [ 'start', 'center', 'end' ].includes( props.alignItems ) ) {
		layoutModifiers.push( 'align-items-' + props.alignItems );
	}

	if ( [ 'start', 'center', 'end', 'space-between' ].includes( props.justify ) ) {
		layoutModifiers.push( 'justify-' + props.justify );
	}

	layoutModifiers = layoutModifiers.map( ( modifier ) => baseClassName + '--' + modifier );
	classes = classes.concat( layoutModifiers );

	return (
		<div className={ classes.filter( ( classItem ) => '' !== classItem ).join( ' ' ) }>
			{ props.children }
		</div>
	);
}

Grid.propTypes = {
	className: PropTypes.string,
	container: PropTypes.any,
	item: PropTypes.any,
	direction: PropTypes.string,
	justify: PropTypes.string,
	alignItems: PropTypes.string,
	children: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ).isRequired,
};

Grid.defaultProps = {
	className: '',
};
