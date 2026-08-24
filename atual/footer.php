<?php
/**
 * Rodapé (Figma: bg-footer 7:122, Frame 213 7:213 e footer 7:205;
 * comps mobile 7:292, 7:458, 7:476 e 7:481).
 *
 * A faixa azul começa antes de a seção de cadastro terminar — daí a margem
 * negativa fixa (146px mobile / 455px desktop) e o z-0 contra o z-10 da
 * seção de cadastro: o card do formulário passa por cima da faixa.
 */

defined( 'ABSPATH' ) || exit;
?>

<footer class="bg-brand relative z-0 -mt-[146px] text-white lg:-mt-[455px]">
	<div class="px-5 pt-[202px] pb-[30px] lg:px-[3.5139vw] lg:pt-[106px] lg:pb-[25px]">
		<div class="max-w-[320px] lg:max-w-[374px]">
			<h2 class="text-[32px] leading-none font-bold">Saiba como entrar em contato conosco!</h2>

			<address class="mt-6 flex flex-col gap-3 not-italic">
				<a href="tel:+5581982990066" class="flex items-center gap-2 hover:underline lg:gap-3">
					<?php atual_icon( 'phone-call', 'size-[18px] shrink-0 lg:size-4' ); ?>
					<span class="text-[16px] leading-[1.21]">(81) 9 8299-0066</span>
				</a>
				<a href="mailto:financeiro@atualsecuritizadora.com.br" class="flex items-center gap-2 hover:underline lg:gap-3">
					<?php atual_icon( 'mail', 'size-[18px] shrink-0 lg:size-4' ); ?>
					<span class="text-[16px] leading-[1.21]">financeiro@atualsecuritizadora.com.br</span>
				</a>
				<p class="flex items-center gap-2 lg:gap-3">
					<?php atual_icon( 'map-pin', 'size-[18px] shrink-0 lg:size-4' ); ?>
					<span class="text-[16px] leading-[1.21]">Rua padre carapuceiro 752 - Boa viagem - PE</span>
				</p>
			</address>

			<ul class="mt-5 flex h-[30px] items-center gap-[18px] lg:mt-7">
				<li>
					<?php /* 15px, não 16px: tamanho em que os dois links mais a calha de 18px fecham os 326.5px do bloco no comp (7:226). */ ?>
					<a href="<?php echo esc_url( home_url( '/termos-e-condicoes' ) ); ?>" class="text-[15px] leading-[30px] hover:underline">Termos e Condições</a>
				</li>
				<li>
					<a href="<?php echo esc_url( home_url( '/politica-de-privacidade' ) ); ?>" class="text-[15px] leading-[30px] hover:underline">Política de Privacidade</a>
				</li>
			</ul>
		</div>

		<?php /* Voltar ao topo: âncora, não botão — funciona sem JavaScript e o scroll-behavior: smooth global cuida da animação. */ ?>
		<div class="mt-[33px] flex justify-end lg:mt-[153px]">
			<a
				href="#inicio"
				aria-label="Voltar ao topo da página"
				class="bg-accent text-brand grid size-10 place-items-center rounded-lg transition-[filter] hover:brightness-105"
			>
				<?php atual_icon( 'arrow-up', 'size-5' ); ?>
			</a>
		</div>

		<div class="mt-5 flex h-[34px] items-center justify-between lg:mt-[22px] lg:h-[30px]">
			<p class="text-[14px] leading-[1.21]">© <?php echo esc_html( gmdate( 'Y' ) ); ?> Atual. Todos os Direitos Reservados.</p>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
