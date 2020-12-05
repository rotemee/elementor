<?php

namespace Elementor\Tests\Phpunit\Elementor\Core\Experiments;

use Elementor\Core\Experiments\Manager as Experiments_Manager;
use Elementor\Testing\Elementor_Test_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Test_Manager extends Elementor_Test_Base {

	public function tearDown() {
		parent::tearDown();

		$experiments = $this->elementor()->experiments;

		$features = $experiments->get_features();

		foreach ( $features as $feature_name => $feature ) {
			$experiments->remove_feature( $feature_name );
		}
	}

	public function test_add_feature() {
		$experiments = $this->elementor()->experiments;

		$test_feature_data = [
			'name' => 'test_feature',
			'default' => Experiments_Manager::STATE_ACTIVE,
			'unaccepted_key' => 'some value',
		];

		$test_set = [
			'description' => '',
			'status' => Experiments_Manager::RELEASE_STATUS_ALPHA,
			'default' => Experiments_Manager::STATE_ACTIVE,
			'name' => 'test_feature',
			'state' => Experiments_Manager::STATE_DEFAULT,
		];

		$new_feature = $experiments->add_feature( $test_feature_data );

		$re_added_feature = $experiments->add_feature( $test_feature_data );

		$this->assertEqualSets( $test_set, $new_feature );

		$this->assertEquals( null, $re_added_feature );
	}

	public function test_get_features() {
		$experiments = $this->elementor()->experiments;

		// Assert that `get_features` is called correctly even before adding any feature
		$experiments->get_features();

		$this->add_test_feature();

		$features = $experiments->get_features();

		$test_feature = $experiments->get_features( 'test_feature' );

		$this->assertArrayHaveKeys( [ 'test_feature' ], $features );

		$this->assertNotEmpty( $test_feature );
	}

	public function test_is_feature_active() {
		$this->add_test_feature();

		$experiments = $this->elementor()->experiments;

		$is_test_feature_active = $experiments->is_feature_active( 'test_feature' );

		$this->assertFalse( $is_test_feature_active );
	}

	public function test_is_feature_active__default_activated() {
		$experiments = $this->elementor()->experiments;

		$default_activated_test_feature_data = [
			'name' => 'default_activated_test_feature',
			'default' => Experiments_Manager::STATE_ACTIVE,
		];

		$experiments->add_feature( $default_activated_test_feature_data );

		$is_default_activated_test_feature_active = $experiments->is_feature_active( 'default_activated_test_feature' );

		$this->assertTrue( $is_default_activated_test_feature_active );
	}

	public function test_is_feature_active__not_exists() {
		$experiments = $this->elementor()->experiments;

		$is_non_exist_active = $experiments->is_feature_active( 'not_exists_feature' );

		$this->assertFalse( $is_non_exist_active );
	}

	public function test_is_feature_active__saved_state() {
		add_option( 'elementor_experiment-test_feature', Experiments_Manager::STATE_ACTIVE );

		$this->add_test_feature();

		$experiments = $this->elementor()->experiments;

		$is_test_feature_active = $experiments->is_feature_active( 'test_feature' );

		$this->assertTrue( $is_test_feature_active );
	}

	public function test_set_feature_default_state() {
		$this->add_test_feature();

		$experiments = $this->elementor()->experiments;

		$experiments->set_feature_default_state( 'test_feature', Experiments_Manager::STATE_ACTIVE );

		$feature = $experiments->get_features( 'test_feature' );

		$this->assertEquals( Experiments_Manager::STATE_ACTIVE, $feature['default'] );
	}

	public function test_remove_feature() {
		$this->add_test_feature();

		$experiments = $this->elementor()->experiments;

		$experiments->remove_feature( 'test_feature' );

		$feature = $experiments->get_features( 'test_feature' );

		$this->assertNull( $feature );
	}

	private function add_test_feature() {
		$experiments = $this->elementor()->experiments;

		$test_feature_data = [
			'name' => 'test_feature',
		];

		$experiments->add_feature( $test_feature_data );
	}
}
