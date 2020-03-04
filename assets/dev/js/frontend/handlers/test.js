class Test extends elementorModules.frontend.handlers.Base {
	getDefaultSettings() {
		return {
			selectors: {
				h1: '.test-h1',
			},
		};
	}

	getDefaultElements() {
		const selectors = this.getSettings( 'selectors' );
		console.log( 'h1', selectors.h1 );
		return {
			$h1: this.$element.find( selectors.h1 ),
		};
	}

	bindEvents() {
		this.elements.$h1.on( 'click', () => this.onClick() );
	}

	onClick() {
		alert( 'click' );
	}

	onInit() {
		super.onInit();

		this.elements.$h1.css('opacity', '0.5');

		console.log( 'init - elementorFrontend: ', elementorFrontend );
	}
}

export default ( $scope ) => {
	elementorFrontend.elementsHandler.addHandler( Test, {
		$element: $scope,
	} );
};
