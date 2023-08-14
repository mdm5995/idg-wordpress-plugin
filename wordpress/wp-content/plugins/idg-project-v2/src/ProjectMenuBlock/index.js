import { registerBlockType } from '@wordpress/blocks';
import editProjectMenuBlock from './edit.js'
import saveProjectMenuBlock from './save.js'
import './style.css';
// import './editor-style.css';

// IDG Project Page Menu Block
console.log('about to register project menu!');
registerBlockType(
	'idg/project-menu-block',
	{
		edit: editProjectMenuBlock,
		save: saveProjectMenuBlock
	},
);
