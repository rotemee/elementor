<?php
namespace Elementor\Core\App\Modules\Ui;

use Elementor\Core\Base\Module as BaseModule;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Ui Module
 *
 * Responsible for initializing Elementor App functionality
 */
class Module extends BaseModule {
	/**
	 * Get name.
	 *
	 * @access public
	 *
	 * @return string
	 */
	public function get_name() {
		return 'ui';
	}
}
