import './text.scss';

export default function Text( props ) {
	const baseClassName = 'import-export-text',
		classes = [
			baseClassName,
			props.className,
		];

	if ( props.size ) {
		classes.push( baseClassName + '--' + props.size );
	}

	return (
		<p className={ classes.filter( ( classItem ) => '' !== classItem ).join( ' ' ) }>
			{ props.children }
		</p>
	);
}

Text.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string.isRequired,
	children: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ).isRequired,
};

Text.defaultProps = {
	className: '',
};
