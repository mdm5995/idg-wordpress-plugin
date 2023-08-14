<?php
/*
Plugin Name: IDG Architects Projects Page                                                            
Plugin URI: https://mooremarketingonline.com/                                                        
Description: This plugin creates a custom project post type and project page with filters.           
Version: 0.0.1                                                                                       
Author: Morgan Moore for Moore Marketing, LLC                                                        
Author URI: https://morgan-moore.com/                                                                
*/

// register custom post type 'project'
function register_custom_project_post_type() {
	$post_type_args = array(
		'public' => true,
		'label' => 'Projects',
		'description' => 'A collection of projects created by IDG Architects',
		'show_in_rest' => true,
		'menu_position' => 20,
		'menu_icon' => 'dashicons-portfolio',
		'has_archive' => true,
		'hierarchical' => false,
		'taxonomy' => 'project_categories',
		'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt'),
		'template' => array(
			array(
				'core/post-title',
				array(
					'level' => 1,
					'className' => 'idg-project-title',
					'placeholder' => 'Enter project title',
				),
			),
			array(
				'core/separator',
				array(
					'style' => array(
						'color' => array(
							'background' => '#76bb21',
						),
						'className' => 'is-style-default idg-project-separator',
					),
				),
			),
			array(
				'core/post-featured-image',
				array(),
			),
			array(
				'idg/project-menu-block',
				array(
					'align' => 'full',
				),
			),
			array(
				'core/columns',
				array(
					'align' => 'full',
					'className' => 'idg-project-learn-section',
				),
				array(
					array(
						'core/column',
						array(
							'width' => '50%',
							'layout' => array(
							'type' => 'default'
							),
						),
						array(
							array(
								'core/heading',
								array(
									'level' => 2,
									'placeholder' => 'Enter project subtitle',
								),
							),
							array(
								'core/separator',
								array(
									'style' => array(
										'color' => array(
											'background' => '#76bb21',
										),
										'className' => 'is-style-default idg-project-separator',
									),
								),
							),
							array(
								'core/paragraph',
								array(
									'placeholder' => 'Enter project body copy',
								),
							),
						),
					),
					array(
						'core/column',
						array(
							'width' => '35%',
							'className' => 'idg-project-info-section',
							'layout' => array(
							'type' => 'default'
							),
						),
						array(
							array(
								'core/heading',
								array(
									'level' => 3,
									'className' => 'idg-project-info-header',
									'content' => 'Project Information',
								),
							),
							array(
								'core/separator',
								array(
									'style' => array(
										'color' => array(
											'background' => '#76bb21',
										),
										'className' => 'is-style-default idg-project-separator',
									),
								),
							),
							array(
								'core/paragraph',
								array(
									'placeholder' => 'Enter project info here',
								),
							),
						),
					),
				),
			),
			array(
				'core/heading',
				array(
					'level' => 2,
					'textAlign' => 'center',
					'content' => 'Gallery',
				),
			),
			array(
				'core/separator',
				array(
					'style' => array(
						'color' => array(
							'background' => '#76bb21',
						),
						'className' => 'is-style-default idg-project-separator',
					),
				),
			),
			array(
				'idg/gallery-block',
				array(),
			),
			array(
				'core/heading',
				array(
					'level' => 2,
					'textAlign' => 'center',
					'content' => 'Explore',
					'anchor' => 'explore',
				),
			),
			array(
				'core/separator',
				array(
					'style' => array(
						'color' => array(
							'background' => '#76bb21',
						),
						'className' => 'is-style-default idg-project-separator',
					),
				),
			),
			array(
				'idg/matterport-block',
				array(
					'align' => 'wide',
				),
			),
			array(
				'core/columns',
				array(
					'className' => 'idg-project-quote-container',
					'verticalAlignment' => 'center',
					'align' => 'wide',
					'style' => array(
						'spacing' => array(
							'margin' => array(
								'top' => '3rem',
							),
						),
					),
				),
				array(
					array(
						'core/column',
						array(
							'verticalAlignment' => 'center',
							'width' => '33.33%',
						),
						array(
							array(
								'core/image',
								array(
									'className' => 'idg-project-quote-image',
									'align' => 'center',
									'width' => 300,
									'height' => 300,
									'sizeSlug' => 'full',
									'linkDestination' => 'none',
									'style' => array(
										'border' => array(
											'radius' => '100%',
											'color' => '#76bb21',
											'width' => '4px',
										),
									),
								),
							),
						),
					),
					array(
						'core/column',
						array(
							'verticalAlignment' => 'center',
							'width' => '66.66%',
						),
						array(
							array(
								'core/quote',
								array(
									'className' => 'idg-project-quote',
									'value' => 'insert quote here',
									'citation' => 'insert citation here',
								),
							),
						),
					),
				),
			),
		),
	);
	register_post_type('projects', $post_type_args);
	$taxonomy_args = array(
		'public' => true,
		'hierarchical' => true,
		'show_in_rest' => true,
	);
	register_taxonomy('project_categories', 'projects', $taxonomy_args);
}
add_action( 'init', 'register_custom_project_post_type' );

