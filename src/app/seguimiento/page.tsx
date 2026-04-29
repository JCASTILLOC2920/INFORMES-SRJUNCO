import SeguimientoClientWrapper from "@/components/public/SeguimientoClientWrapper";

export const metadata = {
  title: "Rastreo de Muestras Nacional | JC PATH LAB",
  description: "Siga el estado de su biopsia o Papanicolaou enviado desde provincia en tiempo real."
};

export default function SeguimientoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SeguimientoClientWrapper />
    </main>
  );
}
