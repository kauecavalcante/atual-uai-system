/**
 * Máscaras de CNPJ e telefone do formulário de cadastro — porta de
 * src/lib/validation/cnpj.ts do projeto Next. Conveniência de digitação:
 * a validação que vale é a do servidor (inc/cf7-cnpj.php).
 */
(function () {
	"use strict";

	function onlyDigits(value) {
		return value.replace(/\D/g, "");
	}

	/** Formata 14 dígitos como 00.000.000/0000-00. */
	function formatCnpj(value) {
		var digits = onlyDigits(value).slice(0, 14);
		return digits
			.replace(/^(\d{2})(\d)/, "$1.$2")
			.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
			.replace(/\.(\d{3})(\d)/, ".$1/$2")
			.replace(/(\d{4})(\d)/, "$1-$2");
	}

	/** (00) 0000-0000 para fixo, (00) 0 0000-0000 para celular. */
	function formatPhone(value) {
		var digits = onlyDigits(value).slice(0, 11);
		if (digits.length <= 10) {
			return digits
				.replace(/^(\d{2})(\d)/, "($1) $2")
				.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
		}
		return digits
			.replace(/^(\d{2})(\d)/, "($1) $2")
			.replace(/^(\(\d{2}\) \d)(\d)/, "$1 $2")
			.replace(/(\d{4})(\d{4})$/, "$1-$2");
	}

	function applyMask(input, formatter) {
		input.addEventListener("input", function () {
			var formatted = formatter(input.value);
			if (input.value !== formatted) input.value = formatted;
		});
	}

	var cnpj = document.querySelector('input[name="cnpj"]');
	if (cnpj) {
		cnpj.setAttribute("inputmode", "numeric");
		cnpj.setAttribute("maxlength", "18");
		applyMask(cnpj, formatCnpj);
	}

	var phone = document.querySelector('input[name="telefone"]');
	if (phone) {
		phone.setAttribute("inputmode", "tel");
		phone.setAttribute("maxlength", "16");
		applyMask(phone, formatPhone);
	}
})();
