import Page from 'elementor-app/layout/page';

export default function Layout( props ) {
	const config = {
			title: 'UI',
			headerButtons: props.headerButtons,
			content: props.children,
		};

	return (
		<Page { ...config } />
	);
}

Layout.propTypes = {
	headerButtons: PropTypes.arrayOf( PropTypes.object ),
	children: PropTypes.object.isRequired,
};

Layout.defaultProps = {
	headerButtons: [],
};
