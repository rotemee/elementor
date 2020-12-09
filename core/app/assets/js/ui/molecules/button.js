import { Link, LocationProvider } from '@reach/router';
import router from '@elementor/router';
import Icon from 'elementor-app/ui/atoms/icon';

import { withStyles } from '@material-ui/core/styles';
import { default as MuButton } from '@material-ui/core/Button';

import './buttons.scss';

const StyledButton = withStyles( {
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		'&:hover': {
			background: 'yellow',
		},
	},
	label: {
		textTransform: 'capitalize',
	},
} )( MuButton );

export default class Button extends React.Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
		hideText: PropTypes.bool,
		icon: PropTypes.string,
		tooltip: PropTypes.string,
		id: PropTypes.string,
		className: PropTypes.string,
		url: PropTypes.string,
		onClick: PropTypes.func,
		variant: PropTypes.oneOf( [ 'contained', 'outlined', '' ] ),
		color: PropTypes.oneOf( [ 'primary', 'secondary', '', 'link' ] ),
		size: PropTypes.oneOf( [ 'sm', 'md', 'lg' ] ),
		target: PropTypes.string,
	};

	static defaultProps = {
		id: '',
		className: '',
		variant: '',
		target: '_parent',
	};

	getCssId() {
		return this.props.id;
	}

	getClassName() {
		const baseClassName = 'eps-button',
			classes = [ baseClassName, this.props.className ];

		return classes
			.concat( this.getStylePropsClasses( baseClassName ) )
			.filter( ( classItem ) => '' !== classItem )
			.join( ' ' );
	}

	getStylePropsClasses( baseClassName ) {
		const styleProps = [ 'color', 'size', 'variant' ],
			stylePropClasses = [];

		styleProps.forEach( ( styleProp ) => {
			const stylePropValue = this.props[ styleProp ];

			if ( stylePropValue ) {
				stylePropClasses.push( baseClassName + '--' + stylePropValue );
			}
		} );

		return stylePropClasses;
	}

	getIcon() {
		if ( this.props.icon ) {
			const tooltip = this.props.tooltip || this.props.text;
			const icon = <Icon className={ this.props.icon } aria-hidden="true" title={ tooltip } />;
			let screenReaderText = '';

			if ( this.props.hideText ) {
				screenReaderText = <span className="sr-only" >{ tooltip }</span>;
			}

			return (
				<>
					{ icon }
					{ screenReaderText }
				</>
			);
		}
		return '';
	}

	getText() {
		return this.props.hideText ? '' : <span>{ this.props.text }</span>;
	}

	render() {
		const attributes = {},
			id = this.getCssId(),
			className = this.getClassName();

		// Add attributes only if they are not empty.
		if ( id ) {
			attributes.id = id;
		}

		if ( className ) {
			attributes.className = className;
		}

		if ( this.props.onClick ) {
			attributes.onClick = this.props.onClick;
		}

		const buttonContent = (
			<>
				{ this.getIcon() }
				{ this.getText() }
			</>
		);

		if ( this.props.url ) {
			if ( 0 === this.props.url.indexOf( 'http' ) ) {
				let { variant, color } = this.props;

				if ( ! variant ) {
					variant = 'text';
				}

				return (
					<MuButton variant={ variant } color={ color }>
						<a href={ this.props.url } target={ this.props.target }>
							{ buttonContent }
						</a>
					</MuButton>
				);
			}

			// @see https://reach.tech/router/example/active-links.
			attributes.getProps = ( props ) => {
				if ( props.isCurrent ) {
					attributes.className += ' active';
				}

				return {
					className: attributes.className,
				};
			};

			return (
				<LocationProvider history={ router.appHistory }>
					<Link to={ this.props.url } { ...attributes } >
						{ buttonContent }
					</Link>
				</LocationProvider>
			);
		}

		let { variant, color } = this.props;

		if ( ! variant ) {
			variant = 'text';
		}

		return (
			<MuButton { ...attributes } variant={ variant } color={ color }>
				{ buttonContent }
			</MuButton>
		);
	}
}
