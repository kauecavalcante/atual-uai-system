# Atual — Landing Page em WordPress

Conversão fiel da landing Next.js (`atual-uai-system-main`) para um **tema WordPress clássico custom**. Figma de referência: **"Atual — One Page"** (o mesmo do projeto Next).

- `atual/` — o tema WordPress (é isto que vai para o servidor).
- `cf7/` — corpo do formulário e textos de e-mail/mensagens do Contact Form 7 (colar no admin).
- `package.json` — só o build local do CSS (Tailwind v4). **Nenhum Node no servidor.**

## Build do CSS

O visual inteiro vem de um único arquivo compilado (`atual/assets/css/main.css`), gerado a partir de `atual/assets/css/src/main.css` + classes utilitárias dos templates PHP e do `cf7/registration-form.txt`.

```bash
npm install
npm run build:css    # gera atual/assets/css/main.css (commitado)
npm run watch:css    # durante o desenvolvimento
```

**Regra de ouro:** mudou classe em `.php` ou no formulário do CF7 → atualize também o `cf7/registration-form.txt` (se for o form) e rode `npm run build:css` de novo.

## Visualização rápida (sem LocalWP)

Existe um WordPress local completo (SQLite, sem MySQL) em `.wp-local/` — fora do git:

```bash
.wp-local/start.sh          # sobe em http://localhost:8321
```

Admin: http://localhost:8321/wp-admin — usuário `atual`, senha `atual-local-2026` (só local).
Tema, plugins (CF7 + Honeypot + Flamingo) e o formulário "Cadastro Atual" já estão ativos.
Limitação: e-mails não são enviados (sem SMTP) — para testar o envio de verdade, use o LocalWP abaixo (Mailpit) ou o staging.

## Desenvolvimento local (LocalWP)

1. Instale o [LocalWP](https://localwp.com) e crie um site "atual" (PHP ≥ 8.1).
2. Symlink do tema:
   ```bash
   ln -s "$(pwd)/atual" ~/Local\ Sites/atual/app/public/wp-content/themes/atual
   ```
3. Ative o tema em Aparência → Temas.
4. **Configurações → Leitura** → "Uma página estática" → crie uma página "Home" vazia e selecione-a como página inicial.
5. Instale e ative os plugins: **Contact Form 7**, **Honeypot for Contact Form 7**, **Flamingo**, **WP Mail SMTP**.
6. Crie um formulário no CF7 com o título **exatamente** `Cadastro Atual`:
   - Aba *Formulário*: colar o conteúdo de `cf7/registration-form.txt`.
   - Abas *E-mail* e *Mensagens*: seguir `cf7/mail-e-mensagens.txt`.
7. Teste os e-mails com o Mailpit embutido do LocalWP (menu Tools → Mail).
8. Valide o visual **deslogado** (a admin bar desloca o header absoluto) comparando lado a lado com o projeto Next (`npm run dev` no repo original) em 360 / 1024 / 1280 / 1366 / 1920 px.

## Publicação no ambiente de testes (cPanel)

1. WordPress em subdomínio de staging (Softaculous), PHP ≥ 8.1, usuário forte (não `admin`).
2. Zipar e instalar o tema: `cd atual-wordpress && zip -r atual.zip atual -x '*/css/src/*' '*.DS_Store'` → Aparência → Temas → Enviar.
3. Plugins + formulário CF7 (mesmos passos do local).
4. **WP Mail SMTP**: conta de e-mail da própria hospedagem (`smtp.<dominio>`, porta 465/SSL) ou transacional. **Testar envio com os 5 anexos no tamanho máximo** — é onde limites de mailbox estouram (pior caso ≈ 27 MB).
5. **Limites PHP** (MultiPHP INI Editor do cPanel):
   ```
   upload_max_filesize = 8M
   post_max_size       = 40M
   max_file_uploads    = 20
   memory_limit        = 256M
   max_execution_time  = 120
   ```
6. Permalinks → "Nome do post". AutoSSL ativo e redirect HTTPS **antes** de qualquer HSTS.
7. Headers de segurança no `.htaccess` (réplica do `next.config.ts` original):
   ```apache
   <IfModule mod_headers.c>
     Header always set X-Content-Type-Options "nosniff"
     Header always set X-Frame-Options "DENY"
     Header always set Referrer-Policy "strict-origin-when-cross-origin"
     Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
     Header always set X-DNS-Prefetch-Control "on"
     # HSTS: NO STAGING deixe comentado ou com max-age curto.
     # Em produção (domínio definitivo, HTTPS validado):
     # Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
   </IfModule>
   ```
   Fallback já embutido no tema: `atual/inc/security-headers.php` (HSTS de 1 dia sobre HTTPS — subir para o valor de produção no go-live).
8. **Staging fora do Google**: Configurações → Leitura → "Desencorajar mecanismos de busca" (desmarcar só na produção) e, se possível, senha no diretório (cPanel → Directory Privacy).
9. Smoke test: envio real do formulário com anexos, CNPJ inválido/válido, honeypot, drawer no iOS/Android, âncoras do menu, voltar ao topo, Lighthouse.

## Pendências com o cliente

- [ ] Acessos da hospedagem/cPanel do ambiente de testes.
- [ ] **PDF da lista de documentos** → salvar em `atual/assets/docs/lista-de-documentos-atual.pdf` (o botão "Baixar lista" ativa sozinho quando o arquivo existir).
- [ ] Confirmar e-mail de destino do formulário (hoje: `financeiro@atualsecuritizadora.com.br`).
- [ ] URLs reais de "Assinatura de Documentos" e "Sistemas de Operações" (`atual/header.php`) e das páginas legais (`atual/footer.php`).

## Notas de arquitetura

- Os templates PHP espelham 1:1 os componentes do projeto Next (mesmas classes utilitárias) — o README do repo original documenta as decisões de design (tokens, escala proporcional a 1366px, drawer `<dialog>`, art direction do `<picture>`, unidade `--u` via `cqh`).
- Validação de CNPJ/telefone roda **no servidor** (`atual/inc/cf7-cnpj.php`, filtros `wpcf7_validate_*`); as máscaras de `assets/js/form-mask.js` são só conveniência.
- O CF7 **apaga os anexos após enviar o e-mail** — se o SMTP falhar em silêncio, os arquivos se perdem. Manter o log do WP Mail SMTP ativo e o Flamingo instalado (guarda os dados de texto).
- Fonte Inter variable auto-hospedada em `atual/assets/fonts/inter/` (sem CDN do Google — LGPD).
