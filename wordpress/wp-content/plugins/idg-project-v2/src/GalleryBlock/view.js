//import Gallery from './components/Gallery.js';
//import Lightbox from './components/Lightbox.js';
import GalleryAndLightbox from './components/GalleryAndLightbox.js';
import ReactDOM from 'react-dom';

const hydrateGalleryBlock = () => {
	// here we pull the data in the static html
	// to hopefully get the correct parameters for 
	// the Gallery and Lightbox components
	const galleryImageItemNodes = document.querySelectorAll('.idg-gallery-image-item');
	const galleryImageItemNodesArray = [...galleryImageItemNodes];
	const arrayOfImages = galleryImageItemNodesArray.map((node) => {
		const url = node.lastChild.attributes.src.value;
		const alt = node.lastChild.attributes.alt.value;
		const id = node.lastChild.attributes['data-id'].value;
		const caption = node.firstChild.innerText;

		return {
			src: url,
			alt: alt,
			id: id,
			caption: caption,
		};
	});


	// the root here is the wp-block element
	//
	// TODO: handle multiple roots? (might be out of scope)
	const root = document.querySelector('.wp-block-idg-gallery-block');


	ReactDOM.hydrateRoot(root, <GalleryAndLightbox arrayOfImages={arrayOfImages} />
	);
}
window.addEventListener('DOMContentLoaded', hydrateGalleryBlock);