// BEGIN CUSTOM FIELD FOR CATEGORY IMAGE //

function idg_add_term_fields($taxonomy) {
	// Check if we are editing an existing term or adding a new one.
	$term_id = isset($_GET['tag_ID']) ? $_GET['tag_ID'] : 0;
	$image_id = $term_id ? get_term_meta($term_id, 'idg_image', true) : 0;

	?>
	<div class='form-field'>
		<label>Category Image</label>
		<?php if ($image = wp_get_attachment_image_url($image_id, 'medium')): ?>
			<a href='#' class='button idg-upload'>
				<img src='<?php echo esc_url($image) ?>' />
			</a>
			<a href='#' class='button idg-remove'>Remove image</a>
			<input type='hidden' name='idg_image' value='<?php echo absint($image_id) ?>'>
		<?php else: ?>
			<a href='#' class='button idg-upload'>Upload Image</a>
			<a href='#' class='button idg-remove' style='display:none'>Remove image</a>
			<input type='hidden' name='idg_image' value=''></input>
		<?php endif; ?>
	</div>
	<?php
};
add_action('project_categories_add_form_fields', 'idg_add_term_fields');
add_action('project_categories_edit_form', 'idg_add_term_fields');

function idg_save_term_fields($term_id) {
	update_term_meta($term_id, 'idg_image', absint($_POST['idg_image']));
};
add_action('create_project_categories', 'idg_save_term_fields');
add_action('edited_project_categories', 'idg_save_term_fields');

// Finally, enqueue the JS for the wp media uploader itself:
function enqueue_media_uploader() {
	global $typenow;
	// make sure the page relates to projects
	// not the best but OK enough?
	if ($typenow == 'projects') {
		wp_enqueue_media();

		$script_url = plugins_url('project-category-image-uploader.js', __FILE__);
		wp_register_script('project_category_image_uploader', $script_url, array('jquery'));
		wp_enqueue_script('project_category_image_uploader');
	};
};
add_action('admin_enqueue_scripts', 'enqueue_media_uploader');

// Add the custom field data to the REST API response
function idg_add_custom_term_meta_to_api($response) {
   // $image_id = get_term_meta($term['id'], 'idg_image', true);
   // $term['idg_image'] = absint($image_id);
   // return $term;
    $data = $response->get_data();
    $term_id = $data['id'];
    $image_id = get_term_meta($term_id, 'idg_image', true);
    $data['idg_image'] = absint($image_id);
    $response->set_data($data);
    return $response;
}
add_filter('rest_prepare_project_categories', 'idg_add_custom_term_meta_to_api');

// END CUSTOM FIELD FOR CATEGORY IMAGE //

// associate the projects archive template
function projects_archive_template($template) {
    if (is_post_type_archive('projects')) {
        $template_path = plugin_dir_path(__FILE__) . 'templates/archive-projects.php';
        if (file_exists($template_path)) {
            return $template_path;
        }
    }
    return $template;
}
add_filter('template_include', 'projects_archive_template');

// Enqueue scripts on the archive template
function idg_projects_page_enqueue_scripts() {
	if (get_post_type() == 'projects') {
		// Enqueue stylesheet
		wp_enqueue_style(
			'idg-project-page-styles',
			plugins_url('/index.css', __FILE__),
			array(),
			'1.0',
			false
		);
	}

	if (is_post_type_archive('projects')) {

		// Enqueue your React component script here
		wp_enqueue_script(
			'idg-project-page',
			plugins_url('/build/index.js', __FILE__),
			['wp-element'],
			'1.0',
			true
		);

		// Enqueue stylesheet
		wp_enqueue_style(
			'idg-project-page-styles',
			plugins_url('/index.css', __FILE__),
			array(),
			'1.0',
			false
		);

	}
}
add_action('wp_enqueue_scripts', 'idg_projects_page_enqueue_scripts');

// Register Matterport block
add_action('init', 'idg_blocks_register');
function idg_blocks_register() {
	register_block_type(__DIR__ . '/Blocks/MatterportBlock/block.json');
	register_block_type(__DIR__ . '/Blocks/GalleryBlock/block.json');
};
