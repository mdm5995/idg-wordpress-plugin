import { createRoot } from '@wordpress/element';
import ProjectsArchive from './ProjectsArchive.js';

const projectsDomNode = document.getElementById('projects-page-container');

if (projectsDomNode) {
	createRoot(projectsDomNode).render(<ProjectsArchive />);
};
