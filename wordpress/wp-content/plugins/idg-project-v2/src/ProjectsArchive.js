import { useState, useEffect } from '@wordpress/element';

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
						content: project.content.rendered,
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

	useEffect(() => {
		let ignore = false;
		setProjects([]);
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
	}, []);

	const projectsList = projects.map((project) => {
			return (
			<div className={`project-item ${project.category}`}>
				<a href={project.link}>
					<h1>{project.title}</h1>
					<img src={project.thumbnail}/>
				</a>
			</div>
		);
	});

	return (
		<div>
			<section id='category-list'>
				{categoriesList}
			</section>
			<div id='projects-grid'>
				{projectsList}
			</div>
			<div id='projects-grid'>
				<div className='project-item k12'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item k12'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item commercial'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item civic'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item collegiate'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item collegiate'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item k12'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item cultural-faith'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
				<div className='project-item k12'>
					<a>
						<img src='https://placeholder.co/400x316'/>
					</a>
				</div>
			</div>
		</div>
	);
};
