import App from './app';
import { Module as SiteEditor } from '@elementor/site-editor';
import Ui from '../../modules/ui/assets/js/module';

new SiteEditor();
new Ui();

const AppWrapper = elementorCommon.config.isDebug ? React.StrictMode : React.Fragment;

ReactDOM.render(
	<AppWrapper>
		<App />
	</AppWrapper>,
  document.getElementById( 'e-app' )
);
