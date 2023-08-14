import { useState, useRef } from 'react';
import useLayoutPrompt from '../hooks/use-layout-prompt';

const PLACEHOLDER_VALUE = {};

const useScreenshots = ( { onGeneration } ) => {
	const [ screenshots, setScreenshots ] = useState( [] );

	const styling = useLayoutPrompt( 'styling', null );
	const wireframe = useLayoutPrompt( 'wireframe', null );
	const mixed = useLayoutPrompt( 'mixed', null );

	const abortController = useRef( null );

	const templatesData = [ styling, wireframe, mixed ];

	const isLoading = styling.isLoading || wireframe.isLoading || mixed.isLoading;

	const error = ( 0 === screenshots.length && ( styling.error || wireframe.error || mixed.error ) ) || '';

	const abort = () => abortController.current.abort();

	const generate = ( prompt ) => {
		setScreenshots( Array( templatesData.length ).fill( PLACEHOLDER_VALUE ) );

		abortController.current = new AbortController();

		templatesData.forEach( async ( { send } ) => {
			send( prompt, abortController.current.signal )
				.then( async ( data ) => {
					const templateData = await onGeneration( data.result );

					setScreenshots( ( prev ) => {
						const updatedData = [ ...prev ];

						const placeholderIndex = updatedData.indexOf( PLACEHOLDER_VALUE );

						updatedData[ placeholderIndex ] = templateData;

						return updatedData;
					} );
				} )
				.catch( () => {
					setScreenshots( ( prev ) => {
						const updatedData = [ ...prev ];

						const placeholderIndex = updatedData.lastIndexOf( PLACEHOLDER_VALUE );

						updatedData.splice( placeholderIndex, 1 );

						return updatedData;
					} );
				} );
		} );
	};

	return {
		generate,
		screenshots,
		isLoading,
		error,
		abort,
	};
};

export default useScreenshots;
