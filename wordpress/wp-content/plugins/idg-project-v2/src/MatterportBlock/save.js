import { useBlockProps } from '@wordpress/block-editor'

const Save = ({attributes}) => {
	return (
		<div {...useBlockProps.save()}>
			<iframe 
				width={attributes.width}
				height={attributes.height}
				src={attributes.matterport_link}
				frameborder="0" 
				allowfullscreen 
				allow="xr-spatial-tracking">
			</iframe>
		</div>
	);
};

export default Save;
