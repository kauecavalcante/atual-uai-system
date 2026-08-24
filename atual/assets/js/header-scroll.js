/**
 * Header fixo: alterna a classe .is-scrolled (faixa de vidro azul, ver
 * main.css) quando a página sai do topo. Listener passivo e com estado —
 * só toca o DOM quando o limiar é cruzado.
 */
(function () {
	"use strict";

	var header = document.getElementById("site-header");
	if (!header) return;

	var THRESHOLD = 24;
	var scrolled = false;

	function update() {
		var next = window.scrollY > THRESHOLD;
		if (next === scrolled) return;
		scrolled = next;
		header.classList.toggle("is-scrolled", next);
	}

	window.addEventListener("scroll", update, { passive: true });
	// Cobre página aberta já fora do topo (âncora, reload no meio do scroll).
	update();
})();
