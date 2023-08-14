import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	CheckboxControl
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import Learn from './components/Learn';
import View from './components/View';
import Explore from './components/Explore';


const Edit = ({attributes, setAttributes}) => {
	const blockProps = useBlockProps();
	const { hasLearn, hasView, hasExplore } = attributes;
	const [useLearn, setUseLearn] = useState(hasLearn);
	const [useView, setUseView] = useState(hasView);
	const [useExplore, setUseExplore] = useState(hasExplore);

	useEffect(() => {
		setAttributes({hasLearn: useLearn});
	}, [useLearn]);

	useEffect(() => {
		setAttributes({hasExplore: useExplore});
	}, [useExplore]);

	useEffect(() => {
		setAttributes({hasView: useView});
	}, [useView]);

	return (
		<>
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title="Embed Settings" initialOpen={true}>
						<PanelRow>
							<CheckboxControl
								label="Show Learn"
								checked={useLearn}
								onChange={(isChecked) => setUseLearn(isChecked)}
								value={useLearn}
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label="Show View"
								checked={useView}
								onChange={(isChecked) => setUseView(isChecked)}
								value={useView}
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label="Show Explore"
								checked={useExplore}
								onChange={(isChecked) => setUseExplore(isChecked)}
								value={useExplore}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<nav className='idg-project-menu'>
					{hasLearn && <Learn />}
					{hasView && <View />}
					{hasExplore && <Explore />}
				</nav>
			</div>
		</>
	);
};

export default Edit;
