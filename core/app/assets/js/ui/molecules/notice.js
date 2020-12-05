import Utils from 'elementor-app/utils/utils.js';

import Text from 'elementor-app/ui/atoms/text';

import './notice.scss';

export default function Notice( props ) {
	const baseClassName = 'eps-notice',
		classes = [ baseClassName, props.className ];

	if ( props.color ) {
		classes.push( baseClassName + '--' + props.color );
	}

	return (
		<div className={ Utils.arrayToClassName( classes ) }>
			<Text variant="xs" className="eps-notice__text">
				{ props.children }
			</Text>
		</div>
	);
}

Notice.propTypes = {
	className: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ).isRequired,
};

Notice.defaultProps = {
	className: '',
};
