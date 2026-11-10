# Fundo branco

## O que vai mudar
- Deixar o fundo branco no login, dashboard e páginas públicas, nos temas claro e escuro.
- Manter o texto vermelho atual e não alterar cobranças ou outras funcionalidades.

## Detalhes técnicos
- Atualizar os tokens `--background`, `--card` e `--popover` para `0 0% 100%` em `:root` e `.dark` no CSS global.
- Ajustar o teste de consistência do fundo para o novo valor e executar os testes relevantes.
- Conferir as páginas em telas de computador e celular.

## Sobre o erro informado
- `src/hooks/use-mobile.tsx` já contém `import * as React from "react"`, e a configuração usa `react-jsx`.
- Os registros disponíveis não reproduzem o TS2686; não há correção comprovada a aplicar nesse arquivo.
- Se o erro reaparecer, investigar a mensagem completa antes de alterar o código.

Nenhum código do aplicativo será alterado antes da aprovação deste plano, conforme solicitado no anexo.
