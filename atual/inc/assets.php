<?php
/**
 * Enfileiramento de CSS/JS do tema.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
	$css_path = get_theme_file_path( 'assets/css/main.css' );

	wp_enqueue_style(
		'atual-main',
		get_theme_file_uri( 'assets/css/main.css' ),
		array(),
		file_exists( $css_path ) ? (string) filemtime( $css_path ) : ATUAL_VERSION
	);

	foreach ( array( 'drawer', 'form-mask', 'header-scroll' ) as $script ) {
		$path = get_theme_file_path( "assets/js/{$script}.js" );

		wp_enqueue_script(
			"atual-{$script}",
			get_theme_file_uri( "assets/js/{$script}.js" ),
			array(),
			file_exists( $path ) ? (string) filemtime( $path ) : ATUAL_VERSION,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);
	}
} );
