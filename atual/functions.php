<?php
/**
 * Tema Atual — setup e includes.
 *
 * Conversão fiel da landing Next.js (repo "atual"). O conteúdo é fixo no
 * tema por decisão de projeto — sem Customizer/ACF.
 */

defined( 'ABSPATH' ) || exit;

define( 'ATUAL_VERSION', wp_get_theme()->get( 'Version' ) );

require_once get_theme_file_path( 'inc/assets.php' );
require_once get_theme_file_path( 'inc/cleanup.php' );
require_once get_theme_file_path( 'inc/security-headers.php' );
require_once get_theme_file_path( 'inc/template-tags.php' );
require_once get_theme_file_path( 'inc/cf7-cnpj.php' );

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'script', 'style', 'search-form' ) );
	// O tema não usa a sidebar/admin bar styling padrão.
	add_theme_support( 'automatic-feed-links' );
} );

/**
 * Título da home idêntico ao metadata do projeto Next (config/site.ts).
 */
add_filter( 'pre_get_document_title', function ( $title ) {
	if ( is_front_page() ) {
		return 'Atual — Antecipação de recebíveis para o seu negócio';
	}
	return $title;
} );

/**
 * O CF7 não deve envolver o formulário em <p>/<br> — o grid é nosso.
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );
