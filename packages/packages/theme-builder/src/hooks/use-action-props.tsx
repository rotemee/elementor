import { __ } from '@wordpress/i18n';
import ThemeBuilderIcon from '../icons/theme-builder-icon';
import { runCommand } from '@elementor/v1-adapters';

export default function useActionProps() {
	return {
		icon: ThemeBuilderIcon,
		title: __( 'Theme Builder', 'elementor' ),
		onClick: () => runCommand( 'app/open' ),
	};
}
