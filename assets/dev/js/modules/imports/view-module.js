import Module from './module';

export default class ViewModule extends Module {
	getDefaultElements() {
		return {};
	}

	bindEvents() {

	}

	onInit() {
		this.initElements();

		this.bindEvents();
	}

	initElements() {
		this.elements = this.getDefaultElements();
	}
}
