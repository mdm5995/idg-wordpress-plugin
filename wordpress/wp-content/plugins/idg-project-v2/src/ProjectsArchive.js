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
