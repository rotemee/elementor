<?php
namespace Elementor\Modules\Ai\Connect;

use Elementor\Core\Common\Modules\Connect\Apps\Library;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Ai extends Library {
	const API_URL = 'https://my.elementor.com/api/v2/ai/';

	const STYLE_PRESET = 'style_preset';
	const IMAGE_TYPE = 'image_type';
	const IMAGE_STRENGTH = 'image_strength';
	const ASPECT_RATIO = 'ratio';
	const PROMPT = 'prompt';

	public function get_title() {
		return esc_html__( 'AI', 'elementor' );
	}

	protected function get_api_url() {
		return static::API_URL . '/';
	}

	public function get_usage() {
		return $this->ai_request(
			'POST',
			'status/check',
			[
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	private function ai_request( $method, $endpoint, $body ) {
		return $this->http_request(
			$method,
			$endpoint,
			[
				'timeout' => 25,
				'headers' => [
					'x-elementor-ai-version' => '2',
				],
				'body' => $body,
			],
			[
				'return_type' => static::HTTP_RETURN_TYPE_ARRAY,
			]
		);
	}

	public function set_get_started() {
		return $this->ai_request(
			'POST',
			'status/get-started',
			[
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	public function set_status_feedback( $response_id ) {
		return $this->ai_request(
			'POST',
			'status/feedback/' . $response_id,
			[
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	public function get_completion_text( $prompt ) {
		return $this->ai_request(
			'POST',
			'text/completion',
			[
				'prompt' => $prompt,
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	public function get_edit_text( $input, $instruction ) {
		return $this->ai_request(
			'POST',
			'text/edit',
			[
				'input' => $input,
				'instruction' => $instruction,
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	public function get_custom_code( $prompt, $language ) {
		return $this->ai_request(
			'POST',
			'text/custom-code',
			[
				'prompt' => $prompt,
				'language' => $language,
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	public function get_custom_css( $prompt, $html_markup, $element_id ) {
		return $this->ai_request(
			'POST',
			'text/custom-css',
			[
				'prompt' => $prompt,
				'html_markup' => $html_markup,
				'element_id' => $element_id,
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	public function get_text_to_image( $prompt, $prompt_settings ) {
		return $this->ai_request(
			'POST',
			'image/text-to-image',
			[
				self::PROMPT => $prompt,
				self::IMAGE_TYPE => $prompt_settings[ self::IMAGE_TYPE ] . '/' . $prompt_settings[ self::STYLE_PRESET ],
				self::ASPECT_RATIO => $prompt_settings[ self::ASPECT_RATIO ],
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			]
		);
	}

	/**
	 * get_image_to_image
	 * @param $image_data
	 *
	 * @return mixed|\WP_Error
	 * @throws \Exception
	 */
	public function get_image_to_image( $image_data ) {
		$image_file = get_attached_file( $image_data['attachment_id'] );

		if ( ! $image_file ) {
			throw new \Exception( 'Image file not found' );
		}

		$result = $this->ai_request(
			'POST',
			'image/image-to-image',
			[
				self::PROMPT => $image_data[ self::PROMPT ],
				self::IMAGE_TYPE => $image_data['promptSettings'][ self::IMAGE_TYPE ] . '/' . $image_data['promptSettings'][ self::STYLE_PRESET ],
				self::IMAGE_STRENGTH => $image_data['promptSettings'][ self::IMAGE_STRENGTH ],
				self::ASPECT_RATIO => $image_data['promptSettings'][ self::ASPECT_RATIO ],
				'api_version' => ELEMENTOR_VERSION,
				'site_lang' => get_bloginfo( 'language' ),
			],
			$image_file,
			'image'
		);

		return $result;
	}

	protected function init() {}
}
