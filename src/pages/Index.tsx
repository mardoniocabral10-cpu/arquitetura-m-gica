import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      <section className="container flex flex-col items-center justify-center gap-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Bem-vindo ao seu projeto
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Arquitetura pronta com autenticação, banco de dados e estrutura de componentes. 
          Envie o código de cada arquivo para personalizar.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/register">Criar Conta</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
