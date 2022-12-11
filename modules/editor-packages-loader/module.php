<?php
namespace Elementor\Modules\EditorPackagesLoader;

use Elementor\Core\Base\Module as BaseModule;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Module extends BaseModule {

	public function get_name() {
		return 'editor-packages-loader';
	}

	public function __construct() {
		parent::__construct();

		add_filter( 'elementor/editor/v2/loader/scripts/register', function ( array $scripts ) {
			$packages = array_merge(
				$this->get_utils(),
				$this->get_apps()
			);

			foreach ( $packages as $package ) {
				$package_name = $package['name'];
				$deps = $package['deps'] ?? [];

				$scripts[] = [
					'handle' => "elementor-$package_name",
					'src' => ELEMENTOR_URL . "/packages/$package_name/dist/main.js",
					'deps' => $deps,
				];
			}

			return $scripts;
		} );

		add_filter( 'elementor/editor/v2/loader/scripts/dependencies', function ( array $deps ) {
			foreach ( $this->get_apps() as $app ) {
				$app_name = $app['name'];

				$deps[] = "elementor-$app_name";
			}

			return $deps;
		} );
	}

	// TODO: Load automatically.
	// TODO: Pull deps from package.json? Use webpack to generate the php file?
	private function get_utils() {
		return [
			[
				'name' => 'locations',
				'deps' => [ 'react' ],
			],
		];
	}

	private function get_apps() {
		return [
			[
				'name' => 'editor-shell',
				'deps' => [ 'react', 'react-dom', 'elementor-locations' ],
			],
//			[
//				'name' => 'top-bar',
//				'deps' => [ 'react', 'elementor-locations', 'elementor-editor-shell' ],
//			],
		];
	}
}
