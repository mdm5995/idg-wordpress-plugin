import { useState, useEffect } from '@wordpress/element';

// TODO: create some order functionality
// need to create a new custom term meta for 'sort order' in PHP
// this might be scope creep -- can possibly launch without?
const CategoryDisplay = ({categories, handleClick}) => {
	const categoriesList = categories.map((category) => {
		return (
			<button key={category['id']} value={category['slug']} id={category['slug']} onClick={handleClick}>
				{category['name']}
			</button>
		);
	});
	return categoriesList;
}

const ActiveCategory = ({name, description, link, imageSrc, slug}) => {
	return (
		<container id='active-category' class={slug}>
				<section id='active-category-content'>
					<section id='active-category-description'>
						<h2>{name}</h2>
						<hr />
						<p>{description}</p>
						<a class={`learn-more-button ${slug}`} href={link}>Learn more</a>
					</section>
					<img src={imageSrc} />
				</section>
		</container>
	);
}

// TODO: implement scroll to auto scroll to active project div on rerender.
// need to research

const ActiveProject = ({projects, projectId, handleClose}) => {
	const selectedProject = projects.find((project) => {
		return project.id === parseInt(projectId);
	});
	if (selectedProject) {
		return (
			<container id='active-project' className={selectedProject.category}>
				<section id='active-project-content'>
					<img className='active-project-image' src={selectedProject.thumbnail} />
					<section id='active-project-description'>
						<a id='close-button' onClick={handleClose}>
							<svg xmlns="http://www.w3.org/2000/svg" 
								width="48" 
								height="48" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								stroke-width="2" 
								stroke-linecap="round" 
								stroke-linejoin="round" 
								class="feather feather-x">
								<line x1="18" y1="6" x2="6" y2="18"/>
								<line x1="6" y1="6" x2="18" y2="18"/>
							</svg>
						</a>
						<h2 id='active-project-title'>{selectedProject.title}</h2>
						<hr />
						{/* this html comes from WP_REST_API so it should be safe? */}
						<section dangerouslySetInnerHTML={selectedProject.excerpt}></section>
						<a className={`learn-more-button ${selectedProject.category}`} href={selectedProject.link}>Learn More</a>
					</section>
				</section>
			</container>
		);
	};
	return null;
};

export default function ProjectsArchive() {

	const [projects, setProjects] = useState([]); // This is a project object, see getProjectsData() for shape.
	const [category, setCategory] = useState('all'); // This is a 'category object'. see getCategoryData() for shape.
	const [categories, setCategories] = useState([]);
	const [activeProjectId, setActiveProjectId] = useState(null);

	const handleCategoryChange = (event) => {
		// const newCategory = event.target.value;
		const newCategory = categories.find((category) => {
			return category.slug === event.target.value;
		});
		const newCategoryButton = document.getElementById(newCategory.slug);

		if (category === 'all') {
			newCategoryButton.classList.add('active');
			setCategory(newCategory);
			return;
		}

		const oldCategoryButton = document.getElementById(category.slug);
		if (category.slug === event.target.value) {
			oldCategoryButton.classList.remove('active');
			setCategory('all');
			return;
		}

		if (category.slug !== event.target.value) {
			oldCategoryButton.classList.remove('active');
			newCategoryButton.classList.add('active');
			setCategory(newCategory);
			return;
		}
	}

	const clearHiddenFigures = () => {
		const hiddenFigure = document.querySelector('figure.hidden');
		if (hiddenFigure !== null) {
			hiddenFigure.classList.remove('hidden');
		};

		return;
	}

	const handleActiveProjectClose = (event) => {
		clearHiddenFigures();
		setActiveProjectId(null);
	}

	const getCategoryData = () => {
		return fetch('https://localhost/wp-json/wp/v2/project_categories?_embed')
			.then((response) => response.json())
			.then((categoryObjectsJson) => {
				const categoryPromises = categoryObjectsJson.map((category) => {
					return fetch('https://localhost/wp-json/wp/v2/media/' + category['idg_image'])
						.then((response) => response.json())
						.then((mediaJson) => mediaJson.source_url);
				});

				return Promise.all(categoryPromises).then((imageUrls) => {
					const categoryArray = categoryObjectsJson.map((category, index) => {
						const categoryObject = {
							id: category.id,
							slug: category.slug,
							name: category.name,
							description: category.description,
							link: category.link,
							imageId: category['idg_image'],
							imageSrc: imageUrls[index],
						};
						return categoryObject;
					});
					return categoryArray;
				})
				.catch((e) => console.error('Error during media API calls:', e));
			})
			.catch((e) => console.error('Error during category API call:' + e));
	}
	
	// API call for project categories. Should only run once.
	useEffect(() => {
		let ignore = false;
		setCategories([]);
		// setActiveProjectId(null);
		getCategoryData().then(
			(categoryArray) => {
				if (!ignore) {
					setCategories(categoryArray);
				};
			}
		);
		return () => {
			ignore = true;
		};
	}, []);

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
						category: project['_embedded']['wp:term'][0][0].slug,
						categoryId: project['project_categories'][0],
					};
					return projectObject;
				});
				return projectsArray;
			}).catch((e) => console.error('error!' + e));
		return projectsArray;
	}

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
					if (category.id === project.categoryId) {
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

		// clear prev hidden figures, if any
		clearHiddenFigures();

		const figureElement = event.currentTarget;

		// assigns int: project.id 
		const selectedProjectId = figureElement.getAttribute('projectId');
		figureElement.classList.add('hidden');
		setActiveProjectId(selectedProjectId);
		return;
	}

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
			{
				category !== 'all' &&
				<ActiveCategory 
					name={category.name} 
					description={category.description} 
					imageSrc={category.imageSrc} 
					link={category.link} 
					slug={category.slug}
				/>
			}
			<section id='category-list'>
				{<CategoryDisplay categories={categories} handleClick={handleCategoryChange}/>}
			</section>
			{
				activeProjectId !== null && 
				<ActiveProject 
					key={activeProjectId} 
					projects={projects} 
					projectId={activeProjectId}
					handleClose={handleActiveProjectClose}
				/>
			}
			<div id='projects-grid'>
				{projectsList}
			</div>
		</div>
	);
};
