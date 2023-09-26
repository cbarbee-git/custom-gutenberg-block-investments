<?php
/**
 * Plugin Name:       Investments Custom Post Types
 * Description:       This plugin creates a Custom Post Type for investments as reusable Gutenberg blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Chad Barbee
 * Author URI:        https://chadbarbee.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       investments
 *
 * @package           investments-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function custom_investments_enqueue_script() {   
    wp_enqueue_script( 'load_custom_script', plugin_dir_url( __FILE__ ) . 'assests/js/toggle-items.js', array('jquery'), '1.0' );
}
add_action('wp_enqueue_scripts', 'custom_investments_enqueue_script');

function investments_block_init()
{
	register_block_type(__DIR__ . '/build');
}

add_action('init', 'investments_block_init');