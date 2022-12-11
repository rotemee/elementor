import ReactDOM from 'react-dom';
import { Editor } from './components/editor';

console.log( 'loaded: editor-shell' );

export function render( element ) {
	ReactDOM.render( <Editor />, element );
}

render( document.getElementById( 'elementor-editor-wrapper-v2' ) );
