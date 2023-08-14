import { registerBlockType } from '@wordpress/blocks';
import editMatterportBlock from './edit.js'
import saveMatterportBlock from './save.js'

// IDG Matterport Block
console.log('about to register matterport!');
registerBlockType(
	'idg/matterport-block',
	{
		edit: editMatterportBlock,
		save: saveMatterportBlock
	},
);
