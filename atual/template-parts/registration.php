<?php
/**
 * Seção 3 — Cadastro (Figma: frames 7:123, 7:128 e 7:140 desktop;
 * 7:380, 7:383 e 7:395 mobile). Espelha sections/registration/*.
 *
 * Calha de 48px (3.5139vw), a mesma do header e do hero.
 * z-10: o card do formulário passa por cima da faixa azul do rodapé
 * (que sobe com margem negativa e fica em z-0).
 *
 * O formulário em si é o Contact Form 7 com o título "Cadastro Atual" —
 * corpo versionado em /cf7/registration-form.txt (colar no admin do CF7).
 */

defined( 'ABSPATH' ) || exit;

/**
 * PDF com a lista de documentos exigidos. O wireframe não traz o arquivo:
 * colocar o PDF real em assets/docs/lista-de-documentos-atual.pdf assim que
 * o cliente enviar (enquanto não existir, o link aponta para a âncora da
 * própria seção para não quebrar).
 */
$atual_checklist_pdf = file_exists( get_theme_file_path( 'assets/docs/lista-de-documentos-atual.pdf' ) )
	? atual_asset( 'docs/lista-de-documentos-atual.pdf' )
	: '#cadastro';
?>

<section id="cadastro" aria-labelledby="registration-title" class="relative z-10">
	<div class="px-5 lg:px-[3.5139vw]">
		<div class="text-ink text-center">
			<?php /* Sem largura máxima: no mobile quebra em 2 linhas na própria calha e no desktop cabe em 1. */ ?>
			<h2 id="registration-title" class="text-[max(32px,3.0747vw)] leading-none font-medium">
				<span>Cadastre-se e seja um cliente </span><strong class="font-bold text-brand">ATUAL</strong>
			</h2>

			<p class="mx-auto mt-3 text-[max(18px,1.3177vw)] leading-[1.21] lg:mt-[1.1713vw] lg:max-w-[39.92%]">
				Preencha os campos abaixo e, em breve, um dos nossos especialistas vai entrar em contato com você.
			</p>
		</div>

		<div class="mt-[30px] grid gap-y-[21px] lg:mt-[3.5139vw] lg:grid-cols-[25.748%_1fr] lg:gap-x-[8.189%] lg:gap-y-0">
			<?php /* Coluna "download-lista" (frames 7:128 / 7:383). */ ?>
			<div class="text-ink lg:pt-[6.0029vw]">
				<?php /* 27px, não os 28px do comp: com as métricas reais da Inter, 28px quebra em 5 linhas onde o Figma mostra 4. */ ?>
				<p class="text-[max(18px,1.9766vw)] leading-[1.25]">
					<strong class="font-bold text-brand">ATENÇÃO:</strong><span> clique para fazer o download da lista de documentos exigidos para o cadastro.</span>
				</p>

				<?php /* Botão "Baixar lista" — variantes primary + checklist de ui/button.tsx. */ ?>
				<a
					href="<?php echo esc_url( $atual_checklist_pdf ); ?>"
					<?php echo '#cadastro' !== $atual_checklist_pdf ? 'download="lista-de-documentos-atual.pdf"' : ''; ?>
					class="inline-flex items-center justify-center rounded-full whitespace-nowrap uppercase transition-[filter,transform,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bg-accent text-brand shadow-[0_2px_1px_0_rgba(27,68,157,0.25)] lg:shadow-[0_4px_2px_0_rgba(27,68,157,0.25)] hover:brightness-105 h-[48px] w-full gap-2.5 px-[30px] text-[18px] font-bold lg:w-[218px] mt-6"
				>
					Baixar lista
					<?php atual_icon( 'download', 'size-6 shrink-0' ); ?>
				</a>

				<p class="mt-6 text-[16px] leading-[1.21]">
					Após baixar e organizá-los, preencha o formulário e não esqueça de anexar a documentação ao lado.
				</p>
			</div>

			<?php /* Formulário — Contact Form 7. */ ?>
			<div>
				<?php
				if ( function_exists( 'wpcf7' ) ) {
					echo do_shortcode( '[contact-form-7 title="Cadastro Atual"]' );
				} else {
					echo '<div class="bg-accent rounded-[20px] px-5 py-10 lg:px-10 lg:py-20"><p class="text-brand rounded-lg bg-white px-4 py-3 text-[15px] leading-[1.35] font-medium">Formulário indisponível no momento. Fale com a gente: <a class="underline" href="mailto:financeiro@atualsecuritizadora.com.br">financeiro@atualsecuritizadora.com.br</a></p></div>';
				}
				?>
			</div>
		</div>
	</div>
</section>
