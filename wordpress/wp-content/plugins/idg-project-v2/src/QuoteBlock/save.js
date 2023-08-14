import { useBlockProps } from '@wordpress/block-editor'

const Save = ({attributes}) => {

	return (
		<div {...useBlockProps.save()}>
		</div>
	);
};

export default Save;
