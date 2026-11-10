# Confirmação automática do pagamento PIX (Mercado Pago)

## O que você vai ver
- Depois de gerar o PIX em `/mercado-pago`, a página mostra o status "Aguardando pagamento".
- Quando o cliente paga, o status muda sozinho para "Pago" (sem recarregar).
- Botão "Verificar agora" para consultar o status manualmente.
- Bloqueio de clique duplo no botão de gerar cobrança (evita PIX duplicado).

## Como funciona
1. Ao gerar a cobrança, o ID do pagamento é guardado na página.
2. A página consulta o status a cada 5 segundos (por até 30 minutos) através de uma função do backend que pergunta ao Mercado Pago.
3. Ao receber "approved", mostra a confirmação e para de consultar. "rejected"/"cancelled"/"expired" mostram aviso.

## Detalhes técnicos
- Nova ação `status` na edge function `mercadopago-payment`: recebe `paymentId` + token e chama `GET /v1/payments/{id}`, devolvendo `status` e `status_detail`.
- Polling no `src/pages/MercadoPago.tsx` com `setInterval` limpo ao desmontar/finalizar; estado `loading` desativa o botão de gerar.
- Header `X-Idempotency-Key` único por cobrança na criação.
- Webhook do Mercado Pago (notificação servidor-a-servidor) fica fora por enquanto, pois exigiria guardar o token no backend em vez do navegador.
