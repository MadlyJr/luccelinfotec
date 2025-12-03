# Luccel Infotec - Site

Este repositório contém um site estático simples (HTML/CSS/JS) pronto para publicar no GitHub Pages.

Estrutura esperada:

- `index.html` (na raiz)
- `assets/` (pasta com `style.css`, `script.js`, imagens como `logo.png`, `bg.png`, `merchan.png`, `gqr.png`)

Recomendações importantes:
- GitHub é case-sensitive para nomes de arquivos. Verifique `assets/bg.png` vs `assets/BG.png`.
- O CSS em `assets/style.css` referencia `bg.png` relativamente ao arquivo CSS — portanto coloque `bg.png` em `assets/`.

## Como publicar (GitHub Pages)

1. Crie um repositório no GitHub (por exemplo `USERNAME/REPO`).
2. No seu projeto local, execute (PowerShell):

```powershell
cd d:\Sites\SITE-LUCCEL
git init
git add .
git commit -m "Site Luccel Infotec - initial"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

3. No GitHub (web): `Settings` → `Pages` → `Source` escolha `Branch: main` e `Folder: / (root)` e clique em `Save`.
   - Aguarde alguns minutos até o site ficar disponível em `https://USERNAME.github.io/REPO/`.

## Como testar localmente

Se você só precisa abrir o arquivo, dê um duplo-clique em `index.html` ou execute no PowerShell:

```powershell
ii .\index.html
```

Para servir via HTTP (melhor para testar rotas e fetches), use Python (instalado na máquina):

```powershell
cd d:\Sites\SITE-LUCCEL
python -m http.server 8080
# abra http://localhost:8080 no navegador
```

## Notas de Acessibilidade e Compatibilidade
- O site inclui foco por teclado nos cards e suporte a `prefers-reduced-motion`.
- Teste em diferentes navegadores (Chrome, Edge, Firefox) para garantir consistência.

## Alterações e manutenção
- Atualize imagens na pasta `assets/` quando necessário.
- Para domínio personalizado: adicione um arquivo `CNAME` com seu domínio na raiz do repositório e configure DNS (A e/ou CNAME) conforme a documentação do GitHub Pages.

Se quiser, eu posso:
- criar automaticamente o repositório no GitHub via `gh` CLI e enviar os comandos prontos,
- adicionar CI/CD ou integração com Netlify/Vercel,
- ou criar um `CNAME` e instruções DNS para um domínio personalizado.
