import { useState, useEffect } from '@wordpress/element'
import { 
	MediaPlaceholder,
	useBlockProps, 
	BlockControls, 
	MediaReplaceFlow 
} from '@wordpress/block-editor';
import GalleryAndLightbox from './components/GalleryAndLightbox.js';

const edit = ({ attributes, setAttributes }) => {
	const [arrayOfImages, setArrayOfImages] = useState(attributes.arrayOfImages);
	const blockProps = useBlockProps();
	const arrayOfImageIds = arrayOfImages.map((image) => image.id);

	useEffect(() => {
		setAttributes({ arrayOfImages });
	}, [arrayOfImages]);

	const handleMediaSelection = (images) => {
		const newImages = images.map((image) => {
			return {
				src: image.url,
				alt: image.alt,
				id: image.id,
				caption: image.caption,
			};
		});
		setArrayOfImages(newImages);
	};


	return (
		<>
			<div {...blockProps} className={`${blockProps.className} alignfull`}>
				<BlockControls>
					<MediaReplaceFlow 
						onSelect={handleMediaSelection}
						allowedTypes={['image/*']}
						mediaIds={arrayOfImageIds}
						multiple={true}
						name="Edit Gallery"
					/>
				</BlockControls>
				{
					(arrayOfImages.length === 0) && 
					<MediaPlaceholder 
						onSelect={handleMediaSelection}
						labels={{ title: 'IDG Image Gallery' }}
						accept="image/*" 
						addToGallery={true}
						allowedTypes={["image"]}
						isAppender={true}
						multiple={true}
					/>
				}
				<GalleryAndLightbox arrayOfImages={arrayOfImages} />
			</div>
		</>
	);
};

export default edit;
