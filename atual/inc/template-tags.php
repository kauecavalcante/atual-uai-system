<?php
/**
 * Helpers de template: ícones inline, logo e botão "Contato".
 *
 * Ícones transcritos de src/components/icons/index.tsx do projeto Next —
 * `currentColor` para herdarem a cor do contexto, `aria-hidden` porque são
 * decorativos (quem descreve a ação é o texto ao lado).
 */

defined( 'ABSPATH' ) || exit;

/**
 * URL de um asset do tema.
 */
function atual_asset( string $path ): string {
	return esc_url( get_theme_file_uri( 'assets/' . ltrim( $path, '/' ) ) );
}

/**
 * Ecoa um ícone SVG inline.
 *
 * @param string $name  Nome do ícone.
 * @param string $class Classes CSS aplicadas ao <svg>.
 */
function atual_icon( string $name, string $class = '' ): void {
	$stroke_attrs = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

	$icons = array(
		// phone-call — nós 7:56 / 7:557 (traço, 24×24; stroke-width padrão 1).
		'phone-call'   => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5C16.0267 5.19057 16.9244 5.66826 17.6281 6.37194C18.3317 7.07561 18.8094 7.97326 19 8.95M15.05 1C17.0793 1.22544 18.9716 2.13417 20.4162 3.57701C21.8609 5.01984 22.772 6.91101 23 8.94M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12787 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"/></svg>',
		// Menu (hambúrguer) — nó 7:321.
		'menu'         => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 5V7H22V5H2ZM2 11V13H22V11H2ZM2 17V19H22V17H2Z"/></svg>',
		// X (fechar) — nó 7:554.
		'close'        => '<svg viewBox="0 0 12.6369 14" fill="currentColor"><path d="M8.32488 6.35652C8.0003 6.73186 8.00006 7.28844 8.3243 7.66407L12.3663 12.3466C12.9256 12.9945 12.4653 14 11.6093 14H11.3477C11.0568 14 10.7802 13.8733 10.5902 13.6528L6.95707 9.43729C6.55176 8.96701 5.82035 8.97585 5.42652 9.4558L1.99776 13.6343C1.80781 13.8658 1.52414 14 1.2247 14H1.02755C0.172646 14 -0.288066 12.9968 0.26906 12.3483L4.29518 7.66231C4.61742 7.28727 4.61717 6.73303 4.2946 6.35827L0.244027 1.65236C-0.313956 1.0041 0.146608 0 1.00194 0H1.2401C1.53068 0 1.8069 0.126396 1.99685 0.346294L5.65916 4.58588C6.06436 5.05496 6.79433 5.04618 7.18815 4.5675L10.6458 0.364674C10.8358 0.133783 11.1191 0 11.4181 0H11.635C12.4914 0 12.9515 1.00632 12.3914 1.65411L8.32488 6.35652Z"/></svg>',
		// download — nós 7:134 / 7:389.
		'download'     => '<svg viewBox="0 0 24 24" ' . $stroke_attrs . '><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>',
		// mail — nós 7:221 / 7:466.
		'mail'         => '<svg viewBox="0 0 24 24" ' . $stroke_attrs . '><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>',
		// map-pin — nós 7:224 / 7:469.
		'map-pin'      => '<svg viewBox="0 0 24 24" ' . $stroke_attrs . '><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
		// arrow-up — nós 7:207 / 7:482.
		'arrow-up'     => '<svg viewBox="0 0 24 24" ' . $stroke_attrs . '><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
		// Selo de check da lista de benefícios — nó 7:72.
		'check-badge'  => '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM14.8857 17.792L11.5693 14.6357L10.8799 15.3594L10.1904 16.084L14.2246 19.9238L14.9424 20.6074L15.6318 19.8955L21.8379 13.4961L20.4023 12.1035L14.8857 17.792Z"/></svg>',
		// Check em círculo do card "Transferido com Sucesso!" — nó 7:113.
		'check-circle' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 0.166667C17.9827 0.166667 22.8325 5.01674 22.8327 10.9997C22.8327 16.9828 17.9828 21.8327 11.9997 21.8327C6.01674 21.8325 1.16667 16.9827 1.16667 10.9997C1.16684 5.01685 6.01685 0.166843 11.9997 0.166667ZM11.9997 1.83268C6.93732 1.83286 2.83286 5.93732 2.83268 10.9997C2.83268 16.0622 6.93721 20.1665 11.9997 20.1667C17.0623 20.1667 21.1667 16.0623 21.1667 10.9997C21.1665 5.93721 17.0622 1.83268 11.9997 1.83268ZM17.7194 8.69401L11.9294 14.694L11.3063 15.3405L10.5964 14.7887L6.38639 11.5163L6.99967 10.7272L7.61296 9.93717L11.1139 12.6589L16.2799 7.30534L17.7194 8.69401Z"/></svg>',
		// bar-chart-2 do card "Renda Total" — nó 7:105.
		'bar-chart'    => '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"><path d="M15 16.6667V8.33333"/><path d="M10 16.6667V3.33333"/><path d="M5 16.6667V11.6667"/></svg>',
	);

	if ( ! isset( $icons[ $name ] ) ) {
		return;
	}

	$svg = $icons[ $name ];
	$svg = str_replace(
		'<svg ',
		'<svg aria-hidden="true" focusable="false"' . ( $class ? ' class="' . esc_attr( $class ) . '"' : '' ) . ' ',
		$svg
	);

	echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput -- SVG estático do tema.
}

/**
 * Logo da marca (nós 7:39 / 7:571) — altura fixa, largura acompanha.
 *
 * @param string $class    Classes extras no <a>.
 * @param bool   $priority true apenas no header (acima da dobra).
 */
function atual_logo( string $class = '', bool $priority = false ): void {
	?>
	<a href="#inicio" class="inline-flex shrink-0 rounded-sm<?php echo $class ? ' ' . esc_attr( $class ) : ''; ?>">
		<img
			src="<?php echo atual_asset( 'img/brand/logo-atual.png' ); ?>"
			alt="Atual"
			width="480"
			height="257"
			<?php echo $priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'; ?>
			class="h-[57px] w-auto xl:h-[5.1976vw]"
		/>
	</a>
	<?php
}

/**
 * Botão "Contato" com contorno ciano — nós 7:54 (header) e 7:555 (drawer).
 */
function atual_contact_link( string $class = '' ): void {
	// Sem display na base: quem chama decide (o Next resolvia o conflito
	// hidden × inline-flex com tailwind-merge; em CSS puro o último da
	// stylesheet venceria).
	$base = 'border-accent items-center gap-2 rounded-full border px-10 py-2 text-base leading-[1.1875] whitespace-nowrap text-white hover:bg-accent/10 transition-colors duration-200 xl:gap-[0.5857vw] xl:px-[2.9283vw] xl:py-[0.5857vw] xl:text-[1.1713vw]';
	?>
	<a href="#cadastro" class="<?php echo esc_attr( trim( $base . ' ' . $class ) ); ?>">
		<?php atual_icon( 'phone-call', 'size-6 shrink-0 xl:size-[1.757vw]' ); ?>
		Contato
	</a>
	<?php
}
