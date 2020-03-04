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
			'h1',
			[
				'label' => __( 'H1 Content', 'elementor' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'placeholder' => __( 'Type in H1 Content', 'elementor' ),
			]
		);

		$this->add_control(
			'h1-color',
			[
				'label' => __( 'H1 Color', 'elementor' ),
				'type' => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'p',
			[
				'label' => __( 'P Content', 'elementor' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'placeholder' => __( 'Type in P Content', 'elementor' ),
			]
		);

		$this->add_control(
			'p-color',
			[
				'label' => __( 'P Color', 'elementor' ),
				'type' => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'more_options',
			[
				'label' => __( 'Additional Options', 'elementor' ),
				'type' => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'important_note',
			[
				'label' => __( 'Important Note', 'plugin-name' ),
				'type' => \Elementor\Controls_Manager::RAW_HTML,
				'raw' => __( 'A very important message to show in the panel.', 'plugin-name' ),
				'content_classes' => 'your-class',
			]
		);

		$this->add_control(
			'delete_content',
			[
				'label' => __( 'Delete Content', 'elementor' ),
				'type' => \Elementor\Controls_Manager::BUTTON,
				'separator' => 'before',
				'button_type' => 'success',
				'text' => __( 'Delete', 'elementor' ),
				'event' => 'namespace:editor:delete',
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
		?>
		<div class="test-widget">
			<h1 class="test-h1" style="color: <?php echo $settings['h1-color']; ?>"><?php echo $settings['h1']; ?></h1>
			<p class="test-p" style="color: <?php echo $settings['p-color']; ?>"><?php echo $settings['p']; ?></p>
		</div>
		<?php
	}

	protected function content_template() {
		?>
		<#
			console.log('RENDER: content_template');
		#>
		<div class="test-widget editor">
			<h1 class="test-h1" style="color: {{ settings['h1-color'] }}">{{ settings.h1 }}</h1>
			<p class="test-p" style="color: {{ settings['p-color'] }}">{{ settings.p }}</p>
		</div>
		<?php
	}

}
