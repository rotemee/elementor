<?php
namespace Elementor;

use Elementor\Modules\DynamicTags\Module as TagsModule;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor video widget.
 *
 * Elementor widget that displays a video player.
 *
 * @since 1.0.0
 */
class Widget_Test extends Widget_Base {

	public function get_name() {
		return 'test';
	}

	public function get_title() {
		return __( 'Test', 'elementor' );
	}

	public function get_icon() {
		return 'fa fa-code';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function _register_controls() {
		$this->start_controls_section(
			'section_test',
			[
				'label' => __( 'Test', 'elementor' ),
			]
		);

		$this->add_control(
			'url',
			[
				'label' => __( 'URL to embed', 'elementor' ),
				'type' => Controls_Manager::TEXT,
				'input_type' => 'url',
				'placeholder' => __( 'https://your-link.com', 'elementor' ),
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render test widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();

		$html = wp_oembed_get( $settings['url'] );

		echo '<div class="oembed-elementor-widget">';

		echo ( $html ) ? $html : $settings['url'];

		echo '</div>';
	}

}
