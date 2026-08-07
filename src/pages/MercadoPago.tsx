import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TOKEN_KEY = "mp_access_token";

interface ChargeResult {
  id: number;
  status: string;
  status_detail?: string;
  amount: number;
  qr_code: string | null;
  qr_code_base64: string | null;
  ticket_url: string | null;
}

const MercadoPago = () => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? "");
  const [amount, setAmount] = useState("10.00");
  const [description, setDescription] = useState("Cobrança de teste");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChargeResult | null>(null);

  const saveToken = () => {
    localStorage.setItem(TOKEN_KEY, accessToken.trim());
    toast.success("Token salvo neste navegador");
  };

  const createCharge = async () => {
    setLoading(true);
    setResult(null);
    const { data, error } = await supabase.functions.invoke("mercadopago-payment", {
      body: {
        accessToken: accessToken.trim(),
        amount: Number(amount.replace(",", ".")),
        description,
        email,
        cpf,
      },
    });
    setLoading(false);

    if (error) {
      toast.error("Não foi possível gerar a cobrança. Verifique o token e os dados.");
      return;
    }
    if ((data as { error?: string })?.error) {
      toast.error((data as { error: string }).error);
      return;
    }
    setResult(data as ChargeResult);
    toast.success("Cobrança PIX criada!");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Helmet>
        <title>Mercado Pago — Configurar token e gerar cobrança PIX</title>
        <meta
          name="description"
          content="Configure seu Access Token do Mercado Pago e gere uma cobrança PIX real com QR Code em segundos."
        />
        <link rel="canonical" href="/mercado-pago" />
      </Helmet>

      <h1 className="text-3xl font-bold">Mercado Pago</h1>
      <p className="mt-2 text-muted-foreground">
        Configure seu token e gere uma cobrança PIX real. O token fica salvo apenas neste navegador.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>1. Configuração do token</CardTitle>
          <CardDescription>
            Use o Access Token da sua conta (Produção para cobranças reais, TEST para testes).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Access Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="APP_USR-..."
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={saveToken} disabled={!accessToken.trim()}>
            Salvar token
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>2. Gerar cobrança PIX</CardTitle>
          <CardDescription>Preencha os dados do pagamento.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail do pagador</Label>
              <Input
                id="email"
                type="email"
                placeholder="cliente@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF do pagador (opcional)</Label>
            <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <Button onClick={createCharge} disabled={loading}>
            {loading ? "Gerando..." : "Gerar cobrança"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Cobrança criada</CardTitle>
            <CardDescription>
              ID {result.id} · status {result.status}
              {result.status_detail ? ` (${result.status_detail})` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.qr_code_base64 && (
              <img
                src={`data:image/png;base64,${result.qr_code_base64}`}
                alt="QR Code PIX da cobrança do Mercado Pago"
                className="h-56 w-56 rounded-md border"
                loading="lazy"
              />
            )}
            {result.qr_code && (
              <div className="space-y-2">
                <Label htmlFor="copiacola">PIX copia e cola</Label>
                <Textarea id="copiacola" readOnly value={result.qr_code} rows={4} />
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(result.qr_code!);
                    toast.success("Código copiado");
                  }}
                >
                  Copiar código
                </Button>
              </div>
            )}
            {result.ticket_url && (
              <a
                href={result.ticket_url}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                Abrir comprovante no Mercado Pago
              </a>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default MercadoPago;
