<?php
/**
 * Validação server-side do formulário de cadastro (Contact Form 7).
 *
 * Porta fiel de src/lib/validation/cnpj.ts e registration.ts do projeto
 * Next: os atributos HTML e a máscara JS são só a primeira barreira; a
 * checagem que vale é esta, no servidor.
 *
 * Os nomes de campo ('cnpj', 'telefone') precisam bater com as tags do
 * formulário em /cf7/registration-form.txt.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Remove a máscara, mantendo só dígitos.
 */
function atual_strip_digits( string $value ): string {
	return preg_replace( '/\D/', '', $value ) ?? '';
}

/**
 * Dígito verificador do CNPJ (módulo 11).
 */
function atual_cnpj_check_digit( string $digits, int $length ): int {
	$sum    = 0;
	$weight = $length - 7;

	for ( $index = 0; $index < $length; $index++ ) {
		$sum    += (int) $digits[ $index ] * $weight;
		$weight -= 1;
		if ( $weight < 2 ) {
			$weight = 9;
		}
	}

	$remainder = $sum % 11;

	return $remainder < 2 ? 0 : 11 - $remainder;
}

/**
 * Valida CNPJ pelos dígitos verificadores. Checar o formato não basta:
 * "11.111.111/1111-11" tem 14 dígitos mas não é um CNPJ.
 */
function atual_is_valid_cnpj( string $value ): bool {
	$digits = atual_strip_digits( $value );

	if ( strlen( $digits ) !== 14 ) {
		return false;
	}

	// Sequências repetidas passam no módulo 11 mas não são CNPJs válidos.
	if ( preg_match( '/^(\d)\1{13}$/', $digits ) ) {
		return false;
	}

	return atual_cnpj_check_digit( $digits, 12 ) === (int) $digits[12]
		&& atual_cnpj_check_digit( $digits, 13 ) === (int) $digits[13];
}

/**
 * Telefone BR: 10 dígitos (fixo) ou 11 (celular), sempre com DDD válido.
 */
function atual_is_valid_phone_br( string $value ): bool {
	$digits = atual_strip_digits( $value );
	$length = strlen( $digits );

	return ( 10 === $length || 11 === $length )
		&& (int) substr( $digits, 0, 2 ) >= 11;
}

// Campo CNPJ ([text* cnpj]).
add_filter( 'wpcf7_validate_text*', function ( $result, $tag ) {
	if ( 'cnpj' !== $tag->name ) {
		return $result;
	}

	$value = isset( $_POST['cnpj'] ) ? trim( (string) wp_unslash( $_POST['cnpj'] ) ) : '';

	if ( '' !== $value && ! atual_is_valid_cnpj( $value ) ) {
		$result->invalidate( $tag, 'CNPJ inválido — confira os números.' );
	}

	return $result;
}, 20, 2 );

// Campo telefone ([tel* telefone]) — regra mais estrita que a nativa do CF7.
add_filter( 'wpcf7_validate_tel*', function ( $result, $tag ) {
	if ( 'telefone' !== $tag->name ) {
		return $result;
	}

	$value = isset( $_POST['telefone'] ) ? trim( (string) wp_unslash( $_POST['telefone'] ) ) : '';

	if ( '' !== $value && ! atual_is_valid_phone_br( $value ) ) {
		$result->invalidate( $tag, 'Telefone inválido — inclua o DDD.' );
	}

	return $result;
}, 20, 2 );
