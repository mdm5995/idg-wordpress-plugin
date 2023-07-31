import { createRoot } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import ProjectsArchive from './ProjectsArchive.js';
import editMatterportBlock from '../Blocks/MatterportBlock/edit.js'
import saveMatterportBlock from '../Blocks/MatterportBlock/save.js'
import editGalleryBlock from '../Blocks/GalleryBlock/edit.js'
import saveGalleryBlock from '../Blocks/GalleryBlock/save.js'

const projectsDomNode = document.getElementById('projects-page-container');

if (projectsDomNode) {
	createRoot(projectsDomNode).render(<ProjectsArchive />);
};


// IDG Matterport Block
console.log('about to register matterport!');
registerBlockType(
	'idg/matterport-block',
	{
		edit: editMatterportBlock,
		save: saveMatterportBlock
	},
);

// IDG Gallery Block
console.log('about to register gallery!');
registerBlockType(
	'idg/gallery-block',
	{
		edit: editGalleryBlock,
		save: saveGalleryBlock
	},
);

// hydrating of react gallery will be handled here
