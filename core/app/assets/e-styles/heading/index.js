import { themeColors } from 'e-styles';

export default {
	default: {
		shared: `
			font-size: 20px;
			color: var(--color, red);
		`,
		variants: {
			h1: `
				--color: ${ themeColors( 'primary' ) };
			`,
			h2: `
				color: ${ themeColors( 'cta' ) };

				@media screen and (max-width: 960px) {
					color: ${ themeColors( 'danger' ) };
				}
			`,
		},
	},
	dark: {
		shared: `
			font-size: 40px;
		`,
		variants: {
			h1: `
				color: ${ themeColors( 'info' ) };
			`,
		},
	},
};
