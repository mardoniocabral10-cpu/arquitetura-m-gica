import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Download, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";

const EXAMPLE = `// Cole aqui interfaces TypeScript ou schemas Zod
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface Post {
  id: string;
  userId: string; // FK -> User
  title: string;
  body: string;
  publishedAt: Date;
}

interface Comment {
  id: string;
  postId: string; // FK -> Post
  userId: string; // FK -> User
  content: string;
}`;

mermaid.initialize({ startOnLoad: false, theme: "dark", securityLevel: "loose" });

export default function SchemaGenerator() {
  const [code, setCode] = useState(EXAMPLE);
  const [mermaidCode, setMermaidCode] = useState("");
  const [loading, setLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mermaidCode || !previewRef.current) return;
    const el = previewRef.current;
    el.innerHTML = `<div class="mermaid">${mermaidCode}</div>`;
    mermaid.run({ nodes: [el.querySelector(".mermaid") as HTMLElement] }).catch((err) => {
      el.innerHTML = `<pre class="text-destructive text-xs whitespace-pre-wrap">Erro ao renderizar: ${err?.message ?? err}\n\n${mermaidCode}</pre>`;
    });
  }, [mermaidCode]);

  const generate = async () => {
    if (!code.trim()) {
      toast.error("Cole algum código primeiro");
      return;
    }
    setLoading(true);
    setMermaidCode("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-er-schema", {
        body: { code },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (!data?.mermaid) throw new Error("Resposta vazia da IA");
      setMermaidCode(data.mermaid);
      toast.success("Diagrama gerado!");
    } catch (e: any) {
      toast.error(e?.message ?? "Falha ao gerar diagrama");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const blob = new Blob([mermaidCode], { type: "text/vnd.mermaid" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.mmd";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Gerador de Esquema ER | Nexo</title>
        <meta name="description" content="Gere diagramas ER em Mermaid a partir de modelos TypeScript ou schemas Zod usando IA." />
      </Helmet>
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Gerador de Esquema ER</h1>
          <p className="text-muted-foreground">Cole modelos TypeScript / Zod e gere um diagrama ER com IA.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4 flex flex-col gap-3">
            <label className="text-sm font-medium">Código de entrada</label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-xs min-h-[400px] resize-y"
              spellCheck={false}
            />
            <Button onClick={generate} disabled={loading} className="self-start">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Gerar diagrama
            </Button>
          </Card>

          <Card className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Diagrama ER</label>
              {mermaidCode && (
                <Button size="sm" variant="outline" onClick={download}>
                  <Download className="mr-2 h-4 w-4" /> .mmd
                </Button>
              )}
            </div>
            <div
              ref={previewRef}
              className="min-h-[400px] rounded-md border bg-muted/30 p-4 overflow-auto flex items-center justify-center"
            >
              {!mermaidCode && !loading && (
                <p className="text-sm text-muted-foreground">O diagrama aparecerá aqui.</p>
              )}
              {loading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
            </div>
            {mermaidCode && (
              <details className="text-xs">
                <summary className="cursor-pointer text-muted-foreground">Ver código Mermaid</summary>
                <pre className="mt-2 p-3 bg-muted rounded overflow-auto">{mermaidCode}</pre>
              </details>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
