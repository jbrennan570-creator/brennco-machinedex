import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowLeft, BookOpen, Camera, ChevronRight, Cpu, FileText, Gauge, Search, Shield, Wrench } from "lucide-react";
import machinesData from "./data/machines.json";
import type { Machine } from "./types";
import "./styles.css";

const machines = machinesData as Machine[];
const tabs = ["Overview", "Specs", "Photos", "Documentation"] as const;
type Tab = (typeof tabs)[number];

function App() {
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(machines[0].id);
  const [activeTab, setActiveTab] = React.useState<Tab>("Overview");
  const selectedMachine = machines.find((machine) => machine.id === selectedId) ?? machines[0];
  const filteredMachines = machines.filter((machine) => {
    const searchable = `${machine.id} ${machine.name} ${machine.type} ${machine.manufacturer} ${machine.category} ${machine.capability}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });
  const grouped = filteredMachines.reduce<Record<string, Machine[]>>((acc, machine) => {
    acc[machine.category] = [...(acc[machine.category] ?? []), machine];
    return acc;
  }, {});
  const handleSelect = (machine: Machine) => {
    setSelectedId(machine.id);
    setActiveTab("Overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-carbon text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(0,213,255,0.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(247,201,72,0.12),transparent_24%),linear-gradient(135deg,#080a0d_0%,#10151c_50%,#050608_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(360px,440px)_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <Header query={query} setQuery={setQuery} total={filteredMachines.length} />
          <div className="mt-4 max-h-none overflow-y-auto pr-1 lg:h-[calc(100vh-17.5rem)]">
            {Object.keys(grouped).length === 0 ? <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-sm text-steel">No machine records match that scan.</div> : Object.entries(grouped).map(([category, categoryMachines]) => <MachineCategory key={category} category={category} machines={categoryMachines} selectedId={selectedId} onSelect={handleSelect} />)}
          </div>
        </aside>
        <MachineDetail machine={selectedMachine} activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
    </main>
  );
}

function Header({ query, setQuery, total }: { query: string; setQuery: (query: string) => void; total: number }) {
  return (
    <header className="rounded-lg border border-white/10 bg-black/40 p-5 shadow-glow backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.34em] text-arc">Machine Registry</p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-white sm:text-5xl">Brennco MachineDex</h1>
        </div>
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-arc/40 bg-arc/10 shadow-[0_0_30px_rgba(0,213,255,0.22)]"><Cpu className="h-8 w-8 text-arc" /></div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <Metric value={total.toString().padStart(2, "0")} label="Visible" />
        <Metric value="05" label="Classes" />
        <Metric value="LOCAL" label="Data" />
      </div>
      <label className="mt-5 flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-3 shadow-insetPanel focus-within:border-arc/70">
        <Search className="h-5 w-5 text-arc" />
        <input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" placeholder="Search ID, machine, maker, category..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
    </header>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-3"><div className="font-display text-xl font-bold text-reactor">{value}</div><div className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-steel">{label}</div></div>;
}

function MachineCategory({ category, machines, selectedId, onSelect }: { category: string; machines: Machine[]; selectedId: string; onSelect: (machine: Machine) => void }) {
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2"><h2 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-zinc-300">{category}</h2><span className="text-xs text-steel">{machines.length}</span></div>
      <div className="grid gap-2">{machines.map((machine) => <button key={machine.id} onClick={() => onSelect(machine)} className={`group grid grid-cols-[74px_1fr_auto] items-center gap-3 rounded-lg border p-2 text-left transition ${machine.id === selectedId ? "border-arc/70 bg-arc/10 shadow-[0_0_22px_rgba(0,213,255,0.14)]" : "border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.07]"}`}><img className="h-16 w-16 rounded-md object-cover" src={machine.image} alt="" /><span className="min-w-0"><span className="block font-display text-lg font-semibold leading-tight text-white">{machine.name}</span><span className="mt-1 block truncate text-xs text-steel">{machine.id} / {machine.type}</span><span className="mt-2 inline-flex rounded border border-reactor/30 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.14em] text-reactor">{machine.capability}</span></span><ChevronRight className="h-5 w-5 text-zinc-500 transition group-hover:text-arc" /></button>)}</div>
    </section>
  );
}

function MachineDetail({ machine, activeTab, setActiveTab }: { machine: Machine; activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
  return (
    <section className="min-w-0"><div className="relative overflow-hidden rounded-lg border border-white/10 bg-gunmetal/80 shadow-glow backdrop-blur-xl"><div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-arc via-reactor to-danger" />
      <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]"><div className="relative min-h-[340px] border-b border-white/10 xl:border-b-0 xl:border-r"><img className="h-full min-h-[340px] w-full object-cover opacity-80" src={machine.image} alt={`${machine.name} placeholder`} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-5"><span className="inline-flex items-center gap-2 rounded border border-arc/40 bg-black/55 px-3 py-1 font-display text-sm uppercase tracking-[0.2em] text-arc"><Shield className="h-4 w-4" />{machine.id}</span><h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-white sm:text-6xl">{machine.name}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">{machine.type}</p></div></div>
      <div className="p-5 sm:p-6"><div className="flex flex-wrap gap-2"><Badge icon={<Gauge className="h-4 w-4" />} label={machine.capability} /><Badge icon={<Wrench className="h-4 w-4" />} label={machine.status} /><Badge icon={<BookOpen className="h-4 w-4" />} label={machine.bay} /></div><div className="mt-6 grid grid-cols-2 gap-3"><InfoBlock label="Manufacturer" value={machine.manufacturer} /><InfoBlock label="Category" value={machine.category} /><InfoBlock label="Core Type" value={machine.type} wide /></div><div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-md px-3 py-2 font-display text-sm font-semibold uppercase tracking-[0.12em] transition ${activeTab === tab ? "bg-arc text-black" : "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.12]"}`}>{tab}</button>)}</div><div className="mt-5 min-h-[248px]"><TabContent machine={machine} activeTab={activeTab} /></div></div></div></div></section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-zinc-200"><span className="text-reactor">{icon}</span>{label}</span>;
}

