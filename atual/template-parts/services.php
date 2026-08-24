<?php
/**
 * Seção 2 — Serviços (Figma: frame 7:59 desktop; 7:317, 7:318, 7:325 e
 * 7:351 mobile). Espelha sections/services/services.tsx.
 *
 * Calha de 90px (6.5885vw), maior que a de 48px do header/hero — é assim no
 * design. Tipografia e espaçamentos usam max(valor-mobile, proporção-de-1366).
 */

defined( 'ABSPATH' ) || exit;

$atual_benefits = array(
	'Processo descomplicado e seguro',
	'Agilidade na concessão de crédito',
	'Rapidez no repasse dos recursos financeiros',
	'Transparência em todas as etapas',
	'Atendimento personalizado',
);
?>

<section id="servicos" aria-labelledby="services-title" class="relative overflow-x-clip pb-[100px] lg:pb-[6.1493vw]">
	<?php /* Moeda desfocada sangrando na borda direita (nós 7:60 / 7:61). */ ?>
	<div aria-hidden="true" class="pointer-events-none absolute right-0 bottom-[11px] h-[140px] w-[114px] overflow-hidden lg:bottom-[-4.978vw] lg:h-[19.839vw] lg:w-[14.934vw]">
		<div class="relative h-full w-[155px] lg:w-[22.035vw] lg:blur-[6px]">
			<img src="<?php echo atual_asset( 'img/services/coin.png' ); ?>" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-contain" />
		</div>
	</div>

	<div class="px-5 lg:px-[6.5885vw]">
		<?php /* Intro centralizada com deslocamento de +24px à direita, como no Figma (left: calc(50% + 24px)). */ ?>
		<div class="text-ink text-center lg:translate-x-[1.757vw]">
			<h2 id="services-title" class="mx-auto max-w-[282px] text-[max(32px,3.0747vw)] leading-none font-medium lg:max-w-[64.08%]">
				<strong class="font-bold text-brand">Antecipe</strong><span> seus recebíveis, </span><strong class="font-bold text-brand">otimize</strong><span> o fluxo de caixa e </span><strong class="font-bold text-brand">eleve a performance</strong><span> dos seus recursos financeiros</span>
			</h2>

			<div class="mx-auto mt-6 space-y-[1.21em] text-[max(18px,1.3177vw)] leading-[1.21] lg:mt-[1.1713vw] lg:max-w-[71.67%]">
				<p>Com a antecipação de recebíveis, você adianta o recebimento de valores futuros, transformando vendas a prazo em recursos financeiros imediatos, gerando muito mais valor para a sua empresa.</p>
				<p>Dessa maneira você consegue manter o seu fluxo de caixa operante, reduzindo os riscos de inadimplência e melhorando a saúde financeira do seu negócio.</p>
			</div>
		</div>

		<?php /* grid-cols-1 é obrigatório: sem ele a coluna implícita é auto e a largura percentual da colagem se auto-referencia, inflando a coluna. */ ?>
		<div class="mt-[34px] grid grid-cols-1 gap-y-[25.75px] lg:mt-[5.6442vw] lg:grid-cols-[52.699%_1fr] lg:items-start lg:gap-x-[4.469%] lg:gap-y-0">
			<?php /* No mobile a colagem sangra 8px à esquerda e 18px à direita da viewport. */ ?>
			<?php get_template_part( 'template-parts/services-collage' ); ?>

			<div class="lg:pt-[1.1713vw]">
				<h3 class="text-ink text-[max(32px,3.0747vw)] leading-[1.21] font-medium">
					<span>Com a </span><strong class="font-bold from-brand to-accent bg-gradient-to-b bg-clip-text text-transparent">ATUAL</strong><span> a sua empresa pode ir muito mais longe! </span><strong class="font-bold text-brand">Invista agora</strong><span> mesmo na </span><strong class="font-bold text-brand">antecipação</strong><span> de recebíveis!</span>
				</h3>

				<ul class="mt-[max(31.496px,3.6603vw)] flex flex-col gap-[max(19px,2.196vw)]">
					<?php foreach ( $atual_benefits as $benefit ) : ?>
						<li class="flex items-start gap-[max(14px,1.4641vw)]">
							<?php atual_icon( 'check-badge', 'text-brand size-[max(21.741px,2.3426vw)] shrink-0' ); ?>
							<span class="text-ink mt-px text-[max(16px,1.3177vw)] leading-[max(18.898px,2.196vw)] font-medium"><?php echo esc_html( $benefit ); ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
	</div>
</section>
