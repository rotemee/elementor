import App from './app';
import SiteEditor from '../../modules/site-editor/assets/js/module';

new SiteEditor();

const AppWrapper = elementorCommon.config.isDebug ? React.StrictMode : React.Fragment;

ReactDOM.render(
	<AppWrapper>
		<App />
	</AppWrapper>,
  document.getElementById( 'e-app' )
);
