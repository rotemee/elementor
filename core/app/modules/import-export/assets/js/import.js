import ContextProvider from './context/context-provider';
import { LocationProvider, Router } from '@reach/router';
import router from '@elementor/router';

import ImportKit from './pages/import/import-kit/import-kit';
import ImportProcess from './pages/import/import-process/import-process';
import ImportSuccess from './pages/import/import-success/import-success';

export default function Import() {
	return (
		<ContextProvider>
			<LocationProvider history={ router.appHistory }>
				<Router>
					<ImportSuccess path="success" />
					<ImportProcess path="process" />
					<ImportKit default />
				</Router>
			</LocationProvider>
		</ContextProvider>
	);
}
