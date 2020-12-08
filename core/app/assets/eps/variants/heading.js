const eps = require( '../index' );
const { dark, ltr, rtl } = eps.selectors;

const style = {
	heading: {
		default: `
			color: blue;
		`,
		h1: `
			--color: ${ eps.themeColors( 'primary' ) };
			color: var(--color);
			--start-spacing: 90px;
		`,
		h2: `
			color: ${ eps.themeColors( 'info' ) };

			@media screen and (max-width: 960px) {
				color: blue;
			}
		`,
	},
	[ dark ]: {
		heading: {
			h1: `
				--color: ${ eps.themeColors( 'info' ) };
			`,
		},
	},
	[ ltr ]: {
		heading: {
			h1: `
				left: var(--start-spacing);
			`,
		},
	},
	[ rtl ]: {
		heading: {
			h1: `
				right: var(--start-spacing);
			`,
		},
	},
};

module.exports = style;
