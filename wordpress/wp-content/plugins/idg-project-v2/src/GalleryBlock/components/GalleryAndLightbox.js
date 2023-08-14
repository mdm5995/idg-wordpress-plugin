import { useState, useEffect } from '@wordpress/element'
import Gallery from './Gallery.js';
import Lightbox from './Lightbox.js';

const GalleryAndLightbox = ({arrayOfImages}) => {
	const [currentLightboxImage, setCurrentLightboxImage] = useState(null);

	const handleImageClick = (event) => {
		const idOfClickedImage = event.currentTarget.lastChild.attributes["data-id"].value;
		const clickedImage = arrayOfImages.find((image) => image.id === idOfClickedImage);
		setCurrentLightboxImage(clickedImage);
	};

	const handleLightboxClose = () => {
		setCurrentLightboxImage(null);
	};

	const handlePrevImage = () => {
		const indexOfCurrentLightboxImage = arrayOfImages
			.findIndex((image) => image.id === currentLightboxImage.id);

		if (indexOfCurrentLightboxImage === 0) {
			// already at the first image, do nothing
			return;
		}

		const indexOfPreviousLightboxImage = indexOfCurrentLightboxImage - 1;
		const prevImage = arrayOfImages[indexOfPreviousLightboxImage];
		setCurrentLightboxImage(prevImage);
		return;
	};

	const handleNextImage = () => {
		const indexOfCurrentLightboxImage = arrayOfImages
			.findIndex((image) => image.id === currentLightboxImage.id);

		if (indexOfCurrentLightboxImage === (arrayOfImages.length - 1)) {
			// already at the last image, do nothing
			return;
		}

		const indexOfNextLightboxImage = indexOfCurrentLightboxImage + 1;
		const nextImage = arrayOfImages[indexOfNextLightboxImage];

		setCurrentLightboxImage(nextImage);
		return;
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
				case 'Escape':
					event.preventDefault();
					handleLightboxClose();
					break;
				case 'ArrowLeft':
					event.preventDefault();
					handlePrevImage();
					break;
				case 'ArrowRight':
					event.preventDefault();
					handleNextImage();
					break;
				default:
					break;
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}

	}, [currentLightboxImage]);

	return (
		<>
			<Gallery arrayOfImages={arrayOfImages} handleImageClick={handleImageClick}/>
			{
			currentLightboxImage &&
			<Lightbox 
					image={currentLightboxImage}
					onClose={handleLightboxClose}
					onPrevClick={handlePrevImage}
					onNextClick={handleNextImage}
			/>
			}
		</>
	);
}

export default GalleryAndLightbox;
