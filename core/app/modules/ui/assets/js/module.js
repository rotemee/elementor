import router from '@elementor/router';

import Default from './pages/default.js';

export default class Ui {
	routes = [
		{
			path: '/ui',
			component: Default,
		},
	];

	constructor() {
		for ( const route of this.routes ) {
			router.addRoute( route );
		}
	}
}
