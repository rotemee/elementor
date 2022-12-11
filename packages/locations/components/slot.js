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

export const Slot = ( { name } ) => {
	const components = useLocation( name );

	return components.map( ( componentConfig, index ) => (
		<Suspense key={ index } fallback={ null }>
			<System system={ componentConfig } />
		</Suspense>
	) );
};
