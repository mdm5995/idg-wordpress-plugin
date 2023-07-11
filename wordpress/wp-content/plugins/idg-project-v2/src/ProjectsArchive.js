import { useState, useEffect } from '@wordpress/element';

export default function ProjectsArchive() {
	const Categories = {
		'k12': 'K-12',
		'collegiate': 'Collegiate',
		'cultural-faith': 'Cultural/Faith',
		'civic': 'Civic',
		'commercial': 'Commercial',
	}

	const categoriesList = Object.keys(Categories).map((key) => {
		return (
			<button key={key} value={key} id={key} onClick={(event) => handleCategoryChange(event)}>
				{Categories[key]}
			</button>
		);
	});

	// TODO: add category handling
	// need to update projects on category change 
	// (NOTE: might cause weird infinite loop shit again!)

	const [projects, setProjects] = useState([]);
	const [category, setCategory] = useState('all');

	const getProjectsData = () => {
		const projectsArray = fetch('https://localhost/wp-json/wp/v2/projects?_embed')
			.then((response) => response.json())
			.then((json) => {
				console.log('this is the json:');
				console.log(json);
				const projectsArray = json.map((project) => {
					const projectObject = {
						id: project.id,
						title: project.title.rendered,
						content: project.content.rendered,
						link: project.link,
						thumbnail: project['_embedded']['wp:featuredmedia'][0].source_url,
						category: 'k12'
					};
					console.log('this is the projectobject:');
					console.log(projectObject);
					return projectObject;
				});
				console.log('this is the projectArray:');
				console.log(projectsArray);
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
				setProjects(projectsArray);
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

	// TODO: 
	// do i set up the functionality first or get the data first? probably get the data.
	// figure out how to pull the actual projects data from the wp rest api. 
	// query needs to only return feat_img, title, and category info.
	// onClick will pull add'l info to go in the hover state.
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