const Gallery = ({arrayOfImages, handleImageClick}) => {

	const gallery = arrayOfImages.map(
		(image) => {
			return (
				<div class="idg-gallery-image-item" onClick={handleImageClick}>
					<h3>{image.caption}</h3>
					<img key={image.id} src={image.src} alt={image.alt} data-id={image.id} />
				</div>
			);
		}
	);

	return (
		<div class='idg-gallery-container'>
			{gallery}
		</div>
	);
}

export default Gallery;
