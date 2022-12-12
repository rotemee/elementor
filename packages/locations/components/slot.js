import React, { Suspense } from 'react';
import { useLocation } from '../hooks/useLocation';
import { loadComponent } from '../utils/loadComponent';

function System( props ) {
	const { system, system: { remote, url, module } } = props;

	if ( ! system || ! remote || ! url || ! module ) {
		return null;
	}

	const Component = React.lazy( loadComponent( remote, 'default', module, url ) );

	return <Component />;
}

// eslint-disable-next-line react/prop-types
export const Slot = ( { name, component } ) => {
	const components = useLocation( name );

	if ( component ) {
		return components.map( ( config, index ) => (
			<React.Fragment key={ index }>{ component( config ) }</React.Fragment>
		) );
	}

	return (
		<Suspense fallback={ null }>
			{ components.map( ( componentConfig, index ) => <System key={ index } system={ componentConfig } /> ) }
		</Suspense>
	);
};
