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
		'taxonomy' => 'project_categories',
		'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt'),
		/* 'template' => array( TODO: add array of blocks for default template!! ) */ 
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

// First, create the custom meta field:
function add_project_category_image($taxonomy) { ?>
	<div class='form-field term-group'>
		<label for=''>Upload Image</label>
		<input type='text' name='txt_upload_image' id='txt_upload_image' value=''></input>
		<input type='button' id='upload-image-button' class='button' 	value='Upload Image'></input>
	</div>
<?php };
add_action('project_categories_add_form_fields', 'add_project_category_image', 10, 2);

// Then save the meta value:
function save_project_category_image($term_id, $tt_id) {
	if (isset($_POST['txt_upload_image']) && '' !== $_POST['txt_upload_image']) {
		$group = esc_url($_POST['txt_upload_image']);
		add_term_meta($term_id, 'term_image', $group, true);
	}
};
add_action('create_project_categories', 'save_project_category_image', 10, 2);

// We repeat these steps for the edit screen of the project_category:

// create the field on the edit screen:
function edit_image_upload($term, $taxonomy) {

	// get the current group value:
	$txt_upload_image = get_term_meta($term->term_id, 'term_image', true)
	?> 
	<div class='form-field term-group'>
		<label>Upload Image</label>
		<input type='text' name='txt_upload_image' id='txt_upload_image' value='<?php echo $txt_upload_image ?>'></input>
		<input type='button' id='upload-image-button' class='button' value='Upload Image' />
	</div>
<? };
add_action('project_categories_edit_form_fields', 'edit_image_upload', 10, 2);

// save the value to the term meta field:
function update_project_category_image($term_id, $tt_id) {
	if (isset($_POST['txt_upload_image']) && '' !== $_POST['txt_upload_image']) {
		$group = esc_url($_POST['txt_upload_image']);
		update_term_meta($term_id, 'term_image', $group, true);
	};
};
add_action('edited_project_categories', 'update_project_category_image', 10, 2);

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
function add_project_category_image_to_api($post) {
    $image_url = get_term_meta($post['project_categories'][0], 'term_image', true);
    $post['project_category_image'] = $image_url;
    return $post;
}
add_filter('rest_prepare_projects', 'add_project_category_image_to_api');

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
