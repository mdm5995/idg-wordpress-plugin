import { registerBlockType } from '@wordpress/blocks';
import editQuoteBlock from './edit.js'
import saveQuoteBlock from './save.js'

// IDG Block quote block
console.log('about to register block quote!');
registerBlockType(
	'idg/quote-block',
	{
		edit: editQuoteBlock,
		save: saveQuoteBlock
	},
);
