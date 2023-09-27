/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

//TODO: there should be a way to set the data inside a block.json....it doesn't work for me
//import {metadata} from './block.json';

//import custom icons to use
import icons from '../icons/icons.js'

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
// import innerBlocks from "@wordpress/block-editor/build/components/inner-blocks";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('custom-block/investment', {
	title: __('Investment', 'investment'),
	description: __('An investment', 'investment'),
	icon: icons.investment,
	parent: 'custom-block/investments',
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		title: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'title',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
		},
		business: {
			type: 'string',
			source: 'text',
			selector: '.business-item',
		},
		sector: {
			type: 'string',
			source: 'text',
			selector: '.sector-item',
		},
		years: {
			type: 'string',
			source: 'text',
			selector: '.years-item',
		},
		type: {
			type: 'string',
			source: 'text',
			selector: '.type-item',
		},
		category: {
			type: 'string',
			source: 'text',
			selector: '.category-item',
			default: "private-equity-investments"
		},

	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
});
