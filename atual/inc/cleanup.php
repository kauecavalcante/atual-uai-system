<?php
/**
 * Remove CSS/JS que o WordPress e plugins injetam por padrão.
 *
 * O tema tem um único stylesheet compilado (Tailwind, com Preflight). Nada
 * além dele deve estilizar a página — qualquer CSS extra é risco de
 * divergência visual em relação ao projeto Next.
 */

defined( 'ABSPATH' ) || exit;

// Emojis (scripts + styles inline).
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// Metadados que não servem numa landing.
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

// CSS de blocos/tema clássico — a landing não usa o editor de blocos.
add_action( 'wp_enqueue_scripts', function () {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'global-styles' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'core-block-supports' );
}, 20 );

// CSS padrão do Contact Form 7 — todo o estilo do formulário é nosso.
// (O JS do CF7 continua: é ele que faz o envio AJAX e mostra os erros.)
add_filter( 'wpcf7_load_css', '__return_false' );
