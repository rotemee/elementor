class Test extends elementorModules.frontend.handlers.Base {
	getDefaultSettings() {
		return {
			selectors: {
				h1: '.test-h1',
				p: 'test-p',
			},
		};
	}

	getDefaultElements() {
		const selectors = this.getSettings( 'selectors' );
		return {
			$h1: this.$element.find( selectors.h1 ),
			$p: this.$element.find( selectors.p );
		};
	}

	onInit() {
		super.onInit();

		console.log('Test class - elementorFrontend: ', elementorFrontend);
		/*
		elementorFrontend.waypoint( this.elements.$counterNumber, () => {
			const data = this.elements.$counterNumber.data(),
				decimalDigits = data.toValue.toString().match( /\.(.*)/ );

			if ( decimalDigits ) {
				data.rounding = decimalDigits[ 1 ].length;
			}

			this.elements.$counterNumber.numerator( data );
		} );

		 */
	}
}

export default ( $scope ) => {
	elementorFrontend.elementsHandler.addHandler( Test, {
		$element: $scope,
	} );
};
