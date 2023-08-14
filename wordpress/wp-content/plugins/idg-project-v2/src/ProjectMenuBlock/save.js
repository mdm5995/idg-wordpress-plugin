import { useBlockProps } from '@wordpress/block-editor'
import Learn from './components/Learn';
import View from './components/View';
import Explore from './components/Explore';

const Save = ({attributes}) => {
	const { hasLearn, hasView, hasExplore } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<nav className='idg-project-menu'>
				{hasLearn && <Learn />}
				{hasView && <View />}
				{hasExplore && <Explore />}
			</nav>
		</div>
	);
};

export default Save;
