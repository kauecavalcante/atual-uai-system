<?php
/**
 * Home — composição das seções (espelha src/app/page.tsx).
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<main id="conteudo" class="flex-1">
	<?php
	get_template_part( 'template-parts/hero' );
	get_template_part( 'template-parts/services' );
	get_template_part( 'template-parts/registration' );
	?>
</main>

<?php
get_footer();
