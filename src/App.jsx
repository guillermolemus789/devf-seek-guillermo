import PromptForm from "./components/PromptForm";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            FrontEnd Avanzado
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Devf<span className="text-cyan-400">Seek</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Proyecto construido con React, Tailwind CSS y React Hook Form.
          </p>
        </header>

        <PromptForm />

        <footer className="mt-12 text-center text-sm text-slate-500">
          Parte 1 · React + Tailwind CSS + React Hook Form
        </footer>
      </div>
    </main>
  );
}

export default App;