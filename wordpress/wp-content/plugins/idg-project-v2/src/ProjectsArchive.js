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
