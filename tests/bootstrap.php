<?php

use Elementor\Autoloader;

$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

define( 'ELEMENTOR_TESTS', true );

/**
 * change PLUGIN_FILE env in phpunit.xml
 */
define( 'PLUGIN_FILE', getenv( 'PLUGIN_FILE' ) );
define( 'PLUGIN_FOLDER', basename( dirname( __DIR__ ) ) );
define( 'PLUGIN_PATH', PLUGIN_FOLDER . '/' . PLUGIN_FILE );

// Activates this plugin in WordPress so it can be tested.
$GLOBALS['wp_tests_options'] = [
	'active_plugins' => [ PLUGIN_PATH ],
	'template' => 'twentynineteen',
	'stylesheet' => 'twentynineteen',
];

require_once $_tests_dir . '/includes/functions.php';

tests_add_filter( 'muplugins_loaded', function () {
	// Manually load plugin
	require dirname( __DIR__ ) . '/' . PLUGIN_FILE;
} );

// Removes all sql tables on shutdown
// Do this action last
tests_add_filter( 'shutdown', 'drop_tables', 999999 );

require $_tests_dir . '/includes/bootstrap.php';
require __DIR__ . '/phpunit/traits/base-elementor.php';
require __DIR__ . '/phpunit/traits/extra-assertions.php';
require __DIR__ . '/phpunit/base-class.php';
require __DIR__ . '/phpunit/trait-test-upgrades.php';
require __DIR__ . '/phpunit/ajax-class.php';
require __DIR__ . '/phpunit/factories/factory.php';
require __DIR__ . '/phpunit/factories/documents.php';

require_once dirname( __DIR__ ) . '/includes/autoloader.php';

Autoloader::run();

remove_action( 'admin_init', '_maybe_update_themes' );
remove_action( 'admin_init', '_maybe_update_core' );
remove_action( 'admin_init', '_maybe_update_plugins' );

// Make sure the main class is running
\Elementor\Plugin::instance();

// Run fake actions
do_action( 'init' );
do_action( 'plugins_loaded' );

\Elementor\Plugin::$instance->init_common();
