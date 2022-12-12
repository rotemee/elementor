( function() {
	// Here should be all the loading logic for the editor v2.
	console.log( 'loaded: editor-loader-v2' );

	window.elementor.start();

	window.elementorEditorPackages.editorShell.then( ( module ) => {
		const { render } = module;

		render( document.getElementById( 'elementor-editor-wrapper-v2' ) );
	} );
} )();
