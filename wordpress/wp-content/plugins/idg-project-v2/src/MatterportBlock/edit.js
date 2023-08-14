import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow
} from '@wordpress/components';

const Edit = ({attributes, setAttributes}) => {
	
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title="Embed Settings" initialOpen={true}>
					<PanelRow>
						<TextControl
							label="Matterport Link"
							onChange={(matterport_link) => setAttributes({"matterport_link": matterport_link})}
							value={attributes.matterport_link}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Dimension Controls" initialOpen={false}>
					<h3>Default: 1076x900</h3>
					<PanelRow>
						<label htmlFor="width-control">Width</label>
						<input 
							id="width-control" 
							type="number" 
							value={attributes.width} 
							onChange={(event) => setAttributes({"width": event.target.value})}
						/>
					</PanelRow>
					<PanelRow>
						<label htmlFor="height-control">Height</label>
						<input 
							id="height-control" 
							type="number" 
							value={attributes.height} 
							onChange={(event) => setAttributes({"height": event.target.value})}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<iframe 
					width={attributes.width}
					height={attributes.height}
					src={attributes.matterport_link}
					frameborder="0" 
					allowfullscreen="true"
					allow="xr-spatial-tracking">
				</iframe>
			</div>
		</>
	);
};

export default Edit;
