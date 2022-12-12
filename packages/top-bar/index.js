import elementorLocations from '@elementor/locations';

elementorLocations.register( 'editor/top', {
	remote: 'topBar',
	url: elementorAppConfig.packages_url + 'top-bar/dist/remoteEntry.js',
	module: './TopBar',
} );

export const registerMenuItem = ( { title, link } ) => {
	elementorLocations.register( 'editor/top-bar/menu-items', { title, link } );
};
