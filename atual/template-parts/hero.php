<?php
/**
 * Seção 1 — Hero (Figma: frames 7:6 / 7:27 desktop, 7:293 / 7:312 mobile).
 *
 * Espelha sections/hero/hero.tsx: conteúdo em fluxo normal (nunca absoluto)
 * para refluir com zoom e fontes maiores. ≥ lg as medidas são proporções de
 * 1366px, travando texto e arte juntos. O padding-top reserva a altura do
 * header, que se sobrepõe ao hero.
 */

defined( 'ABSPATH' ) || exit;
?>

<section id="inicio" aria-labelledby="hero-title" class="relative isolate">
	<?php get_template_part( 'template-parts/hero-artwork' ); ?>

	<div class="flex flex-col items-start px-5 lg:px-[3.5139vw] pt-[clamp(6.5rem,34.1667vw,12rem)] lg:pt-[17.5695vw] pb-[clamp(10rem,70.5556vw,24rem)] lg:pb-[19.8389vw]">
		<h1 id="hero-title" class="text-hero-title text-white lg:max-w-[55.2708vw] lg:text-[5.8565vw] lg:leading-[5.8565vw]">
			Transformamos sua venda a prazo em dinheiro à vista
		</h1>

		<p class="text-hero-lead mt-[0.5625rem] text-white lg:mt-[1.2445vw] lg:max-w-[41.7277vw] lg:text-[1.757vw]">
			É o investimento que você procurava para fazer o seu negócio girar com um dinheiro que já é seu!
		</p>

		<?php /* CTA — variantes primary + hero de ui/button.tsx, resolvidas estaticamente. */ ?>
		<a
			href="#cadastro"
			class="inline-flex items-center justify-center rounded-full whitespace-nowrap uppercase transition-[filter,transform,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bg-accent text-brand shadow-[0_2px_1px_0_rgba(27,68,157,0.25)] lg:shadow-[0_4px_2px_0_rgba(27,68,157,0.25)] hover:brightness-105 text-cta px-[clamp(0.7947rem,0.4081rem+1.7182vw,1.875rem)] py-[clamp(0.5298rem,0.2721rem+1.1454vw,1.25rem)] lg:px-[2.1962vw] lg:py-[1.4641vw] lg:text-[1.3177vw] mt-[1.1875rem] lg:mt-[2.3426vw]"
		>
			Cadastre-se agora
		</a>
	</div>
</section>
