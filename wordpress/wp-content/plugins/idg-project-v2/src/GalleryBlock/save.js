import { useBlockProps } from '@wordpress/block-editor';
import Gallery from './components/Gallery.js';

const Save = ({ attributes }) => {

	const blockProps = useBlockProps.save();

	const { arrayOfImages } = attributes;

	return (
		<div {...blockProps} className={`${blockProps.className} alignfull`}>
			<Gallery arrayOfImages={arrayOfImages} handleImageClick={null} />
		</div>
	);
};

export default Save;
