import { createRoot, render, createElement } from '@wordpress/element';
import ProjectsArchive from './ProjectsArchive.js';

console.log('script successfully enqueued!');

const projectsDomNode = document.getElementById('projects-page-container');

createRoot(projectsDomNode).render(<ProjectsArchive />);
