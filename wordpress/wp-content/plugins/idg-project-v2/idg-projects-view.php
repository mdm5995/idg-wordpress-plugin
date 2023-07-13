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
		'taxonomy' => 'project-categories',
		'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt'),
		/* 'template' => array( TODO: add array of blocks for default template!! ) */ 
	);
	$taxonomy_args = array(
		'public' => true,
		'hierarchical' => true,
		'show_in_rest' => true,
	);
	register_post_type('projects', $post_type_args);
	register_taxonomy('project-categories', 'projects', $taxonomy_args);
}

add_action( 'init', 'register_custom_project_post_type' );

// BEGIN CUSTOM FIELD FOR CATEGORY IMAGE //

// add custom field for images on project categories
function add_project_categories_image_field($term_id) {
    if (isset($_POST['project_categories_image'])) {
        $image = $_POST['project_categories_image'];
        add_term_meta($term_id, 'project_categories_image', $image, true);
    }
}
add_action('created_project_categories', 'add_project_categories_image_field', 10, 1);
add_action('edited_project_categories', 'add_project_categories_image_field', 10, 1);

// enqueue the media browser in admin screen
function load_media_browser() {
    wp_enqueue_media();
}
add_action('admin_enqueue_scripts', 'load_media_browser');

// add the extra form field in the edit/add screens
function display_project_categories_image_field($taxonomy) { ?>
	<div class="form-field">
		<label for="project_categories_image"><?php _e('Project Category Image', 'text-domain'); ?></label>
		<input type="hidden" name="project_categories_image" id="project_categories_image" value="">
		<img id="project_categories_image_preview" src="" style="max-width: 100px;">
		<button id="project_categories_image_upload" class="button"><?php _e('Upload Image', 'text-domain'); ?></button>
		<button id="project_categories_image_remove" class="button"><?php _e('Remove Image', 'text-domain'); ?></button>
	</div>
	<script>
    jQuery(document).ready(function($) {
			var customUploader;
			
			// Upload button
			$('#project_categories_image_upload').click(function(e) {
				e.preventDefault();
				
				// If the uploader object has already been created, reopen the dialog
				if (customUploader) {
					customUploader.open();
					return;
				}
				
				// Create the media uploader
				customUploader = wp.media({
					title: 'Upload Image',
					button: { text: 'Use Image' },
					multiple: false
				});
					
				// When an image is selected, set it as the value of the field
				customUploader.on('select', function() {
					var attachment = customUploader.state().get('selection').first().toJSON();
					$('#project_categories_image').val(attachment.url);
					$('#project_categories_image_preview').attr('src', attachment.url);
				});
				
				// Open the media uploader
				customUploader.open();
			});
			
			// Remove button
			$('#project_categories_image_remove').click(function(e) {
				e.preventDefault();
				$('#project_categories_image').val('');
				$('#project_categories_image_preview').attr('src', '');
			});
    });
	</script>
<?php }
add_action('project_categories_add_form_fields', 'display_project_categories_image_field', 10, 1);


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
add_filter('template_include', 'custom_post_type_archive_template');

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
