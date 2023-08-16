/// image parameter is an object of format:
// {
//	src: image.url,
//	alt: image.alt,
//	id: image.id,
//	caption: image.caption,
// }
const Lightbox = ({image, onClose, onNextClick, onPrevClick}) => {

	const handleClose = (event) => {
		if (event.target.classList.contains('dismiss')) {
			onClose();
		}
		return;
	}

	return (
		<div className="overlay dismiss" onClick={handleClose}>
			<span onClick={onClose} className='lightbox close-button dismiss'>x</span>
			<div class='lightbox-container'>
				<figure>
				<img src={image.src} alt={image.alt} />
					<figcaption>
						{image.caption}
					</figcaption>
				</figure>
				<button className='previous-button' onClick={onPrevClick}>previous</button>
				<button className='next-button' onClick={onNextClick}>next</button>
			</div>
		</div>
	)
};

export default Lightbox;
