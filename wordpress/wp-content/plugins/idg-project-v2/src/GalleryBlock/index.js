import { registerBlockType } from '@wordpress/blocks';
import editGalleryBlock from './edit.js';
import saveGalleryBlock from './save.js';
import './style.css';
import './editor-style.css';

// IDG Gallery Block
console.log('about to register gallery!');
registerBlockType(
	'idg/gallery-block',
	{
		edit: editGalleryBlock,
		save: saveGalleryBlock
	},
);
