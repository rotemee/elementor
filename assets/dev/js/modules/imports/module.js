class Module {
	getDefaultSettings() {
		return {};
	}

	getConstructorID() {
		return this.constructor.name;
	}

	ensureClosureMethods() {
		jQuery.each( this, ( methodName ) => {
			const oldMethod = this[ methodName ];

			if ( 'function' !== typeof oldMethod ) {
				return;
			}

			this[ methodName ] = () => {
				return oldMethod.apply( this, arguments );
			};
		} );
	}

	getItems( items, itemKey ) {
		if ( itemKey ) {
			const keyStack = itemKey.split( '.' ),
				currentKey = keyStack.splice( 0, 1 );

			if ( ! keyStack.length ) {
				return items[ currentKey ];
			}

			if ( ! items[ currentKey ] ) {
				return;
			}

			return this.getItems( items[ currentKey ], keyStack.join( '.' ) );
		}

		return items;
	}

	getSettings( setting ) {
		return this.getItems( this.settings, setting );
	}

	setSettings( settingKey, value, settingsContainer ) {
		if ( ! settingsContainer ) {
			settingsContainer = this.settings;
		}

		if ( 'object' === typeof settingKey ) {
			jQuery.extend( settingsContainer, settingKey );

			return self;
		}

		const keyStack = settingKey.split( '.' ),
			currentKey = keyStack.splice( 0, 1 );

		if ( ! keyStack.length ) {
			settingsContainer[ currentKey ] = value;

			return self;
		}

		if ( ! settingsContainer[ currentKey ] ) {
			settingsContainer[ currentKey ] = {};
		}

		return self.setSettings( keyStack.join( '.' ), value, settingsContainer[ currentKey ] );
	}

	getErrorMessagefunction( type, functionName ) {
		let message;

		switch ( type ) {
			case 'forceMethodImplementation':
				message = `The method '${ functionName }' must to be implemented in the inheritor child.`;
				break;
			default:
				message = 'An error occurs';
		}

		return message;
	}

	// TODO: This function should be deleted ?.
	forceMethodImplementation( functionName ) {
		throw new Error( this.getErrorMessage( 'forceMethodImplementation', functionName ) );
	}

	on( eventName, callback ) {
		if ( 'object' === typeof eventName ) {
			jQuery.each( eventName, function( singleEventName ) {
				self.on( singleEventName, this );
			} );

			return self;
		}

		const eventNames = eventName.split( ' ' );

		eventNames.forEach( ( singleEventName ) => {
			if ( ! this.events[ singleEventName ] ) {
				this.events[ singleEventName ] = [];
			}

			this.events[ singleEventName ].push( callback );
		} );

		return self;
	}

	off( eventName, callback ) {
		if ( ! this.events[ eventName ] ) {
			return self;
		}

		if ( ! callback ) {
			delete this.events[ eventName ];

			return self;
		}

		const callbackIndex = this.events[ eventName ].indexOf( callback );

		if ( -1 !== callbackIndex ) {
			delete this.events[ eventName ][ callbackIndex ];

			// Reset array index (for next off on same event).
			this.events[ eventName ] = this.events[ eventName ].filter( ( val ) => val );
		}

		return self;
	}

	trigger( eventName ) {
		const methodName = 'on' + eventName[ 0 ].toUpperCase() + eventName.slice( 1 ),
			params = Array.prototype.slice.call( arguments, 1 );

		if ( self[ methodName ] ) {
			self[ methodName ].apply( self, params );
		}

		const callbacks = this.events[ eventName ];

		if ( ! callbacks ) {
			return self;
		}

		jQuery.each( callbacks, function( index, callback ) {
			callback.apply( self, params );
		} );

		return self;
	}

	onInit() {}

	__construct() {}

	constructor( ...args ) {
		this.__construct( ...args );

		this.ensureClosureMethods();

		const defaultSettings = this.getDefaultSettings();

		this.settings = {
			...defaultSettings,
			...args[ 0 ],
		};

		this.events = {};

		this.onInit( ...args );
	}
}

Module.extend = ( properties ) => {
	const parent = Module;

	const child = function() {
		return parent.apply( parent, arguments );
	};

	jQuery.extend( child, parent );

	child.prototype = Object.create( jQuery.extend( {}, parent.prototype, properties ) );

	child.prototype.constructor = child;

	child.__super__ = parent.prototype;

	return child;
};

export default Module;
