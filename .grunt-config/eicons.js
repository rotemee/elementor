const path = require( 'path' );
const fs = require( 'fs' );
const write = require('write');

class Eicons {
	constructor() {
		// Icons list that are being used in the frontend and can be imported as an HTML node element.
		this.frontendAvailableIcons = [
			'loading',
			'close',
			'share-arrow',
			'frame-expand',
			'frame-minimize',
			'zoom-in-bold',
			'zoom-out-bold',
		];
	}

	createFrontendIconsFile() {
		const svgIconsJsonPath = path.resolve( __dirname, '../assets/lib/eicons/eicons.json' );

		if ( fs.existsSync( svgIconsJsonPath ) ) {
			const svgIconsData = JSON.parse( fs.readFileSync( svgIconsJsonPath ) );

			let svgIconsJSContent = '// This file is automatically generated, please don\'t change anything in this file.\n\n';

			svgIconsJSContent += this.getCreateSvgElementJSContent();

			this.frontendAvailableIcons.forEach( ( iconName, index ) => {
				svgIconsJSContent += '\n\n' + this.getIconJSContent( iconName, svgIconsData[ iconName ] );
			} );

			svgIconsJSContent += '\n';

			const svgIconsJSDestination = path.resolve( __dirname, '../assets/dev/js/frontend/utils/icons/eicons.js' );

			write.sync( svgIconsJSDestination, svgIconsJSContent );
		}
	}

	getCreateSvgElementJSContent() {
		return `const createSvgElement = ( { path, width, height } ) => {
	const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );

	svg.innerHTML = '<path d="' + path + '"></path>';

	svg.setAttributeNS( null, 'viewBox', '0 0 ' + width + ' ' + height );
	svg.setAttributeNS( null, 'class', 'e-font-icon-svg' );

	return svg;
};`;
	}

	getIconJSContent( iconName, svgData ) {
		const { path, width, height } = svgData,
			svgDataContent = `{
			path: '${ path }',
			width: ${ width },
			height: ${ height },
		}`;

		return `export const ${ this.dashCaseToCamelCase( iconName ) } = {
	get element() {
		const svgData = ${ svgDataContent };

		return createSvgElement( svgData );
	},
};`
	}

	dashCaseToCamelCase( string ) {
		return string.replace( /\b-([a-z])/g, ( _, char ) => char.toUpperCase() );
	}
}

module.exports = Eicons;
