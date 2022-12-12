import elementorLocations from '@elementor/locations';

// ElementorLocations.register( 'editor/top-bar', {
//	remote: 'notes',
//	url: elementorAppConfig.packages_url + 'notes/dist/remoteEntry.js',
//	module: './Notes',
// } );

elementorLocations.register( 'editor/top-bar/title', {
	title: 'New title from notes!',
} );
