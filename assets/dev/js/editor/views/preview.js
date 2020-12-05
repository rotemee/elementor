import AddSectionView from './add-section/independent';
import RightClickIntroductionBehavior from '../elements/views/behaviors/right-click-introduction';
import DocumentHelper from 'elementor-document/helper';

const BaseSectionsContainerView = require( 'elementor-views/base-sections-container' );

const Preview = BaseSectionsContainerView.extend( {
	initialize: function() {
		this.$childViewContainer = jQuery( '<div>', { class: 'elementor-section-wrap' } );

		BaseSectionsContainerView.prototype.initialize.apply( this, arguments );
	},

	getChildViewContainer: function() {
		return this.$childViewContainer;
	},

	behaviors: function() {
		var parentBehaviors = BaseSectionsContainerView.prototype.behaviors.apply( this, arguments ),
			behaviors = {
				contextMenu: {
					behaviorClass: require( 'elementor-behaviors/context-menu' ),
					groups: this.getContextMenuGroups(),
				},
			};

		// TODO: the `2` check is for BC reasons
		if ( ! elementor.config.user.introduction.rightClick && ! elementor.config.user.introduction[ 2 ] ) {
			behaviors.introduction = {
				behaviorClass: RightClickIntroductionBehavior,
			};
		}

		return jQuery.extend( parentBehaviors, behaviors );
	},

	getContainer() {
		return elementor.settings.page.getEditedView().getContainer();
	},

	getContextMenuGroups: function() {
		var hasContent = function() {
			return elementor.elements.length > 0;
		};

		return [
			{
				name: 'paste',
				actions: [
					{
						name: 'paste',
						title: elementor.translate( 'paste' ),
						isEnabled: () => DocumentHelper.isPasteEnabled( this.getContainer() ),
						callback: ( at ) => $e.run( 'document/ui/paste', {
							container: this.getContainer(),
							options: {
								at,
								rebuild: true,
							},
						} ),
					},
				],
			}, {
				name: 'content',
				actions: [
					{
						name: 'copy_all_content',
						title: elementor.translate( 'copy_all_content' ),
						isEnabled: hasContent,
						callback: () => $e.run( 'document/elements/copy-all' ),
					}, {
						name: 'delete_all_content',
						title: elementor.translate( 'delete_all_content' ),
						isEnabled: hasContent,
						callback: () => $e.run( 'document/elements/empty' ),
					},
				],
			},
		];
	},

	onRender: function() {
		let $contentContainer;

		if ( elementor.config.legacyMode.elementWrappers ) {
			const $inner = jQuery( '<div>', { class: 'elementor-inner' } );

			this.$el.html( $inner );

			$contentContainer = $inner;
		} else {
			$contentContainer = this.$el;
		}

		$contentContainer.html( this.$childViewContainer );

		if ( elementor.userCan( 'design' ) ) {
			const addNewSectionView = new AddSectionView();

			addNewSectionView.render();

			$contentContainer.append( addNewSectionView.$el );
		}
	},
} );

module.exports = Preview;
