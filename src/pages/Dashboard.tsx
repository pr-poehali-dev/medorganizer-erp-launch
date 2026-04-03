import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

type Section = "home" | "emk" | "queue" | "resources" | "analytics" | "admin";

const NAV = [
  { id: "home" as Section, label: "Главная", icon: "LayoutDashboard" },
  { id: "emk" as Section, label: "ЭМК", icon: "FileText" },
  { id: "queue" as Section, label: "Запись и очередь", icon: "CalendarClock" },
  { id: "resources" as Section, label: "Ресурсы и ИИ", icon: "BrainCircuit" },
  { id: "analytics" as Section, label: "Аналитика", icon: "BarChart3" },
  { id: "admin" as Section, label: "Администрирование", icon: "Settings" },
];

const ALERTS = [
  { type: "error", text: "Отделение хирургии: перегрузка 112%" },
  { type: "warn", text: "КТ-аппарат №2: плановое ТО через 3 дня" },
  { type: "info", text: "Интеграция с ЕГИСЗ: синхронизация завершена" },
];

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {children}
    </span>
  );
}

function ActionButton({ icon, label, color = "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50", onClick }: {
  icon: string; label: string; color?: string; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 text-center ${color}`}
    >
      <Icon name={icon} size={24} />
      <span className="text-sm font-semibold leading-tight">{label}</span>
    </button>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#f0f9fc] to-white">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center">
          <Icon name={icon} size={18} className="text-white" />
        </div>
        <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <Icon name="X" size={16} className="text-gray-600" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function InputField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8]"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] bg-white">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SubmitBtn({ label }: { label: string }) {
  return (
    <button className="w-full mt-4 bg-gradient-to-r from-[#0e7ea8] to-[#1a9e6e] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
      {label}
    </button>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("home");
  const [modal, setModal] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = (id: string) => setModal(id);
  const closeModal = () => setModal(null);

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0d2b3e] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">MedOrganizer Pro</div>
            <div className="text-white/40 text-xs">Контур управления</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => { setSection(n.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${section === n.id
                  ? "bg-[#0e7ea8] text-white shadow-lg shadow-[#0e7ea8]/30"
                  : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              <Icon name={n.icon} size={18} />
              {n.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#0e7ea8] flex items-center justify-center text-white text-xs font-bold">АД</div>
            <div>
              <div className="text-white text-sm font-semibold">Администратор</div>
              <div className="text-white/40 text-xs">admin</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm transition-all"
          >
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Icon name="Menu" size={22} />
            </button>
            <div>
              <div className="font-bold text-gray-800">{NAV.find(n => n.id === section)?.label || "Главная"}</div>
              <div className="text-gray-400 text-xs">Умный контур управления здравоохранением</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Icon name="Bell" size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="text-sm text-gray-500 hidden md:block">{new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}</div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">

          {/* HOME */}
          {section === "home" && (
            <div className="space-y-6">
              {/* Alerts */}
              <div className="space-y-2">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                    ${a.type === "error" ? "bg-red-50 border border-red-200 text-red-700" :
                      a.type === "warn" ? "bg-yellow-50 border border-yellow-200 text-yellow-700" :
                      "bg-[#e0f4fb] border border-[#0e7ea8]/20 text-[#0a5e80]"}`}>
                    <Icon name={a.type === "error" ? "AlertCircle" : a.type === "warn" ? "AlertTriangle" : "Info"} size={16} />
                    {a.text}
                  </div>
                ))}
              </div>

              {/* KPI Widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Загруженность сегодня", value: "78%", icon: "Activity", color: "from-[#0e7ea8] to-[#0a5e80]", sub: "Норма: до 85%" },
                  { label: "Записей онлайн", value: "342", icon: "CalendarCheck", color: "from-[#1a9e6e] to-[#12734f]", sub: "+12% к вчера" },
                  { label: "Пациентов в очереди", value: "47", icon: "Users", color: "from-[#7c3aed] to-[#5b21b6]", sub: "Среднее ожидание: 18 мин" },
                  { label: "Экстренные оповещения", value: "3", icon: "Siren", color: "from-[#dc2626] to-[#991b1b]", sub: "2 требуют реакции" },
                ].map((w, i) => (
                  <div key={i} className={`bg-gradient-to-br ${w.color} rounded-2xl p-5 text-white shadow-lg`}>
                    <div className="flex items-center justify-between mb-3">
                      <Icon name={w.icon} size={22} className="text-white/80" />
                      <Badge color="bg-white/20 text-white">сегодня</Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{w.value}</div>
                    <div className="text-white/80 text-xs font-medium">{w.label}</div>
                    <div className="text-white/50 text-xs mt-1">{w.sub}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SectionCard title="Электронная МК" icon="FileText">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { icon: "Search", label: "Поиск пациента", action: "emk-search" },
                      { icon: "FilePlus", label: "Новая запись", action: "emk-new" },
                    ].map(b => (
                      <button key={b.action} onClick={() => { setSection("emk"); openModal(b.action); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#e0f4fb] text-[#0a5e80] hover:bg-[#0e7ea8] hover:text-white text-sm font-semibold transition-all">
                        <Icon name={b.icon} size={16} />{b.label}
                      </button>
                    ))}
                  </div>
                </SectionCard>
                <SectionCard title="Запись и очередь" icon="CalendarClock">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { icon: "Calendar", label: "Расписание врачей", action: "q-schedule" },
                      { icon: "UserPlus", label: "Записать пациента", action: "q-book" },
                    ].map(b => (
                      <button key={b.action} onClick={() => { setSection("queue"); openModal(b.action); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#d8f5ec] text-[#12734f] hover:bg-[#1a9e6e] hover:text-white text-sm font-semibold transition-all">
                        <Icon name={b.icon} size={16} />{b.label}
                      </button>
                    ))}
                  </div>
                </SectionCard>
                <SectionCard title="Ресурсы и ИИ" icon="BrainCircuit">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { icon: "Cpu", label: "ИИ-оптимизация", action: "res-ai" },
                      { icon: "TrendingUp", label: "Прогноз загрузки", action: "res-forecast" },
                    ].map(b => (
                      <button key={b.action} onClick={() => { setSection("resources"); openModal(b.action); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white text-sm font-semibold transition-all">
                        <Icon name={b.icon} size={16} />{b.label}
                      </button>
                    ))}
                  </div>
                </SectionCard>
                <SectionCard title="Аналитика" icon="BarChart3">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { icon: "LayoutDashboard", label: "Дашборд КПЭ", action: "an-kpi" },
                      { icon: "FileBarChart", label: "Отчёты Минздрав", action: "an-reports" },
                    ].map(b => (
                      <button key={b.action} onClick={() => { setSection("analytics"); openModal(b.action); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white text-sm font-semibold transition-all">
                        <Icon name={b.icon} size={16} />{b.label}
                      </button>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* Load chart placeholder */}
              <SectionCard title="Загрузка отделений — сегодня" icon="BarChart2">
                <div className="space-y-3">
                  {[
                    { name: "Терапия", pct: 72, color: "bg-[#0e7ea8]" },
                    { name: "Хирургия", pct: 112, color: "bg-red-500" },
                    { name: "Педиатрия", pct: 58, color: "bg-[#1a9e6e]" },
                    { name: "Кардиология", pct: 84, color: "bg-yellow-500" },
                    { name: "Неврология", pct: 45, color: "bg-purple-500" },
                  ].map((d) => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-28 text-sm text-gray-600 font-medium shrink-0">{d.name}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div className={`h-3 rounded-full ${d.color} transition-all`} style={{ width: `${Math.min(d.pct, 100)}%` }} />
                      </div>
                      <div className={`w-10 text-right text-sm font-bold ${d.pct > 100 ? "text-red-600" : "text-gray-700"}`}>{d.pct}%</div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* EMK */}
          {section === "emk" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { icon: "Search", label: "Поиск пациента", action: "emk-search", color: "bg-[#e0f4fb] text-[#0a5e80] hover:bg-[#0e7ea8] hover:text-white" },
                  { icon: "FilePlus", label: "Новая запись", action: "emk-new", color: "bg-[#d8f5ec] text-[#12734f] hover:bg-[#1a9e6e] hover:text-white" },
                  { icon: "History", label: "История визитов", action: "emk-history", color: "bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white" },
                  { icon: "FlaskConical", label: "Результаты анализов", action: "emk-lab", color: "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white" },
                  { icon: "ClipboardList", label: "Рецепты / направления", action: "emk-rx", color: "bg-pink-50 text-pink-700 hover:bg-pink-500 hover:text-white" },
                ].map(b => (
                  <ActionButton key={b.action} icon={b.icon} label={b.label} color={b.color} onClick={() => openModal(b.action)} />
                ))}
              </div>

              <SectionCard title="Последние пациенты" icon="Users">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Пациент</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Дата рожд.</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Последний визит</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Врач</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Статус</th>
                        <th className="py-2 px-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Иванова Мария Сергеевна", dob: "12.04.1978", visit: "02.04.2026", doctor: "Петров А.В.", status: "Активна" },
                        { name: "Смирнов Алексей Петрович", dob: "30.11.1955", visit: "01.04.2026", doctor: "Кузнецова И.Л.", status: "Льготник" },
                        { name: "Козлов Дмитрий Игоревич", dob: "15.07.1990", visit: "28.03.2026", doctor: "Волков Е.С.", status: "Активна" },
                        { name: "Новикова Елена Андреевна", dob: "05.02.1965", visit: "25.03.2026", doctor: "Петров А.В.", status: "Диспансер" },
                      ].map((p, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => openModal("emk-history")}>
                          <td className="py-3 px-3 font-medium text-gray-800">{p.name}</td>
                          <td className="py-3 px-3 text-gray-500">{p.dob}</td>
                          <td className="py-3 px-3 text-gray-500">{p.visit}</td>
                          <td className="py-3 px-3 text-gray-500">{p.doctor}</td>
                          <td className="py-3 px-3">
                            <Badge color={p.status === "Льготник" ? "bg-yellow-100 text-yellow-700" : p.status === "Диспансер" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
                              {p.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-3"><Icon name="ChevronRight" size={16} className="text-gray-300" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            </div>
          )}

          {/* QUEUE */}
          {section === "queue" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { icon: "CalendarDays", label: "Расписание врачей", action: "q-schedule", color: "bg-[#e0f4fb] text-[#0a5e80] hover:bg-[#0e7ea8] hover:text-white" },
                  { icon: "UserPlus", label: "Запись пациента", action: "q-book", color: "bg-[#d8f5ec] text-[#12734f] hover:bg-[#1a9e6e] hover:text-white" },
                  { icon: "Ticket", label: "Управление талонами", action: "q-tickets", color: "bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white" },
                  { icon: "MonitorSmartphone", label: "Электронная очередь", action: "q-live", color: "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white" },
                  { icon: "CalendarX2", label: "Отмена / перенос", action: "q-cancel", color: "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white" },
                ].map(b => (
                  <ActionButton key={b.action} icon={b.icon} label={b.label} color={b.color} onClick={() => openModal(b.action)} />
                ))}
              </div>

              <SectionCard title="Очередь сейчас — Терапия" icon="Clock">
                <div className="space-y-2">
                  {[
                    { num: "А-041", name: "Иванова М.С.", time: "09:00", status: "Принимается", doctor: "Петров А.В." },
                    { num: "А-042", name: "Сидоров П.Н.", time: "09:15", status: "Ожидает", doctor: "Петров А.В." },
                    { num: "А-043", name: "Козлова Е.И.", time: "09:30", status: "Ожидает", doctor: "Петров А.В." },
                    { num: "Б-011", name: "Морозов А.Д.", time: "09:10", status: "Льготник", doctor: "Кузнецова И.Л." },
                    { num: "А-044", name: "Воронова Т.С.", time: "09:45", status: "Ожидает", doctor: "Петров А.В." },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
                      <div className="w-14 font-bold text-[#0e7ea8] text-sm">{t.num}</div>
                      <div className="flex-1 font-medium text-gray-800 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-sm hidden md:block">{t.doctor}</div>
                      <div className="text-gray-500 text-sm">{t.time}</div>
                      <Badge color={
                        t.status === "Принимается" ? "bg-green-100 text-green-700" :
                        t.status === "Льготник" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-200 text-gray-600"
                      }>{t.status}</Badge>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* RESOURCES */}
          {section === "resources" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { icon: "CalendarRange", label: "Календарь персонала", action: "res-staff", color: "bg-[#e0f4fb] text-[#0a5e80] hover:bg-[#0e7ea8] hover:text-white" },
                  { icon: "Stethoscope", label: "График оборудования", action: "res-equip", color: "bg-[#d8f5ec] text-[#12734f] hover:bg-[#1a9e6e] hover:text-white" },
                  { icon: "BedDouble", label: "Коечный фонд", action: "res-beds", color: "bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white" },
                  { icon: "Cpu", label: "ИИ-оптимизация расписания", action: "res-ai", color: "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white" },
                  { icon: "TrendingUp", label: "Прогноз загрузки", action: "res-forecast", color: "bg-pink-50 text-pink-700 hover:bg-pink-500 hover:text-white" },
                ].map(b => (
                  <ActionButton key={b.action} icon={b.icon} label={b.label} color={b.color} onClick={() => openModal(b.action)} />
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <SectionCard title="Коечный фонд" icon="BedDouble">
                  <div className="space-y-3">
                    {[
                      { dept: "Терапия", total: 60, busy: 48 },
                      { dept: "Хирургия", total: 40, busy: 40 },
                      { dept: "Педиатрия", total: 30, busy: 17 },
                      { dept: "Кардиология", total: 25, busy: 22 },
                    ].map(d => (
                      <div key={d.dept} className="flex items-center gap-3">
                        <div className="w-28 text-sm font-medium text-gray-700 shrink-0">{d.dept}</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${d.busy / d.total > 0.9 ? "bg-red-500" : "bg-[#0e7ea8]"}`}
                            style={{ width: `${(d.busy / d.total) * 100}%` }} />
                        </div>
                        <div className="text-sm text-gray-500 w-16 text-right">{d.busy}/{d.total} коек</div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
                <SectionCard title="ИИ-рекомендации" icon="Sparkles">
                  <div className="space-y-3">
                    {[
                      { text: "Перенести 3 плановые операции из пятницы на вторник — загрузка снизится на 18%", type: "success" },
                      { text: "Добавить 1 врача в терапию в 11:00–13:00, пиковая нагрузка 134%", type: "warn" },
                      { text: "КТ-аппарат №1 простаивает 40% времени — рекомендую перераспределить заявки", type: "info" },
                    ].map((r, i) => (
                      <div key={i} className={`flex gap-3 p-3 rounded-xl text-sm
                        ${r.type === "success" ? "bg-green-50 text-green-800" :
                          r.type === "warn" ? "bg-yellow-50 text-yellow-800" :
                          "bg-[#e0f4fb] text-[#0a5e80]"}`}>
                        <Icon name={r.type === "success" ? "CheckCircle" : r.type === "warn" ? "AlertTriangle" : "Lightbulb"} size={16} className="shrink-0 mt-0.5" />
                        {r.text}
                      </div>
                    ))}
                    <button className="w-full mt-2 bg-gradient-to-r from-[#0e7ea8] to-[#1a9e6e] text-white font-bold py-2.5 rounded-xl hover:shadow-lg transition-all text-sm"
                      onClick={() => openModal("res-ai")}>
                      Применить рекомендации
                    </button>
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {section === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { icon: "LayoutDashboard", label: "Дашборд КПЭ", action: "an-kpi", color: "bg-[#e0f4fb] text-[#0a5e80] hover:bg-[#0e7ea8] hover:text-white" },
                  { icon: "FileBarChart", label: "Отчёты для Минздрава", action: "an-reports", color: "bg-[#d8f5ec] text-[#12734f] hover:bg-[#1a9e6e] hover:text-white" },
                  { icon: "Building2", label: "Загрузка отделений", action: "an-load", color: "bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white" },
                  { icon: "BrainCircuit", label: "ИИ-прогноз нагрузок", action: "an-aiforecast", color: "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white" },
                  { icon: "Scale", label: "Сравнение с нормативами", action: "an-norms", color: "bg-pink-50 text-pink-700 hover:bg-pink-500 hover:text-white" },
                ].map(b => (
                  <ActionButton key={b.action} icon={b.icon} label={b.label} color={b.color} onClick={() => openModal(b.action)} />
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Выполнение плана", value: "94%", delta: "+2%", icon: "Target", color: "text-[#1a9e6e]" },
                  { label: "Удовлетворённость", value: "4.7", delta: "+0.1", icon: "Star", color: "text-yellow-500" },
                  { label: "Среднее ожидание", value: "18 мин", delta: "-3 мин", icon: "Clock", color: "text-[#0e7ea8]" },
                  { label: "Отказы от приёма", value: "2.1%", delta: "-0.4%", icon: "UserX", color: "text-red-500" },
                ].map((k, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <Icon name={k.icon} size={20} className={k.color} />
                      <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">{k.delta}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{k.value}</div>
                    <div className="text-gray-400 text-xs">{k.label}</div>
                  </div>
                ))}
              </div>

              <SectionCard title="Динамика записей — последние 7 дней" icon="LineChart">
                <div className="flex items-end gap-2 h-32">
                  {[280, 310, 295, 342, 328, 356, 342].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="text-xs text-gray-400">{v}</div>
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-[#0e7ea8] to-[#5ecfef] transition-all"
                        style={{ height: `${(v / 400) * 100}%` }} />
                      <div className="text-xs text-gray-400">{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* ADMIN */}
          {section === "admin" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "Users", label: "Пользователи и роли", action: "adm-users", color: "bg-[#e0f4fb] text-[#0a5e80] hover:bg-[#0e7ea8] hover:text-white" },
                  { icon: "Plug", label: "Настройки интеграций", action: "adm-integr", color: "bg-[#d8f5ec] text-[#12734f] hover:bg-[#1a9e6e] hover:text-white" },
                  { icon: "ScrollText", label: "Журнал событий", action: "adm-log", color: "bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white" },
                  { icon: "HardDrive", label: "Бэкап", action: "adm-backup", color: "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white" },
                ].map(b => (
                  <ActionButton key={b.action} icon={b.icon} label={b.label} color={b.color} onClick={() => openModal(b.action)} />
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <SectionCard title="Пользователи системы" icon="Shield">
                  <div className="space-y-2">
                    {[
                      { name: "Администратор", login: "admin", role: "Суперадмин", status: true },
                      { name: "Петров А.В.", login: "petrov_av", role: "Врач-терапевт", status: true },
                      { name: "Кузнецова И.Л.", login: "kuznetsova", role: "Врач-кардиолог", status: true },
                      { name: "Волков Е.С.", login: "volkov_es", role: "Хирург", status: false },
                    ].map((u, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer" onClick={() => openModal("adm-users")}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center text-white text-xs font-bold">
                          {u.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">{u.name}</div>
                          <div className="text-xs text-gray-400">{u.login} · {u.role}</div>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${u.status ? "bg-green-400" : "bg-gray-300"}`} />
                      </div>
                    ))}
                    <button className="w-full mt-2 border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-[#0e7ea8] hover:border-[#0e7ea8] transition-all"
                      onClick={() => openModal("adm-users")}>
                      + Добавить пользователя
                    </button>
                  </div>
                </SectionCard>
                <SectionCard title="Журнал событий" icon="ScrollText">
                  <div className="space-y-2 text-sm">
                    {[
                      { time: "09:41", text: "Авторизация admin", type: "info" },
                      { time: "09:38", text: "Создана запись: Иванова М.С. → Петров А.В.", type: "success" },
                      { time: "09:22", text: "Синхронизация ЕГИСЗ: 847 записей", type: "success" },
                      { time: "08:55", text: "Попытка входа с неверным паролем (petrov_av)", type: "warn" },
                      { time: "08:00", text: "Автобэкап БД завершён успешно", type: "success" },
                    ].map((l, i) => (
                      <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <span className="text-gray-400 text-xs w-10 shrink-0 mt-0.5">{l.time}</span>
                        <Icon name={l.type === "warn" ? "AlertTriangle" : l.type === "success" ? "CheckCircle" : "Info"} size={14}
                          className={`shrink-0 mt-0.5 ${l.type === "warn" ? "text-yellow-500" : l.type === "success" ? "text-green-500" : "text-[#0e7ea8]"}`} />
                        <span className="text-gray-600">{l.text}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODALS */}
      {modal === "emk-search" && (
        <Modal title="Поиск пациента" onClose={closeModal}>
          <div className="space-y-3">
            <InputField label="ФИО пациента" placeholder="Иванова Мария Сергеевна" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Дата рождения" placeholder="дд.мм.гггг" type="date" />
              <InputField label="Полис ОМС" placeholder="0000 0000 0000 0000" />
            </div>
            <InputField label="СНИЛС" placeholder="000-000-000 00" />
            <SubmitBtn label="Найти пациента" />
          </div>
        </Modal>
      )}
      {modal === "emk-new" && (
        <Modal title="Новая запись в ЭМК" onClose={closeModal}>
          <div className="space-y-3">
            <InputField label="ФИО пациента" placeholder="Введите ФИО" />
            <SelectField label="Врач" options={["Петров А.В. — Терапевт", "Кузнецова И.Л. — Кардиолог", "Волков Е.С. — Хирург"]} />
            <InputField label="Дата приёма" placeholder="" type="date" />
            <SelectField label="Тип записи" options={["Первичный приём", "Повторный приём", "Диспансеризация", "Экстренный"]} />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Жалобы / Анамнез</label>
              <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 resize-none" placeholder="Опишите жалобы..." />
            </div>
            <SubmitBtn label="Создать запись" />
          </div>
        </Modal>
      )}
      {modal === "emk-history" && (
        <Modal title="История визитов" onClose={closeModal}>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[
              { date: "02.04.2026", doctor: "Петров А.В.", diag: "ОРВИ, J06.9", result: "Больничный лист" },
              { date: "15.01.2026", doctor: "Кузнецова И.Л.", diag: "Гипертония I ст.", result: "Назначена терапия" },
              { date: "08.10.2025", doctor: "Петров А.В.", diag: "Проф. осмотр", result: "Здоров" },
            ].map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800 text-sm">{v.date}</span>
                  <Badge color="bg-blue-50 text-blue-700">{v.result}</Badge>
                </div>
                <div className="text-xs text-gray-500">{v.doctor}</div>
                <div className="text-xs text-gray-600 mt-1">Диагноз: {v.diag}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "emk-lab" && (
        <Modal title="Результаты анализов" onClose={closeModal}>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[
              { name: "Общий анализ крови", date: "01.04.2026", status: "Норма" },
              { name: "Биохимия крови", date: "01.04.2026", status: "Отклонение" },
              { name: "ЭКГ", date: "28.03.2026", status: "Норма" },
              { name: "УЗИ брюшной полости", date: "20.03.2026", status: "Норма" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.date}</div>
                </div>
                <Badge color={r.status === "Норма" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{r.status}</Badge>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 border border-[#0e7ea8] text-[#0e7ea8] font-bold py-2.5 rounded-xl hover:bg-[#0e7ea8] hover:text-white transition-all text-sm">
            Запросить новые анализы
          </button>
        </Modal>
      )}
      {modal === "emk-rx" && (
        <Modal title="Рецепты и направления" onClose={closeModal}>
          <div className="space-y-3">
            <SelectField label="Тип документа" options={["Рецепт", "Направление к специалисту", "Направление на госпитализацию", "Направление на анализы"]} />
            <InputField label="Пациент" placeholder="ФИО пациента" />
            <SelectField label="Специалист / Препарат" options={["Кардиолог", "Невролог", "Хирург", "Лаборатория"]} />
            <InputField label="Дата" placeholder="" type="date" />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Примечания</label>
              <textarea rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 resize-none" />
            </div>
            <SubmitBtn label="Выписать документ" />
          </div>
        </Modal>
      )}
      {modal === "q-schedule" && (
        <Modal title="Расписание врачей" onClose={closeModal}>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[
              { doctor: "Петров А.В.", spec: "Терапевт", slots: "09:00–14:00", free: 4 },
              { doctor: "Кузнецова И.Л.", spec: "Кардиолог", slots: "10:00–15:00", free: 2 },
              { doctor: "Волков Е.С.", spec: "Хирург", slots: "08:00–13:00", free: 0 },
              { doctor: "Соколова Н.В.", spec: "Педиатр", slots: "09:00–16:00", free: 7 },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {d.doctor[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800">{d.doctor}</div>
                  <div className="text-xs text-gray-400">{d.spec} · {d.slots}</div>
                </div>
                <Badge color={d.free === 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                  {d.free === 0 ? "Нет мест" : `${d.free} слота`}
                </Badge>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "q-book" && (
        <Modal title="Запись пациента" onClose={closeModal}>
          <div className="space-y-3">
            <InputField label="ФИО пациента" placeholder="Введите ФИО" />
            <SelectField label="Врач" options={["Петров А.В. — Терапевт", "Кузнецова И.Л. — Кардиолог", "Соколова Н.В. — Педиатр"]} />
            <InputField label="Дата" placeholder="" type="date" />
            <SelectField label="Время" options={["09:00", "09:15", "09:30", "10:00", "10:30", "11:00"]} />
            <SelectField label="Канал записи" options={["Оператор", "Госуслуги", "Сайт клиники", "Мобильное приложение", "Терминал"]} />
            <SubmitBtn label="Создать запись" />
          </div>
        </Modal>
      )}
      {modal === "q-tickets" && (
        <Modal title="Управление талонами" onClose={closeModal}>
          <div className="space-y-3">
            <SelectField label="Отделение" options={["Терапия", "Хирургия", "Кардиология", "Педиатрия"]} />
            <SelectField label="Действие" options={["Выдать талон", "Аннулировать талон", "Перенести талон", "Просмотр талонов"]} />
            <InputField label="Дата" placeholder="" type="date" />
            <SubmitBtn label="Применить" />
          </div>
        </Modal>
      )}
      {modal === "q-live" && (
        <Modal title="Электронная очередь — онлайн" onClose={closeModal}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { dept: "Терапия", current: "А-041", waiting: 4 },
              { dept: "Кардиология", current: "К-012", waiting: 2 },
              { dept: "Педиатрия", current: "П-007", waiting: 6 },
              { dept: "Хирургия", current: "—", waiting: 0 },
            ].map((q, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-400 mb-1">{q.dept}</div>
                <div className="text-xl font-bold text-[#0e7ea8]">{q.current}</div>
                <div className="text-xs text-gray-500 mt-1">Ожидают: {q.waiting}</div>
              </div>
            ))}
          </div>
          <button className="w-full border border-[#0e7ea8] text-[#0e7ea8] font-bold py-2.5 rounded-xl hover:bg-[#0e7ea8] hover:text-white transition-all text-sm">
            Вызвать следующего
          </button>
        </Modal>
      )}
      {modal === "q-cancel" && (
        <Modal title="Отмена / перенос приёма" onClose={closeModal}>
          <div className="space-y-3">
            <InputField label="Номер талона или ФИО пациента" placeholder="А-041 или Иванова М.С." />
            <SelectField label="Действие" options={["Отменить приём", "Перенести на другую дату"]} />
            <InputField label="Новая дата (при переносе)" placeholder="" type="date" />
            <SelectField label="Причина" options={["По инициативе пациента", "По инициативе клиники", "Экстренная госпитализация", "Другое"]} />
            <SubmitBtn label="Подтвердить" />
          </div>
        </Modal>
      )}
      {modal === "res-staff" && (
        <Modal title="Календарь персонала" onClose={closeModal}>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {[
              { name: "Петров А.В.", days: "Пн–Пт", hours: "09:00–15:00", status: "На работе" },
              { name: "Кузнецова И.Л.", days: "Вт, Чт", hours: "10:00–16:00", status: "На работе" },
              { name: "Волков Е.С.", days: "Пн, Ср, Пт", hours: "08:00–14:00", status: "Отпуск" },
              { name: "Соколова Н.В.", days: "Пн–Пт", hours: "09:00–16:00", status: "На работе" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.days} · {s.hours}</div>
                </div>
                <Badge color={s.status === "На работе" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>{s.status}</Badge>
              </div>
            ))}
          </div>
          <SubmitBtn label="Добавить сотрудника" />
        </Modal>
      )}
      {modal === "res-equip" && (
        <Modal title="График оборудования" onClose={closeModal}>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {[
              { name: "МРТ", load: 88, status: "Работает" },
              { name: "КТ-аппарат №1", load: 40, status: "Простой" },
              { name: "КТ-аппарат №2", load: 95, status: "ТО через 3 дня" },
              { name: "Рентген", load: 70, status: "Работает" },
              { name: "УЗИ №1", load: 60, status: "Работает" },
            ].map((e, i) => (
              <div key={i} className="border border-gray-100 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">{e.name}</span>
                  <Badge color={e.status === "Работает" ? "bg-green-100 text-green-700" : e.status.includes("ТО") ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}>{e.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${e.load > 85 ? "bg-orange-500" : e.load < 50 ? "bg-gray-400" : "bg-[#0e7ea8]"}`} style={{ width: `${e.load}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{e.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "res-beds" && (
        <Modal title="Коечный фонд" onClose={closeModal}>
          <div className="space-y-3">
            {[
              { dept: "Терапия", total: 60, busy: 48, reserve: 4 },
              { dept: "Хирургия", total: 40, busy: 40, reserve: 0 },
              { dept: "Педиатрия", total: 30, busy: 17, reserve: 2 },
              { dept: "Кардиология", total: 25, busy: 22, reserve: 1 },
              { dept: "Неврология", total: 20, busy: 9, reserve: 3 },
            ].map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl px-4 py-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">{b.dept}</span>
                  <span className="text-xs text-gray-500">занято {b.busy}/{b.total} · резерв {b.reserve}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(b.total, 20) }).map((_, j) => (
                    <div key={j} className={`h-3 flex-1 rounded-sm ${j < Math.round((b.busy / b.total) * 20) ? (b.busy >= b.total ? "bg-red-500" : "bg-[#0e7ea8]") : "bg-gray-100"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "res-ai" && (
        <Modal title="ИИ-оптимизация расписания" onClose={closeModal}>
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-[#0d2b3e] to-[#103d58] rounded-xl p-4 text-white text-sm">
              ИИ проанализировал данные за последние 30 дней и подготовил оптимизированное расписание.
              Ожидаемый эффект: <span className="font-bold text-[#5ecfef]">снижение очередей на 23%</span>, загрузка врачей: <span className="font-bold text-[#5ecfef]">+8% равномерности</span>.
            </div>
            {[
              "Перенести 3 плановые операции с пятницы на вторник",
              "Добавить 1 приём терапевта в 11:00–13:00",
              "Перераспределить нагрузку КТ-аппарата №1",
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#e0f4fb] rounded-xl px-4 py-3 text-sm text-[#0a5e80]">
                <Icon name="Sparkles" size={16} className="shrink-0 mt-0.5" />
                {r}
              </div>
            ))}
            <SubmitBtn label="Применить все рекомендации" />
          </div>
        </Modal>
      )}
      {modal === "res-forecast" && (
        <Modal title="Прогноз загрузки" onClose={closeModal}>
          <div className="space-y-3">
            <SelectField label="Период прогноза" options={["Следующая неделя", "Следующий месяц", "Следующий квартал"]} />
            <div className="space-y-2">
              {[
                { dept: "Терапия", forecast: 82 },
                { dept: "Хирургия", forecast: 95 },
                { dept: "Педиатрия", forecast: 61 },
                { dept: "Кардиология", forecast: 88 },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-28 text-sm text-gray-600 shrink-0">{f.dept}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${f.forecast > 90 ? "bg-red-500" : f.forecast > 80 ? "bg-yellow-500" : "bg-[#1a9e6e]"}`}
                      style={{ width: `${f.forecast}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-600 w-10 text-right">{f.forecast}%</span>
                </div>
              ))}
            </div>
            <SubmitBtn label="Сформировать отчёт" />
          </div>
        </Modal>
      )}
      {modal === "an-kpi" && (
        <Modal title="Дашборд КПЭ" onClose={closeModal}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Выполнение плана посещений", value: "94%", ok: true },
              { label: "Доля онлайн-записей", value: "67%", ok: true },
              { label: "Удовлетворённость (NPS)", value: "4.7/5", ok: true },
              { label: "Среднее время ожидания", value: "18 мин", ok: true },
              { label: "Перегрузка хирургии", value: "112%", ok: false },
              { label: "Отказы от приёма", value: "2.1%", ok: true },
            ].map((k, i) => (
              <div key={i} className={`rounded-xl p-3 border ${k.ok ? "border-gray-100 bg-white" : "border-red-100 bg-red-50"}`}>
                <div className={`text-lg font-bold ${k.ok ? "text-gray-800" : "text-red-600"}`}>{k.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{k.label}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "an-reports" && (
        <Modal title="Отчёты для Минздрава" onClose={closeModal}>
          <div className="space-y-3">
            <SelectField label="Тип отчёта" options={["Форма №30", "Форма №14", "Форма №12", "Сведения об инфекционных заболеваниях"]} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Период с" placeholder="" type="date" />
              <InputField label="По" placeholder="" type="date" />
            </div>
            <SelectField label="Формат выгрузки" options={["Excel (.xlsx)", "XML (ЕГИСЗ)", "PDF"]} />
            <SubmitBtn label="Сформировать отчёт" />
          </div>
        </Modal>
      )}
      {modal === "an-load" && (
        <Modal title="Загрузка отделений" onClose={closeModal}>
          <div className="space-y-2">
            {[
              { name: "Терапия", pct: 72 }, { name: "Хирургия", pct: 112 },
              { name: "Педиатрия", pct: 58 }, { name: "Кардиология", pct: 84 }, { name: "Неврология", pct: 45 },
            ].map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-28 text-sm font-medium text-gray-700 shrink-0">{d.name}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-3 rounded-full ${d.pct > 100 ? "bg-red-500" : d.pct > 80 ? "bg-yellow-500" : "bg-[#0e7ea8]"}`}
                    style={{ width: `${Math.min(d.pct, 100)}%` }} />
                </div>
                <div className={`w-10 text-right text-sm font-bold ${d.pct > 100 ? "text-red-600" : "text-gray-700"}`}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "an-aiforecast" && (
        <Modal title="ИИ-прогноз нагрузок" onClose={closeModal}>
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-[#0d2b3e] to-[#103d58] rounded-xl p-4 text-white text-sm">
              На основе исторических данных и сезонности ИИ прогнозирует рост нагрузки на <span className="text-[#5ecfef] font-bold">+18%</span> в следующие 2 недели.
            </div>
            <SelectField label="Горизонт прогноза" options={["7 дней", "14 дней", "30 дней", "Квартал"]} />
            <SubmitBtn label="Построить прогноз" />
          </div>
        </Modal>
      )}
      {modal === "an-norms" && (
        <Modal title="Сравнение с нормативами" onClose={closeModal}>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {[
              { metric: "Посещений на 1 врача/день", norm: "20", fact: "22", ok: false },
              { metric: "Ожидание в очереди", norm: "≤20 мин", fact: "18 мин", ok: true },
              { metric: "Занятость коечного фонда", norm: "≤85%", fact: "78%", ok: true },
              { metric: "Доля онлайн-записей", norm: "≥50%", fact: "67%", ok: true },
              { metric: "Повторные обращения за 30 дней", norm: "≤15%", fact: "17%", ok: false },
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3">
                <div className="flex-1 text-sm text-gray-700">{n.metric}</div>
                <div className="text-xs text-gray-400">норма: {n.norm}</div>
                <Badge color={n.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{n.fact}</Badge>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "adm-users" && (
        <Modal title="Пользователи и роли" onClose={closeModal}>
          <div className="space-y-3">
            <InputField label="ФИО" placeholder="Фамилия Имя Отчество" />
            <InputField label="Логин" placeholder="latin_login" />
            <InputField label="Пароль" placeholder="Временный пароль" type="password" />
            <SelectField label="Роль" options={["Суперадмин", "Врач", "Медсестра", "Регистратор", "Аналитик"]} />
            <SelectField label="Отделение" options={["Терапия", "Хирургия", "Кардиология", "Педиатрия", "Все"]} />
            <SubmitBtn label="Создать пользователя" />
          </div>
        </Modal>
      )}
      {modal === "adm-integr" && (
        <Modal title="Настройки интеграций" onClose={closeModal}>
          <div className="space-y-3">
            {[
              { name: "ЕГИСЗ", status: "Подключено", color: "bg-green-100 text-green-700" },
              { name: "Госуслуги", status: "Подключено", color: "bg-green-100 text-green-700" },
              { name: "ТФОМС", status: "Подключено", color: "bg-green-100 text-green-700" },
              { name: "ЛИС (лаборатория)", status: "Настройка", color: "bg-yellow-100 text-yellow-700" },
              { name: "1С:Медицина", status: "Отключено", color: "bg-red-100 text-red-700" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-sm font-semibold text-gray-800">{s.name}</span>
                <Badge color={s.color}>{s.status}</Badge>
              </div>
            ))}
            <SubmitBtn label="Сохранить настройки" />
          </div>
        </Modal>
      )}
      {modal === "adm-log" && (
        <Modal title="Журнал событий" onClose={closeModal}>
          <div className="space-y-1 max-h-72 overflow-y-auto text-sm">
            {[
              { time: "09:41", text: "Авторизация admin", type: "info" },
              { time: "09:38", text: "Создана запись: Иванова М.С.", type: "success" },
              { time: "09:22", text: "Синхронизация ЕГИСЗ: 847 записей", type: "success" },
              { time: "08:55", text: "Неверный пароль: petrov_av", type: "warn" },
              { time: "08:00", text: "Автобэкап БД завершён", type: "success" },
              { time: "07:30", text: "Обновление системы v2.4.1", type: "info" },
            ].map((l, i) => (
              <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                <span className="text-gray-400 text-xs w-10 shrink-0">{l.time}</span>
                <Icon name={l.type === "warn" ? "AlertTriangle" : l.type === "success" ? "CheckCircle" : "Info"} size={14}
                  className={`shrink-0 mt-0.5 ${l.type === "warn" ? "text-yellow-500" : l.type === "success" ? "text-green-500" : "text-[#0e7ea8]"}`} />
                <span className="text-gray-600">{l.text}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {modal === "adm-backup" && (
        <Modal title="Резервное копирование" onClose={closeModal}>
          <div className="space-y-3">
            <div className="bg-[#d8f5ec] border border-[#1a9e6e]/20 rounded-xl px-4 py-3 text-sm text-[#12734f]">
              <div className="font-semibold mb-1">Последний бэкап</div>
              <div>03.04.2026, 08:00 — успешно (размер: 2.4 GB)</div>
            </div>
            <SelectField label="Тип бэкапа" options={["Полный бэкап БД", "Инкрементальный", "Только конфигурация"]} />
            <SelectField label="Хранилище" options={["Облако (S3)", "Локальный сервер", "Оба варианта"]} />
            <SubmitBtn label="Запустить бэкап сейчас" />
          </div>
        </Modal>
      )}
    </div>
  );
}
