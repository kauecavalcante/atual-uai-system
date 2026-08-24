<?php
/**
 * Colagem da seção de serviços (nós 7:97…7:121 desktop, 7:325 mobile).
 * Espelha sections/services/services-collage.tsx.
 *
 * Vertical em porcentagem (igual nos dois comps), horizontal com variante
 * em lg. O miolo usa --u (derivada de cqh): vale 1px do comp desktop e
 * encolhe para 0.71px no mobile — a mesma razão que o Figma aplicou.
 * Tudo é ilustração: aria-hidden na raiz, inclusive nos rótulos da UI
 * fictícia ("R$ 355.00" lido em voz alta seria informação falsa).
 */

defined( 'ABSPATH' ) || exit;

$atual_card_shadow = 'shadow-[0_calc(var(--u)*4)_calc(var(--u)*9)_rgba(0,0,0,0.05)]';
?>

<div
	aria-hidden="true"
	style="--u: calc(100cqh / 612.05)"
	class="[container-type:size] relative aspect-[386.22/434.53] lg:aspect-[625/612.05] -ml-[8.819%] w-[120.694%] lg:ml-0 lg:w-full"
>
	<?php /* Foto dos prédios — espelhada, canto grande no topo à esquerda. */ ?>
	<div class="absolute top-[6.045%] h-[86.43%] overflow-hidden left-[7.35%] w-[82.72%] lg:left-[16.96%] lg:w-[72%] rounded-tl-[calc(var(--u)*80)] rounded-tr-[calc(var(--u)*20)] rounded-b-[calc(var(--u)*20)]">
		<img src="<?php echo atual_asset( 'img/services/buildings.jpg' ); ?>" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full -scale-x-100 object-cover object-bottom" />
	</div>

	<?php /* Card "Renda Total" (nós 7:101…7:105). Altura vem do conteúdo. */ ?>
	<div class="absolute top-[31.37%] flex items-end justify-between bg-white left-[64.92%] w-[25.37%] lg:left-[77.92%] lg:w-[22.08%] px-[calc(var(--u)*13)] py-[calc(var(--u)*18)] rounded-l-[calc(var(--u)*10)] lg:rounded-[calc(var(--u)*10)] <?php echo $atual_card_shadow; ?>">
		<span class="flex min-w-0 flex-col whitespace-nowrap">
			<span class="text-muted text-[max(10px,calc(var(--u)*12))] leading-[1.21]">Renda Total</span>
			<span class="text-ink text-[max(14px,calc(var(--u)*16))] leading-[1.21] font-medium">R$ 355.00</span>
		</span>
		<?php atual_icon( 'bar-chart', 'text-accent size-[calc(var(--u)*20)] shrink-0' ); ?>
	</div>

	<?php /* Argola dourada (nó 7:120). */ ?>
	<div class="absolute top-[49.34%] left-0 h-[9.15%] w-[11.58%] lg:left-[10.56%] lg:w-[10.08%]">
		<img src="<?php echo atual_asset( 'img/services/ring.png' ); ?>" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-contain" />
	</div>

	<?php /* Card "Transferido com Sucesso!" (nós 7:110…7:113). */ ?>
	<div class="absolute top-[67.97%] flex h-[11.11%] items-center bg-white left-[7.31%] w-[57.74%] lg:left-0 lg:w-[48.32%] gap-[calc(var(--u)*15)] px-[calc(var(--u)*25)] rounded-r-[calc(var(--u)*10)] lg:rounded-[calc(var(--u)*10)] <?php echo $atual_card_shadow; ?>">
		<?php atual_icon( 'check-circle', 'text-accent size-[calc(var(--u)*24)] shrink-0' ); ?>
		<span class="text-ink truncate text-[max(14px,calc(var(--u)*18))] leading-[1.21] tracking-[-0.03em]">Transferido com Sucesso!</span>
	</div>

	<?php /* Card com o símbolo da marca (nós 7:117 / 7:118). */ ?>
	<div class="absolute top-[81.86%] h-[18.14%] bg-white left-[66.16%] w-[23.96%] lg:left-[78.56%] lg:w-[20.85%] p-[calc(var(--u)*30)] rounded-[calc(var(--u)*10)] rounded-br-[calc(var(--u)*40)] shadow-[0_calc(var(--u)*4)_calc(var(--u)*4.5)_rgba(0,0,0,0.05)]">
		<div class="relative size-full">
			<img src="<?php echo atual_asset( 'img/services/logo-mark.png' ); ?>" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-contain" />
		</div>
	</div>

	<?php /* Moeda sobre o canto superior direito da foto (nó 7:121). */ ?>
	<div class="absolute top-0 left-[76.29%] h-[18.95%] w-[23.71%] lg:left-[76.96%] lg:w-[20.64%]">
		<img src="<?php echo atual_asset( 'img/services/coin.png' ); ?>" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-contain" />
	</div>
</div>
