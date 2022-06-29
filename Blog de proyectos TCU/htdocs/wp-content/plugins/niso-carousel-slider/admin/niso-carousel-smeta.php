<?php

/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB2 directory)
 *
 * Be sure to replace all instances of 'niso_carousel_' with your project's prefix.
 * http://nacin.com/2010/05/11/in-wordpress-prefix-everything/
 *
 * @category YourThemeOrPlugin
 * @package  Demo_CMB2
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/CMB2/CMB2
 */

/**
 * Get the bootstrap! If using the plugin from wordpress.org, REMOVE THIS!
 */

add_action('cmb2_admin_init', 'niso_carousel_smeta');
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function niso_carousel_smeta()
{
	/**
	 * Sample metabox to demonstrate each field type included
	 */
	$xshopkit_demo = new_cmb2_box(array(
		'id'            => 'niso_carousel_smeta',
		'title'         => esc_html__('Recommended For You', 'cmb2'),
		'object_types'  => array('niso-carousel'), // Post type
		// 'show_on_cb' => 'niso_carousel_show_if_front_page', // function should return a bool value
		'context'    => 'side',
		'priority'   => 'default',
		// 'show_names' => true, // Show field names on the left
		// 'cmb_styles' => false, // false to disable the CMB stylesheet
		// 'closed'     => true, // true to keep the metabox closed by default
		// 'classes'    => 'extra-class', // Extra cmb2-wrap classes
		// 'classes_cb' => 'niso_carousel_add_some_classes', // Add classes through a callback.

	));
	$link1_txt = esc_html__('Recommended Themes', 'niso-carousel');
	$link1 = esc_url('https://wpthemespace.com/product-category/pro-theme/');
	$link2_txt = esc_html__('Recommended Services', 'niso-carousel');
	$link2 = esc_url('https://wpthemespace.com/pro-services/');

	$xshopkit_demo->add_field(array(
		'name' => '',
		'desc' => sprintf('<a class="button ncbtnh" href="%1$s" target="_blank">%2$s</a><a class= "button ncbtns" href="%3$s" target="_blank">%4$s</a>', $link1, $link1_txt, $link2, $link2_txt),
		'id'   => 'nxside_img',
		'type' => 'text',
		// 'repeatable' => true,
	));
}
