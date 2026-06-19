# Teste: consistência do texto vermelho neon

Adicionar um novo arquivo de teste que valida, via parsing do `src/index.css`, que a cor do texto (`--foreground`, `--card-foreground`, `--popover-foreground`) é `0 100% 55%` em ambos os temas — garantindo o mesmo tom em login, dashboard e páginas públicas.

## Arquivo a criar

`src/test/neon-text-color.test.ts`

## Asserções

1. `:root` (tema claro — usado em login e páginas públicas):
   - `--foreground` === `0 100% 55%`
   - `--card-foreground` === `0 100% 55%`
   - `--popover-foreground` === `0 100% 55%`
2. `.dark` (tema escuro — usado no dashboard):
   - mesmas três variáveis === `0 100% 55%`
3. Consistência cruzada: valores em `:root` e `.dark` são idênticos.
4. `html, body, #root` aplica `text-foreground` globalmente (cobertura de todas as rotas).

## Detalhes técnicos

- Lê `src/index.css` com `fs.readFileSync`.
- Extrai blocos `:root { ... }` e `.dark { ... }` via regex e cada variável CSS individual.
- Usa Vitest já configurado (`vitest.config.ts`, ambiente jsdom).
- Roda com `bunx vitest run src/test/neon-text-color.test.ts`.

Sem mudanças em componentes ou estilos — apenas adição do teste.
