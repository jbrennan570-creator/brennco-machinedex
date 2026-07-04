import React from "react";
import ReactDOM from "react-dom/client";
import {
  BookOpen,
  Boxes,
  ClipboardList,
  FileText,
  Gauge,
  Home,
  Search,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import machinesData from "./data/machines.json";
import type { Machine } from "./types";
import "./styles.css";

const machines = machinesData as Machine[];

function App() {
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(machines[0]?.id ?? "");

  const selectedMachine = machines.find((machine) => machine.id === selectedId) ?? machines[0];
  const filteredMachines = machines.filter((machine) => {
    const searchable = `${machine.id} ${machine.name} ${machine.type} ${machine.manufacturer} ${machine.category} ${machine.capability}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <main className="machinedex-shell">
      <Sidebar machineCount={machines.length} />
      <MachineBrowser
        machines={filteredMachines}
        query={query}
        selectedId={selectedMachine.id}
        setQuery={setQuery}
        onSelect={setSelectedId}
      />
      <MachineInfoPanel machine={selectedMachine} />
    </main>
  );
}

function Sidebar({ machineCount }: { machineCount: number }) {
  const navItems = [
    { label: "Dashboard", icon: Home },
    { label: "Machines", icon: Boxes, active: true },
    { label: "Equipment", icon: Gauge },
    { label: "Documents", icon: FileText },
    { label: "Maintenance", icon: Wrench },
  ];

  return (
    <aside className="field-sidebar">
      <div className="brand-mark">
        <div className="brand-star">★</div>
        <div>
          <p>Brennco</p>
          <h1>MachineDex</h1>
        </div>
      </div>

      <nav className="field-nav" aria-label="MachineDex sections">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button className={item.active ? "nav-item active" : "nav-item"} key={item.label} type="button">
              <Icon aria-hidden="true" size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="shop-status">
        <p className="technical-label">Shop Status</p>
        <strong>Operational</strong>
        <span>{machineCount.toString().padStart(2, "0")} machine records indexed</span>
      </div>

      <div className="sidebar-motto">
        <ShieldCheck aria-hidden="true" size={22} />
        <p>Built by skill. Driven by purpose.</p>
      </div>
    </aside>
  );
}

function MachineBrowser({
  machines,
  query,
  selectedId,
  setQuery,
  onSelect,
}: {
  machines: Machine[];
  query: string;
  selectedId: string;
  setQuery: (query: string) => void;
  onSelect: (machineId: string) => void;
}) {
  return (
    <section className="machine-browser">
      <header className="browser-header">
        <div>
          <p className="technical-label">The heart of Brennco</p>
          <h2>Machines</h2>
        </div>
        <label className="search-control">
          <Search aria-hidden="true" size={18} />
          <input
            aria-label="Search MachineDex"
            onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
            placeholder="Search MachineDex..."
            value={query}
          />
        </label>
      </header>

      <div className="category-strip" aria-label="Machine categories">
        {["All", "Presses", "Mills", "Waterjet", "Welding", "EDM", "Lathes"].map((category, index) => (
          <span className={index === 0 ? "category-pill active" : "category-pill"} key={category}>
            {category}
          </span>
        ))}
      </div>

      <div className="machine-grid" aria-live="polite">
        {machines.length === 0 ? (
          <div className="empty-record">No machine records match that search.</div>
        ) : (
          machines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              selected={machine.id === selectedId}
              onSelect={() => onSelect(machine.id)}
            />
          ))
        )}
      </div>

      <footer className="browser-footer">★ {machines.length.toString().padStart(2, "0")} machines displayed ★</footer>
    </section>
  );
}

function MachineCard({ machine, selected, onSelect }: { machine: Machine; selected: boolean; onSelect: () => void }) {
  return (
    <button className={selected ? "machine-card selected" : "machine-card"} onClick={onSelect} type="button">
      <div className="card-rivet">★</div>
      <div className="machine-id">{machine.id}</div>
      <MachineIllustration machine={machine} compact />
      <div className="machine-card-copy">
        <h3>{machine.name}</h3>
        <p>{machine.type}</p>
        <span className={`status ${machine.status.toLowerCase()}`}>{machine.status}</span>
      </div>
    </button>
  );
}

function MachineInfoPanel({ machine }: { machine: Machine }) {
  return (
    <aside className="machine-info-panel">
      <div className="info-topline">
        <span>★ {machine.id}</span>
        <span>{machine.status}</span>
      </div>

      <header className="info-title">
        <h2>{machine.name}</h2>
        <p>{machine.type}</p>
      </header>

      <MachineIllustration machine={machine} />

      <div className="info-tabs" aria-label="Machine information sections">
        {["Overview", "Specifications", "Photos", "Documents"].map((tab, index) => (
          <span className={index === 0 ? "active" : ""} key={tab}>
            {tab}
          </span>
        ))}
      </div>

      <section className="overview-copy">
        <p className="technical-label">Description</p>
        <p>{machine.overview}</p>
      </section>

      <dl className="spec-list">
        <InfoSpec label="Status" value={machine.status} />
        <InfoSpec label="Type" value={machine.type} />
        <InfoSpec label="Capability" value={machine.capability} />
        <InfoSpec label="Manufacturer" value={machine.manufacturer} />
        <InfoSpec label="Bay" value={machine.bay} />
        {machine.specs.slice(0, 3).map((spec) => (
          <InfoSpec key={spec.label} label={spec.label} value={spec.value} />
        ))}
      </dl>

      <div className="quick-counts">
        <CountTile icon={<BookOpen size={18} />} label="Photos" value={machine.photos.length} />
        <CountTile icon={<ClipboardList size={18} />} label="Documents" value={machine.documentation.length} />
        <CountTile icon={<Settings size={18} />} label="Specs" value={machine.specs.length} />
      </div>
    </aside>
  );
}

function MachineIllustration({ machine, compact = false }: { machine: Machine; compact?: boolean }) {
  const hasIllustration = Boolean(machine.illustrationPath);

  return (
    <div className={`${compact ? "machine-illustration compact" : "machine-illustration"} ${hasIllustration ? "has-artwork" : ""}`}>
      {hasIllustration ? (
        <img alt={`${machine.name} technical illustration`} src={machine.illustrationPath} />
      ) : (
        <div className="illustration-fallback" aria-hidden="true">
          <div className="press-sketch">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoSpec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function CountTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div>
      {icon}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
