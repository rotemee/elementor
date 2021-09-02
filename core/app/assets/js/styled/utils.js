import { css } from 'styled-components';

const bindProp = ( obj ) => {
	const [ key, value ] = Object.entries( obj )[ 0 ];

	return value && css`
			${ key }: ${ value };
		`;
};

export const bindProps = ( data ) => {
	if ( ! Array.isArray( data ) ) {
		data = [ data ];
	}

	return data.map( ( obj ) => bindProp( obj ) );
};

export const getVariant = ( props, style, variant ) => {
	let variantStyle = style.default.shared || '';

	variantStyle += style.default.variants[ variant ] || '';

	for ( const key in props.theme.variants ) {
		// e.g: if dark = true.
		if ( props.theme.variants[ key ] ) {
			const themeVariant = style[ key ];

			// If key exist in the style obj.
			if ( themeVariant ) {
				variantStyle += themeVariant.shared || '';
				variantStyle += themeVariant.variants?.[ variant ] || '';
			}
		}
	}

	return variantStyle;
};
