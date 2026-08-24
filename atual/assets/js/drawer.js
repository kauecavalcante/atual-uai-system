/**
 * Drawer do menu mobile — porta vanilla de site-header/mobile-menu.tsx.
 *
 * O <dialog> nativo em modo modal entrega aprisionamento de foco, Escape e
 * inércia do fundo; a animação de entrada/saída vive no CSS (.site-drawer,
 * @starting-style + allow-discrete). Aqui só abre/fecha e trava o scroll.
 */
(function () {
	"use strict";

	var dialog = document.getElementById("site-drawer");
	var openButton = document.getElementById("site-drawer-open");
	if (!dialog || !openButton || typeof dialog.showModal !== "function") return;

	function setExpanded(value) {
		openButton.setAttribute("aria-expanded", value ? "true" : "false");
	}

	openButton.addEventListener("click", function () {
		dialog.showModal();
		setExpanded(true);
		// Impede o scroll do fundo enquanto o drawer está aberto.
		document.body.style.overflow = "hidden";
	});

	// `close` cobre todos os caminhos de fechamento (Escape incluso).
	dialog.addEventListener("close", function () {
		setExpanded(false);
		document.body.style.overflow = "";
	});

	// Cliques no ::backdrop chegam no próprio <dialog>, fora da sua caixa.
	dialog.addEventListener("click", function (event) {
		if (event.target !== dialog) return;

		var rect = dialog.getBoundingClientRect();
		var inside =
			event.clientX >= rect.left &&
			event.clientX <= rect.right &&
			event.clientY >= rect.top &&
			event.clientY <= rect.bottom;

		if (!inside) dialog.close();
	});

	// Links do menu e botão de fechar encerram o drawer.
	dialog
		.querySelectorAll("a, [data-drawer-close]")
		.forEach(function (element) {
			element.addEventListener("click", function () {
				dialog.close();
			});
		});
})();
