import { useState, useEffect } from '@wordpress/element';

const ActiveProject = ({projects, projectId}) => {
	console.log(projects);
	const selectedProject = projects.find((project) => {
		return project.id === parseInt(projectId);
	});
	console.log(selectedProject);
	if (selectedProject) {
		return (
			<container id='active-project' className={selectedProject.category}>
				<section id='active-project-content'>
					<img className='active-project-image' src={selectedProject.thumbnail} />
					<section id='active-project-description' dangerouslySetInnerHTML={selectedProject.content}></section>
				</section>
			</container>
		);
	};
	return null;
};

export default function ProjectsArchive() {
	const Categories = {
		'k12': 'K-12',
		'collegiate': 'Collegiate',
		'cultural-faith': 'Cultural/Faith',
		'civic': 'Civic',
		'commercial': 'Commercial',
	};

	const [projects, setProjects] = useState([]);
	const [category, setCategory] = useState('all');
	const [activeProjectId, setActiveProjectId] = useState(null);

	const handleCategoryChange = (event) => {
		const newCategory = event.target.value;
		const newCategoryButton = document.getElementById(newCategory);

		if (category === 'all') {
			newCategoryButton.classList.add('active');
			setCategory(newCategory);
			return;
		}

		const oldCategoryButton = document.getElementById(category);
		if (category === event.target.value) {
			oldCategoryButton.classList.remove('active');
			setCategory('all');
			return;
		}

		if (category !== event.target.value) {
			oldCategoryButton.classList.remove('active');
			newCategoryButton.classList.add('active');
			setCategory(newCategory);
			return;
		}
	};

	const categoriesList = Object.keys(Categories).map((key) => {
		return (
			<button key={key} value={key} id={key} onClick={handleCategoryChange}>
				{Categories[key]}
			</button>
		);
	});


	const getProjectsData = () => {
		const projectsArray = fetch('https://localhost/wp-json/wp/v2/projects?_embed')
			.then((response) => response.json())
			.then((json) => {
				const projectsArray = json.map((project) => {
					const projectObject = {
						id: project.id,
						title: project.title.rendered,
						content: {__html: project.content.rendered},
						excerpt: {__html: project.excerpt.rendered},
						link: project.link,
						thumbnail: project['_embedded']['wp:featuredmedia'][0].source_url,
						category: project['_embedded']['wp:term'][0][0].slug
					};
					return projectObject;
				});
				return projectsArray;
			}).catch((e) => console.error('error!' + e));
		return projectsArray;
	};

	// handles API call for getting projects data
	useEffect(() => {
		let ignore = false;
		setProjects([]);
		setActiveProjectId(null);
		getProjectsData()
		.then((projectsArray) => {
			if (!ignore) {
				setProjects(projectsArray.filter((project) => {
					if (category === 'all') {
						return true;
					}
					if (category === project.category) {
						return true;
					}
					return false;
				}));
			};
		});
		return () => {
			ignore = true;
		};
	}, [category]);

	const handleProjectClick = (event) => {
		// this function needs to:
		// setActiveProjectId(this project);
		// hide this figure ( or animate it away or similar );
		// that might be it. Handle creating DOM elements inside 
		// setActiveProjectId or a useEffect hook with activeProjectId as dep

		// clear prev hidden figures, if any
		const hiddenFigure = document.querySelector('figure.hidden');
		if (hiddenFigure !== null) {
			hiddenFigure.classList.remove('hidden');
		};

		const figureElement = event.currentTarget;

		// assigns int: project.id 
		const selectedProjectId = figureElement.getAttribute('projectId');
		figureElement.classList.add('hidden');
		setActiveProjectId(selectedProjectId);
		return;
	};

	const projectsList = projects.map((project) => {
			return (
			<figure projectId={project.id} onClick={handleProjectClick} className={`project-item ${project.category}`}>
				<img src={project.thumbnail}/>
				<figcaption className='project-title hidden'>{project.title}</figcaption>
			</figure>
		);
	});

	return (
		<div>
			<h1>Projects</h1>
			<section id='category-list'>
				{categoriesList}
			</section>
			{activeProjectId !== null && <ActiveProject key={activeProjectId} projects={projects} projectId={activeProjectId} />}
			<div id='projects-grid'>
				{projectsList}
			</div>
		</div>
	);
};
