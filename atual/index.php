<?php
/**
 * Fallback obrigatório do tema. O site é uma one-page: qualquer rota que
 * caia aqui mostra a própria landing.
 */

defined( 'ABSPATH' ) || exit;

require get_theme_file_path( 'front-page.php' );
