<?php
/**
 * Arte de fundo do hero — reprodução fiel do frame `bg-principal` (7:6).
 * Espelha sections/hero/hero-artwork.tsx.
 *
 * Composição posicionada em porcentagem do palco: escala com a viewport
 * exatamente como no Figma. Palco: < lg preenche a seção; ≥ lg trava em
 * 1366×1534 (mais alto que a seção de propósito — o degradê e o gráfico
 * vazam para trás da seção seguinte).
 *
 * Camadas vetoriais: os SVGs são exportados com preserveAspectRatio="none",
 * então background-size 100% 100% reproduz o Figma; background-image de
 * elemento display:none não é baixado, cada conjunto só chega no breakpoint
 * em que é usado. Tudo decorativo: aria-hidden e alt="".
 */

defined( 'ABSPATH' ) || exit;

$atual_img = static function ( string $path ): string {
	return atual_asset( 'img/hero/' . $path );
};

/** Overlay azul + fade para branco sobre a foto (nós 7:8 e 7:294). */
$atual_photo_overlay = 'linear-gradient(180deg, rgba(27,68,157,0) 33.548%, rgb(255,255,255) 98.254%),linear-gradient(90deg, rgba(27,68,157,0.8) 0%, rgba(27,68,157,0.8) 100%)';

/** Fade branco que cobre a metade inferior do palco (nó 7:9). */
$atual_white_fade = 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgb(255,255,255) 50.055%)';

/** Colunas em perspectiva do gráfico — desktop (nós 7:12…7:17). */
$atual_desktop_columns = array(
	array( 'desktop/chart-column-1.svg', 'inset-[48.64%_77.28%_21.13%_3.51%]' ),
	array( 'desktop/chart-column-2.svg', 'inset-[48.63%_64.36%_21.13%_22.67%]' ),
	array( 'desktop/chart-column-3.svg', 'inset-[45.52%_54.85%_21.13%_35.64%]' ),
	array( 'desktop/chart-column-4.svg', 'inset-[44.47%_41.68%_21.12%_45.15%]' ),
	array( 'desktop/chart-column-5.svg', 'inset-[19.79%_24.71%_21.13%_58.32%]' ),
	array( 'desktop/chart-column-6.svg', 'inset-[11.6%_3.51%_21.13%_75.29%]' ),
);

/** Mesmas colunas no frame mobile (nós 7:297…7:302). */
$atual_mobile_columns = array(
	array( 'mobile/chart-column-1.svg', 'inset-[63.97%_75.78%_1.5%_5.97%]' ),
	array( 'mobile/chart-column-2.svg', 'inset-[63.96%_63.49%_1.5%_24.17%]' ),
	array( 'mobile/chart-column-3.svg', 'inset-[61.98%_54.45%_1.5%_36.51%]' ),
	array( 'mobile/chart-column-4.svg', 'inset-[61.3%_41.93%_1.5%_45.55%]' ),
	array( 'mobile/chart-column-5.svg', 'inset-[45.5%_25.8%_1.42%_58.07%]' ),
	array( 'mobile/chart-column-6.svg', 'inset-[40.25%_5.65%_1.5%_74.2%]' ),
);

$atual_vector_layer = static function ( string $src, string $class, bool $blend = false ) use ( $atual_img ): void {
	printf(
		'<div class="absolute bg-no-repeat%s %s" style="background-image: url(&quot;%s&quot;); background-size: 100%% 100%%"></div>',
		$blend ? ' mix-blend-overlay' : '',
		esc_attr( $class ),
		esc_url( $atual_img( $src ) )
	);
};
?>

<div aria-hidden="true" class="absolute inset-0 isolate -z-10 overflow-hidden lg:bottom-auto lg:aspect-[1366/1534]">
	<?php /* Foto de fundo + overlay azul (nós 7:8 / 7:294). */ ?>
	<div class="absolute inset-x-0 top-0 h-full lg:h-[70.9257%]">
		<img
			src="<?php echo $atual_img( 'backdrop.jpg' ); ?>"
			alt=""
			fetchpriority="high"
			class="absolute inset-0 h-full w-full object-cover object-center lg:object-[50%_57.73%]"
		/>
		<div class="absolute inset-0" style="background-image: <?php echo esc_attr( $atual_photo_overlay ); ?>"></div>
	</div>

	<?php /* Degradê branco que dissolve o hero na seção seguinte (nó 7:9). */ ?>
	<div class="absolute inset-x-0 top-[21.3168%] hidden h-[78.6832%] lg:block" style="background-image: <?php echo esc_attr( $atual_white_fade ); ?>"></div>

	<?php /* Gráfico — colunas em perspectiva e linha com marcadores (nó 7:10). */ ?>
	<div class="lg:hidden">
		<?php
		foreach ( $atual_mobile_columns as $column ) {
			$atual_vector_layer( $column[0], $column[1], true );
		}
		$atual_vector_layer( 'mobile/chart-line.svg', 'inset-[40.17%_5.58%_24.26%_5.56%]' );
		?>
	</div>
	<div class="hidden lg:block">
		<?php
		foreach ( $atual_desktop_columns as $column ) {
			$atual_vector_layer( $column[0], $column[1], true );
		}
		$atual_vector_layer( 'desktop/chart-line.svg', 'inset-[11.47%_3.44%_32.99%_3.08%]' );
		?>
	</div>

	<?php /* Brilho ciano no canto superior esquerdo (nó 7:25) — só desktop. */ ?>
	<?php $atual_vector_layer( 'desktop/glow-ellipse.svg', 'inset-0 hidden lg:block' ); ?>

	<?php /* Mão com a borboleta (nós 7:28 / 7:310) — art direction com <picture>: cada breakpoint baixa só o seu recorte. */ ?>
	<div class="absolute overflow-hidden top-[51.8333%] left-[12.5%] h-[43.8333%] w-[87.5%] lg:top-[12.5163%] lg:left-[44.2167%] lg:h-[43.5463%] lg:w-[58.3455%]">
		<picture>
			<source media="(min-width: 64rem)" type="image/avif" srcset="<?php echo $atual_img( 'desktop/hand-butterfly.avif' ); ?>" />
			<source media="(min-width: 64rem)" type="image/webp" srcset="<?php echo $atual_img( 'desktop/hand-butterfly.webp' ); ?>" />
			<source media="(min-width: 64rem)" srcset="<?php echo $atual_img( 'desktop/hand-butterfly.png' ); ?>" />
			<source type="image/avif" srcset="<?php echo $atual_img( 'mobile/hand-butterfly.avif' ); ?>" />
			<source type="image/webp" srcset="<?php echo $atual_img( 'mobile/hand-butterfly.webp' ); ?>" />
			<img
				src="<?php echo $atual_img( 'mobile/hand-butterfly.png' ); ?>"
				alt=""
				width="666"
				height="375"
				decoding="async"
				class="absolute max-w-none -translate-x-1/2 -translate-y-1/2 object-cover top-[50.0696%] left-[54.3127%] h-[62.2126%] w-[96.291%] rotate-[-21.49deg] object-[100%_63.8%] lg:top-[47.9801%] lg:left-[55.5487%] lg:h-[56.8359%] lg:w-[93.5306%] lg:rotate-[-21.97deg] lg:object-center"
			/>
		</picture>
	</div>
</div>
