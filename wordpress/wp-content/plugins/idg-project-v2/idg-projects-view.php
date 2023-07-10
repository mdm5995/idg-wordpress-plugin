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
	$args = array(
		'public' => true,
		'label' => 'Projects',
		'description' => 'A collection of projects created by IDG Architects',
		'show_in_rest' => true,
		'menu_position' => 20,
		'menu_icon' => 'dashicons-portfolio',
		'has_archive' => true,
	);
	register_post_type( 'projects', $args );
}

add_action( 'init', 'register_custom_project_post_type' );

function custom_post_type_archive_template($template) {
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
			wp_enqueue_script('idg-project-page', plugins_url('/js/ProjectPage.jsx', __FILE__), ['wp-element'], '1.0', false);
			wp_enqueue_style('idg-project-page-styles', plugins_url('/css/ProjectPage-styles.css', __FILE__), array(), '1.0', false);
	}
}
add_action('wp_enqueue_scripts', 'idg_projects_page_enqueue_scripts');
