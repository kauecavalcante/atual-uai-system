<?php
/**
 * <head>, skip link e header do site.
 *
 * Espelha src/app/layout.tsx + components/layout/site-header/* do projeto
 * Next. O header se sobrepõe ao hero (absolute, transparente); o hero
 * reserva a altura dele no próprio padding-top.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Menu principal — mesma lista no header desktop (nó 7:40) e no drawer
 * (nó 7:560). "Assinatura de Documentos" e "Sistemas de Operações" apontam
 * para portais ainda sem URL definida: trocar os href quando informados.
 */
$atual_nav = array(
	array( 'label' => 'Home', 'href' => '#inicio', 'highlighted' => false ),
	array( 'label' => 'Serviços', 'href' => '#servicos', 'highlighted' => false ),
	array( 'label' => 'Cadastro', 'href' => '#cadastro', 'highlighted' => true ),
	array( 'label' => 'Assinatura de Documentos', 'href' => '#assinatura-de-documentos', 'highlighted' => true ),
	array( 'label' => 'Sistemas de Operações', 'href' => '#sistemas-de-operacoes', 'highlighted' => true ),
);

$atual_description = 'Transformamos sua venda a prazo em dinheiro à vista. Antecipe seus recebíveis, otimize o fluxo de caixa e eleve a performance dos seus recursos financeiros.';
$atual_title       = 'Atual — Antecipação de recebíveis para o seu negócio';
?>
<!doctype html>
<html <?php language_attributes(); ?> class="h-full">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#1b449d" />
	<meta name="color-scheme" content="light" />
	<?php if ( is_front_page() ) : ?>
	<meta name="description" content="<?php echo esc_attr( $atual_description ); ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:site_name" content="Atual" />
	<meta property="og:title" content="<?php echo esc_attr( $atual_title ); ?>" />
	<meta property="og:description" content="<?php echo esc_attr( $atual_description ); ?>" />
	<meta property="og:url" content="<?php echo esc_url( home_url( '/' ) ); ?>" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="<?php echo esc_attr( $atual_title ); ?>" />
	<meta name="twitter:description" content="<?php echo esc_attr( $atual_description ); ?>" />
	<?php endif; ?>
	<link rel="icon" href="<?php echo atual_asset( 'img/favicon.ico' ); ?>" sizes="32x32" />
	<link rel="preload" href="<?php echo atual_asset( 'fonts/inter/InterVariable.woff2' ); ?>" as="font" type="font/woff2" crossorigin />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'flex min-h-full flex-col' ); ?>>
<?php wp_body_open(); ?>

<a href="#conteudo" class="text-brand sr-only rounded-full bg-white px-4 py-2 font-bold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50">
	Pular para o conteúdo
</a>

<?php /* Fixo e transparente no topo; ao scrollar, header-scroll.js adiciona
	.is-scrolled e o CSS aplica a faixa de vidro azul (ver main.css). */ ?>
<header id="site-header" class="site-header fixed inset-x-0 top-0 z-40">
	<div class="flex items-center justify-between h-[97px] px-5 xl:h-[9.3704vw] xl:px-[3.5139vw]">
		<?php atual_logo( '', true ); ?>

		<nav aria-label="Principal" class="hidden items-center xl:flex xl:gap-[1.1713vw] xl:p-[0.5857vw]">
			<?php foreach ( $atual_nav as $item ) : ?>
				<a
					href="<?php echo esc_url( $item['href'] ); ?>"
					class="relative flex items-center whitespace-nowrap text-white p-[0.5857vw] text-[1.1713vw] leading-[1.1875] transition-opacity duration-200 hover:opacity-80<?php echo $item['highlighted'] ? ' font-bold' : ''; ?>"
				>
					<?php echo esc_html( $item['label'] ); ?>
					<?php if ( $item['highlighted'] ) : ?>
						<span aria-hidden="true" class="bg-accent absolute inset-x-[0.7321vw] -bottom-[1.5px] h-[3px] rounded-full"></span>
					<?php endif; ?>
				</a>
			<?php endforeach; ?>
		</nav>

		<?php atual_contact_link( 'hidden xl:inline-flex' ); // display só entra em xl ?>

		<div class="xl:hidden">
			<button
				type="button"
				id="site-drawer-open"
				aria-label="Abrir menu"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-controls="site-drawer"
				class="text-accent -mr-2 grid size-11 place-items-center rounded-full"
			>
				<?php atual_icon( 'menu', 'size-6' ); ?>
			</button>

			<dialog
				id="site-drawer"
				aria-label="Menu principal"
				class="site-drawer bg-brand w-[278px] max-w-[85vw] text-white"
			>
				<div class="flex h-full flex-col px-[30px] pt-[27px]">
					<?php atual_logo( 'self-start' ); ?>

					<button
						type="button"
						data-drawer-close
						aria-label="Fechar menu"
						class="text-accent absolute top-[5px] right-2 grid size-11 place-items-center rounded-full"
					>
						<?php atual_icon( 'close', 'h-[14px] w-auto' ); ?>
					</button>

					<nav aria-label="Principal" class="mt-[35px]">
						<ul>
							<?php foreach ( $atual_nav as $item ) : ?>
								<li>
									<a
										href="<?php echo esc_url( $item['href'] ); ?>"
										class="hover:text-accent flex w-[226px] items-center py-2 text-base leading-[1.1875] transition-colors duration-200"
									>
										<?php echo esc_html( $item['label'] ); ?>
									</a>
								</li>
							<?php endforeach; ?>
						</ul>
					</nav>

					<?php atual_contact_link( 'inline-flex mt-6 w-[226px] justify-center' ); ?>
				</div>
			</dialog>
		</div>
	</div>
</header>
