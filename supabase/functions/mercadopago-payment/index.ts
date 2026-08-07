import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

interface Body {
  accessToken?: string
  amount?: number
  description?: string
  email?: string
  firstName?: string
  lastName?: string
  cpf?: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  try {
    const body = (await req.json()) as Body
    const accessToken = (body.accessToken || Deno.env.get('MERCADOPAGO_ACCESS_TOKEN') || '').trim()
    const amount = Number(body.amount)
    const description = (body.description || '').trim()
    const email = (body.email || '').trim()

    const errors: string[] = []
    if (!accessToken) errors.push('Access Token do Mercado Pago é obrigatório')
    else if (!/^(APP_USR|TEST)-[\w-]{10,}/.test(accessToken))
      errors.push('Access Token inválido: deve começar com "APP_USR-" (produção) ou "TEST-" (teste)')
    if (!Number.isFinite(amount) || amount < 0.5) errors.push('Valor deve ser no mínimo R$ 0,50')
    if (description.length < 1 || description.length > 255) errors.push('Descrição inválida')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('E-mail do pagador inválido')
    if (errors.length) return json({ error: errors.join(' | ') }, 400)

    const payload = {
      transaction_amount: Math.round(amount * 100) / 100,
      description,
      payment_method_id: 'pix',
      payer: {
        email,
        first_name: body.firstName?.trim() || undefined,
        last_name: body.lastName?.trim() || undefined,
        identification: body.cpf?.replace(/\D/g, '')
          ? { type: 'CPF', number: body.cpf.replace(/\D/g, '') }
          : undefined,
      },
    }

    const res = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('Mercado Pago error', res.status, data)
      const message =
        res.status === 401 || res.status === 403
          ? 'Access Token recusado pelo Mercado Pago. Copie novamente o token em Suas integrações > Credenciais.'
          : data?.message || 'Falha ao criar cobrança no Mercado Pago'
      return json({ error: message, details: data }, 400)
    }

    const tx = data?.point_of_interaction?.transaction_data ?? {}
    return json({
      id: data.id,
      status: data.status,
      status_detail: data.status_detail,
      amount: data.transaction_amount,
      qr_code: tx.qr_code ?? null,
      qr_code_base64: tx.qr_code_base64 ?? null,
      ticket_url: tx.ticket_url ?? null,
      date_of_expiration: data.date_of_expiration ?? null,
    })
  } catch (e) {
    console.error('mercadopago-payment fatal', e)
    return json({ error: 'Erro inesperado ao processar a cobrança' }, 500)
  }
})
