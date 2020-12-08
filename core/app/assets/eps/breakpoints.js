import breakpoints from './maps/breakpoints/breakpoints.js';

export default class Breakpoints {
	static get( key ) {
		return breakpoints[ key ];
	}

	static getAll() {
		return breakpoints;
	}
}
