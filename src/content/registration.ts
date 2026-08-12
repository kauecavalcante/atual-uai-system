import type { RichSegment } from "@/components/ui/rich-text";
import type { RegistrationField } from "@/lib/validation/registration";

/**
 * Textos da seção de cadastro — transcritos do Figma
 * (nós 7:125, 7:127, 7:130, 7:133, 7:139 e 7:141…7:204;
 * comps mobile 7:381, 7:382, 7:385, 7:388, 7:394 e 7:396…7:457).
 */

export type TextFieldSpec = {
  readonly name: Extract<
    RegistrationField,
    "cnpj" | "company" | "tradeName" | "phone" | "email"
  >;
  readonly label: string;
  readonly placeholder: string;
  readonly type: "text" | "tel" | "email";
  /** `autocomplete` correto reduz atrito e erro de digitação. */
  readonly autoComplete: string;
  readonly inputMode?: "text" | "tel" | "email" | "numeric";
  /** Ocupa a linha inteira também no desktop (nós 7:150 e 7:179). */
  readonly fullWidth?: boolean;
};

export type FileFieldSpec = {
  readonly name: Extract<
    RegistrationField,
    | "articlesOfAssociation"
    | "latestAmendment"
    | "financialStatements"
    | "proofOfAddress"
    | "identityDocument"
  >;
  readonly label: string;
  readonly fullWidth?: boolean;
};

export const registrationContent = {
  title: [
    { text: "Cadastre-se e seja um cliente " },
    { text: "ATUAL", emphasis: "brand" },
  ] satisfies readonly RichSegment[],

  subtitle:
    "Preencha os campos abaixo e, em breve, um dos nossos especialistas vai entrar em contato com você.",

  checklist: {
    notice: [
      { text: "ATENÇÃO:", emphasis: "brand" },
      {
        text: " clique para fazer o download da lista de documentos exigidos para o cadastro.",
      },
    ] satisfies readonly RichSegment[],
    downloadLabel: "Baixar lista",
    /**
     * O wireframe não traz o arquivo. Coloque o PDF em `public/documentos/`
     * com este nome — ou troque o caminho — antes de publicar.
     */
    downloadHref: "/documentos/lista-de-documentos.pdf",
    downloadFileName: "lista-de-documentos-atual.pdf",
    note: "Após baixar e organizá-los, preencha o formulário e não esqueça de anexar a documentação ao lado.",
  },

  form: {
    documentsHeading: "Você Sócio, anexe sua documentação aqui!",
    submitLabel: "Enviar",

    textFields: [
      {
        name: "cnpj",
        label: "CNPJ",
        placeholder: "CNPJ",
        type: "text",
        autoComplete: "organization-tax-id",
        inputMode: "numeric",
      },
      {
        name: "company",
        label: "Empresa",
        placeholder: "Empresa",
        type: "text",
        autoComplete: "organization",
      },
      {
        name: "tradeName",
        label: "Nome fantasia",
        placeholder: "Nome fantasia",
        type: "text",
        autoComplete: "off",
        fullWidth: true,
      },
      {
        name: "phone",
        label: "Telefone",
        placeholder: "Telefone",
        type: "tel",
        autoComplete: "tel",
        inputMode: "tel",
      },
      {
        name: "email",
        label: "E-mail",
        placeholder: "E-mail",
        type: "email",
        autoComplete: "email",
        inputMode: "email",
      },
    ] satisfies readonly TextFieldSpec[],

    fileFields: [
      { name: "articlesOfAssociation", label: "Contrato social" },
      { name: "latestAmendment", label: "Alteração contratual mais recente" },
      {
        name: "financialStatements",
        label: "Faturamento e balanço dos último ano dos sócios",
        fullWidth: true,
      },
      { name: "proofOfAddress", label: "Comprovante de residencia" },
      { name: "identityDocument", label: "RG ou CNH" },
    ] satisfies readonly FileFieldSpec[],
  },
} as const;