function InfoBlock({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={`rounded-lg border border-white/10 bg-black/30 p-4 ${wide ? "col-span-2" : ""}`}><div className="text-xs uppercase tracking-[0.18em] text-steel">{label}</div><div className="mt-2 font-display text-xl font-semibold text-white">{value}</div></div>;
}

function TabContent({ machine, activeTab }: { machine: Machine; activeTab: Tab }) {
  if (activeTab === "Overview") return <div><p className="text-base leading-7 text-zinc-300">{machine.overview}</p><div className="mt-5 rounded-lg border border-arc/20 bg-arc/[0.06] p-4"><div className="font-display text-sm uppercase tracking-[0.24em] text-arc">Dex Note</div><p className="mt-2 text-sm leading-6 text-zinc-300">Record uses static local JSON and placeholder media. Swap in shop photos, manuals, PM logs, and fixture notes as the library grows.</p></div></div>;
  if (activeTab === "Specs") return <div className="grid gap-3 sm:grid-cols-2">{machine.specs.map((spec) => <InfoBlock key={spec.label} label={spec.label} value={spec.value} />)}</div>;
  if (activeTab === "Photos") return <div className="grid gap-3 sm:grid-cols-3">{machine.photos.map((photo, index) => <div key={photo} className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="grid aspect-square place-items-center rounded-md border border-dashed border-white/15 bg-white/[0.035]"><Camera className="h-8 w-8 text-arc" /></div><div className="mt-3 text-sm text-zinc-300">{String(index + 1).padStart(2, "0")} / {photo}</div></div>)}</div>;
  return <div className="grid gap-3">{machine.documentation.map((doc) => <div key={doc.title} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-4"><div className="flex min-w-0 items-center gap-3"><FileText className="h-5 w-5 shrink-0 text-reactor" /><div className="min-w-0"><div className="truncate font-display text-lg font-semibold text-white">{doc.title}</div><div className="text-sm text-steel">{doc.kind}</div></div></div><ArrowLeft className="h-5 w-5 rotate-180 text-zinc-500" /></div>)}</div>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
