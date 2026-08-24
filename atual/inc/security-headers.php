<?php
/**
 * Cabeçalhos de segurança — réplica do next.config.ts do projeto original.
 * Referência: OWASP Secure Headers Project.
 *
 * O caminho preferido é o .htaccess (cobre também assets estáticos; snippet
 * no README do repo). Este hook é o fallback para quando mod_headers não
 * estiver disponível — cobre só as respostas geradas pelo PHP.
 *
 * HSTS só é enviado sobre HTTPS. Em STAGING use um max-age curto (o valor
 * abaixo) e suba para 63072000 + preload apenas na produção com domínio
 * definitivo — HSTS em domínio de teste é difícil de desfazer.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'send_headers', function () {
	if ( headers_sent() ) {
		return;
	}

	header( 'X-DNS-Prefetch-Control: on' );
	header( 'X-Content-Type-Options: nosniff' );
	header( 'X-Frame-Options: DENY' );
	header( 'Referrer-Policy: strict-origin-when-cross-origin' );
	header( 'Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()' );

	if ( is_ssl() ) {
		// Staging: 1 dia. Produção: trocar por
		// 'max-age=63072000; includeSubDomains; preload'.
		header( 'Strict-Transport-Security: max-age=86400' );
	}
} );
