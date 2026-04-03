import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О системе" },
  { id: "patients", label: "Для пациентов" },
  { id: "cases", label: "Кейсы" },
  { id: "integrations", label: "Интеграции" },
];

const FEATURES = [
  {
    icon: "Users",
    title: "Управление потоками пациентов",
    desc: "Интеллектуальное распределение потоков с учётом срочности, специализации врача и приоритетных категорий.",
  },
  {
    icon: "FileText",
    title: "Электронная медицинская карта",
    desc: "Единая ЭМК с доступом из любой точки учреждения. Полная история болезни, назначений и результатов.",
  },
  {
    icon: "BarChart3",
    title: "Аналитика и отчётность",
    desc: "Автоматическая генерация отчётности для ТФОМС, Минздрава и внутреннего контроля качества.",
  },
  {
    icon: "Calendar",
    title: "Онлайн-запись",
    desc: "Многоканальная запись через Госуслуги, сайт, терминалы самообслуживания и call-центр.",
  },
  {
    icon: "Shield",
    title: "Безопасность данных",
    desc: "Соответствие 152-ФЗ, шифрование данных, ролевая модель доступа и полный аудит действий.",
  },
  {
    icon: "Cpu",
    title: "ИИ-диагностика ресурсов",
    desc: "Предиктивный анализ загрузки кабинетов, оборудования и персонала для максимальной эффективности.",
  },
];

const PATIENT_CHANNELS = [
  { icon: "Globe", label: "Портал Госуслуг", color: "#0e7ea8" },
  { icon: "Monitor", label: "Сайт клиники", color: "#1a9e6e" },
  { icon: "Smartphone", label: "Мобильное приложение", color: "#0e7ea8" },
  { icon: "CreditCard", label: "Терминал самообслуживания", color: "#1a9e6e" },
  { icon: "Phone", label: "Call-центр", color: "#0e7ea8" },
];

const CASES = [
  {
    name: "ГБУЗ «Городская клиническая больница № 52»",
    city: "Москва",
    type: "Многопрофильный стационар · 1 200 коек",
    img: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/files/1ea8df1d-0298-433f-855a-8456384ac624.jpg",
    stats: [
      { value: "−68%", label: "Время ожидания в очереди" },
      { value: "+41%", label: "Пропускная способность" },
      { value: "0 мин", label: "Задержка отчётности в ТФОМС" },
    ],
    quote: "За первые 3 месяца работы с MedOrganizer Pro мы сократили время ожидания пациентов более чем вдвое. Система сама распределяет потоки — персонал занимается лечением, а не очередями.",
    author: "Иванова М.В., главный врач",
  },
  {
    name: "КГБУЗ «Краевая клиническая больница»",
    city: "Красноярск",
    type: "Региональный стационар · 800 коек",
    img: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/files/246e0a9a-1d75-4b5e-9348-9e715c2be8ec.jpg",
    stats: [
      { value: "×3.2", label: "Скорость оформления ЭМК" },
      { value: "−34%", label: "Административная нагрузка" },
      { value: "98.7%", label: "Точность ведения документов" },
    ],
    quote: "Переход на ЭМК прошёл за 6 недель без остановки работы. Врачи освоили интерфейс за 2 дня — система интуитивна и не требует длительного обучения.",
    author: "Петров С.А., зам. главного врача по IT",
  },
  {
    name: "ГАУЗ «Республиканская поликлиника»",
    city: "Казань",
    type: "Амбулаторно-поликлиническое учреждение · 600 посещений/день",
    img: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/files/d8bd48af-48b3-46fb-91b6-48d253f466db.jpg",
    stats: [
      { value: "87%", label: "Запись через цифровые каналы" },
      { value: "−52%", label: "Нагрузка на регистратуру" },
      { value: "4.8/5", label: "Оценка удовлетворённости" },
    ],
    quote: "Онлайн-запись через Госуслуги разгрузила наш call-центр на 50%. Пациенты довольны — можно записаться в любое время, не выходя из дома.",
    author: "Сидорова Е.Н., руководитель проекта цифровизации",
  },
];

const INTEGRATIONS = [
  { icon: "Building2", name: "Госуслуги", desc: "ЕСИА-авторизация и запись через портал" },
  { icon: "HeartPulse", name: "ЕГИСЗ", desc: "Федеральная система здравоохранения" },
  { icon: "Database", name: "ТФОМС", desc: "Автоматическая подача реестров" },
  { icon: "Stethoscope", name: "СБИС / 1С:Медицина", desc: "Интеграция с бухгалтерией и ERP" },
  { icon: "Activity", name: "ЛИС / РИС", desc: "Лабораторные и радиологические системы" },
  { icon: "Wifi", name: "БАРС.Здоровье", desc: "Региональные MIS-платформы" },
  { icon: "CreditCard", name: "Терминалы самообслуживания", desc: "Киоски, ИНФОМАТ, банковские системы" },
  { icon: "Bell", name: "SMS / Push / Email", desc: "Напоминания и уведомления пациентам" },
];

const STATS_HERO = [
  { value: "350+", label: "Внедрений по России" },
  { value: "2.4 млн", label: "Пациентов в системе" },
  { value: "12 лет", label: "На рынке МИС" },
  { value: "98%", label: "Уровень SLA" },
];

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const AUTHORS = [
  { name: "Дмитрий Игоревич Азаров", initials: "ДА", photo: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/bucket/b3c4cf7a-2def-4a2d-9301-6b792401ef5b.JPG" },
  { name: "Алексей Евгеньевич Яблоков", initials: "АЯ", photo: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/bucket/0ab517d9-69a2-412a-87f8-1ad927a5a443.JPG" },
  { name: "Ирина Владимировна Бажутова", initials: "ИБ", photo: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/bucket/2e771ba7-260e-40f7-b0a1-0c4c47fa93ff.JPG" },
  { name: "Марина Вадимовна Горбовская", initials: "МГ", photo: "https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/bucket/f898c162-bb3d-41d1-94d9-f8c68cd9dbcb.jpg" },
  { name: "Евгений Андреевич Овчинников", initials: "ЕО", vk: "https://vk.ru/t113r" },
  { name: "Егор Андреевич Овчинников", initials: "ЕО", vk: "https://vk.ru/idploxo" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: "", org: "", phone: "", email: "" });
  const [demoSent, setDemoSent] = useState(false);
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const scrollPos = window.scrollY + 120;
      NAV_LINKS.forEach((l) => {
        const sec = document.getElementById(l.id);
        if (sec && scrollPos >= sec.offsetTop) setActiveNav(l.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-white font-golos">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-white" />
            </div>
            <div>
              <span className="font-oswald text-white text-xl font-semibold tracking-wide">MedOrganizer</span>
              <span className="font-oswald text-[#5ecfef] text-xl font-semibold tracking-wide"> Pro</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`text-sm font-medium transition-colors ${activeNav === l.id ? "text-[#5ecfef]" : "text-white/80 hover:text-white"}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            onClick={() => setShowLoginModal(true)}
          >
            <Icon name="LogIn" size={16} />
            Войти в систему
          </button>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#0d2b3e] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-white/80 text-left text-base">
                {l.label}
              </button>
            ))}
            <button
              className="bg-white/10 border border-white/25 text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-left flex items-center gap-2"
              onClick={() => { setShowLoginModal(true); setMobileMenu(false); }}
            >
              <Icon name="LogIn" size={16} />
              Войти в систему
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="hero-gradient min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0e7ea8]/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#1a9e6e]/10 blur-3xl" />

        <div className="absolute top-32 right-32 hidden lg:block">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-[#0e7ea8] animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-[#0e7ea8] animate-pulse-ring" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 hidden lg:block">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#1a9e6e] animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-0 rounded-full bg-[#1a9e6e] animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in opacity-0-init">
                <div className="w-2 h-2 rounded-full bg-[#1a9e6e] animate-pulse" />
                <span className="text-white/90 text-sm font-medium">МИС класса ERP · Сертифицировано Минздравом РФ</span>
              </div>

              <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.05] mb-6 animate-fade-in-up opacity-0-init delay-100">
                Умный контур<br />
                <span className="gradient-text">управления</span><br />
                здравоохранением
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-10 animate-fade-in-up opacity-0-init delay-200 max-w-lg">
                Комплексная автоматизация лечебно-профилактических учреждений — от районной поликлиники до регионального минздрава. Единая ЭМК, онлайн-запись, ИИ-оптимизация ресурсов.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0-init delay-300">
                <button
                  className="flex items-center gap-2 bg-[#0e7ea8] hover:bg-[#0a5e80] text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
                  onClick={() => scrollTo("cases")}
                >
                  <Icon name="PlayCircle" size={20} />
                  Смотреть кейсы
                </button>
                <button
                  className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:bg-white/10 text-base"
                  onClick={() => scrollTo("about")}
                >
                  <Icon name="Info" size={20} />
                  О системе
                </button>
              </div>

              {/* AUTHORS */}
              <div className="mt-10 animate-fade-in-up opacity-0-init delay-400">
                <div className="text-white/40 text-xs uppercase tracking-widest mb-3 font-medium">Авторы проекта</div>
                <div className="flex flex-col gap-2">
                  {AUTHORS.map((a, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {a.photo ? (
                        <img src={a.photo} alt={a.name} className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/20" />
                      ) : a.vk ? (
                        <a href={a.vk} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0077FF] flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity" title="ВКонтакте">
                          <span className="text-white text-[10px] font-bold">VK</span>
                        </a>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center shrink-0">
                          <span className="text-white text-[10px] font-bold">{a.initials}</span>
                        </div>
                      )}
                      <span className="text-white/75 text-sm">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in opacity-0-init delay-400">
              <div className="relative animate-float">
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40">
                  <img
                    src="https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/files/d8bd48af-48b3-46fb-91b6-48d253f466db.jpg"
                    alt="MedOrganizer Pro Dashboard"
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b3e]/60 via-transparent to-transparent rounded-2xl" />
                </div>

                <div className="absolute -left-8 top-12 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d8f5ec] flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-[#1a9e6e]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Очереди устранены</div>
                    <div className="text-sm font-bold text-gray-800">−68% ожидания</div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-16 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e0f4fb] flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-[#0e7ea8]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Эффективность врачей</div>
                    <div className="text-sm font-bold text-gray-800">+41% пропускная</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up opacity-0-init delay-500">
            {STATS_HERO.map((s, i) => (
              <div key={i} className="border border-white/15 rounded-xl p-5 text-center backdrop-blur-sm bg-white/5">
                <div className="font-oswald text-3xl md:text-4xl text-white font-bold mb-1">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#e0f4fb] text-[#0a5e80] rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Icon name="Layers" size={16} />
                О системе
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-gray-900 font-bold mb-4">
                Полный цифровой контур<br />
                <span className="text-[#0e7ea8]">медицинского учреждения</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                MedOrganizer Pro охватывает все ключевые процессы — от записи пациента до формирования отчётности для надзорных органов.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <AnimatedSection key={i}>
                <div className="card-hover rounded-2xl border border-gray-100 bg-white p-7 shadow-sm h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e7ea8] to-[#0a5e80] flex items-center justify-center mb-5">
                    <Icon name={f.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-xl text-gray-900 font-semibold mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-20">
            <div className="rounded-3xl bg-gradient-to-br from-[#0d2b3e] to-[#103d58] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-oswald text-3xl text-white font-bold mb-4">
                    Масштабируется под любое учреждение
                  </h3>
                  <p className="text-white/70 mb-8 leading-relaxed">
                    Единая архитектура работает для районной поликлиники и регионального минздрава. Модульная структура позволяет подключать только нужные блоки.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: "Building", label: "Поликлиники" },
                      { icon: "Cross", label: "Стационары" },
                      { icon: "MapPin", label: "Региональный МЗ" },
                      { icon: "Network", label: "Сети клиник" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                        <Icon name={item.icon} size={18} className="text-[#5ecfef]" />
                        <span className="text-white text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/projects/50560f61-ac0b-40cb-8ed0-c908fda59e58/files/1ea8df1d-0298-433f-855a-8456384ac624.jpg"
                    alt="Внедрение системы"
                    className="rounded-2xl w-full object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-[#1a9e6e] text-white rounded-xl px-5 py-3 shadow-xl">
                    <div className="font-oswald text-2xl font-bold">6 нед.</div>
                    <div className="text-sm text-white/80">Среднее время внедрения</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PATIENTS */}
      <section id="patients" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#d8f5ec] text-[#12734f] rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Icon name="Heart" size={16} />
                Для пациентов
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-gray-900 font-bold mb-4">
                Запись <span className="text-[#1a9e6e]">везде и всегда</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                5 каналов онлайн-записи. Умное распределение талонов с учётом льготных категорий и диспансерных групп.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-4">
                {PATIENT_CHANNELS.map((ch, i) => (
                  <div key={i} className="flex items-center gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 card-hover">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: ch.color + "20" }}>
                      <Icon name={ch.icon} size={22} style={{ color: ch.color }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{ch.label}</div>
                      <div className="text-gray-500 text-sm">Автоматическое распределение и подтверждение</div>
                    </div>
                    <div className="ml-auto">
                      <Icon name="ChevronRight" size={18} className="text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6">
                <h3 className="font-oswald text-3xl text-gray-900 font-bold">Приоритетные категории всегда в приоритете</h3>
                <p className="text-gray-500 leading-relaxed">
                  Система автоматически учитывает статус пациента при распределении талонов — льготники, диспансерные группы, экстренные случаи получают приоритет без ручного вмешательства.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "Star", label: "Льготные категории", color: "text-yellow-600", bg: "bg-yellow-50" },
                    { icon: "AlertCircle", label: "Экстренный приём", color: "text-red-500", bg: "bg-red-50" },
                    { icon: "ClipboardList", label: "Диспансерные группы", color: "text-[#0e7ea8]", bg: "bg-[#e0f4fb]" },
                    { icon: "Baby", label: "Дети до 14 лет", color: "text-[#1a9e6e]", bg: "bg-[#d8f5ec]" },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-xl p-4 flex items-center gap-3`}>
                      <Icon name={item.icon} size={20} className={item.color} />
                      <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#0d2b3e] rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a9e6e]/20 flex items-center justify-center shrink-0">
                      <Icon name="MessageCircle" size={20} className="text-[#1a9e6e]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">SMS и Push-уведомления</div>
                      <div className="text-white/60 text-sm">Напоминания о приёме, изменения расписания и результаты анализов — автоматически.</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#e0f4fb] text-[#0a5e80] rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Icon name="Trophy" size={16} />
                Кейсы
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-gray-900 font-bold mb-4">
                Реальные результаты<br />
                <span className="text-[#0e7ea8]">в реальных учреждениях</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Более 350 успешных внедрений по всей России — от сельских ФАП до крупных многопрофильных стационаров.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {CASES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCaseIdx(i)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCaseIdx === i
                      ? "bg-[#0e7ea8] text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c.city}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="relative min-h-[400px]">
            {CASES.map((c, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${activeCaseIdx === i ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}
              >
                <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                  <div className="relative rounded-3xl overflow-hidden min-h-80">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b3e] via-[#0d2b3e]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <Icon name="Quote" size={28} className="text-[#0e7ea8] mb-3" />
                      <p className="text-white text-base leading-relaxed mb-4 italic">«{c.quote}»</p>
                      <div className="text-white/70 text-sm">— {c.author}</div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#e0f4fb] text-[#0a5e80] rounded-full px-3 py-1 text-xs font-semibold mb-4">
                        {c.type}
                      </div>
                      <h3 className="font-oswald text-2xl text-gray-900 font-bold mb-2">{c.name}</h3>
                      <p className="text-gray-500 text-sm mb-8">{c.city}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                      {c.stats.map((s, j) => (
                        <div key={j} className="stat-glow bg-gradient-to-br from-[#0e7ea8]/5 to-[#1a9e6e]/5 border border-[#0e7ea8]/15 rounded-2xl p-5 text-center">
                          <div className="font-oswald text-3xl font-bold text-[#0e7ea8] mb-1">{s.value}</div>
                          <div className="text-gray-500 text-xs leading-snug">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#d8f5ec] flex items-center justify-center shrink-0">
                        <Icon name="CheckCircle2" size={20} className="text-[#1a9e6e]" />
                      </div>
                      <div className="text-gray-600 text-sm">
                        Внедрение выполнено в плановые сроки. Система работает в штатном режиме без остановки деятельности учреждения.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="py-24 bg-gradient-to-br from-[#0d2b3e] to-[#103d58] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0e7ea8]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Icon name="Plug" size={16} />
                Интеграции
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-white font-bold mb-4">
                Подключается к любой<br />
                <span className="gradient-text">существующей инфраструктуре</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Готовые коннекторы к ключевым государственным системам, региональным МИС и коммерческим платформам.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {INTEGRATIONS.map((item, i) => (
              <AnimatedSection key={i}>
                <div className="card-hover bg-white/[0.07] border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#0e7ea8]/20 flex items-center justify-center mb-4">
                    <Icon name={item.icon} size={22} className="text-[#5ecfef]" />
                  </div>
                  <div className="text-white font-semibold mb-1">{item.name}</div>
                  <div className="text-white/50 text-sm">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#0e7ea8] to-[#1a9e6e] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-4 right-8 font-oswald text-8xl font-bold text-white/10 select-none">+350</div>
              <div className="relative z-10">
                <h3 className="font-oswald text-3xl md:text-4xl text-white font-bold mb-4">
                  Готовы автоматизировать ваше учреждение?
                </h3>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Оставьте заявку — мы проведём бесплатную демонстрацию системы и подберём оптимальную конфигурацию.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    className="flex items-center gap-2 bg-white text-[#0e7ea8] font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all text-base hover:scale-105"
                    onClick={() => setShowDemoModal(true)}
                  >
                    <Icon name="Calendar" size={20} />
                    Записаться на демо
                  </button>
                  <a
                    href="mailto:info@medorganizer.ru?subject=Запрос%20презентации%20MedOrganizer%20Pro"
                    className="flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
                  >
                    <Icon name="Download" size={20} />
                    Скачать презентацию
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DEMO MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowDemoModal(false); setDemoSent(false); }} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => { setShowDemoModal(false); setDemoSent(false); }}
            >
              <Icon name="X" size={16} className="text-gray-600" />
            </button>

            {demoSent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#d8f5ec] flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-[#1a9e6e]" />
                </div>
                <h3 className="font-oswald text-2xl text-gray-900 font-bold mb-2">Заявка отправлена!</h3>
                <p className="text-gray-500 text-sm">Наш менеджер свяжется с вами в течение одного рабочего дня.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-oswald text-xl text-gray-900 font-bold">Записаться на демо</h3>
                    <p className="text-gray-500 text-xs">Бесплатная демонстрация системы</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ваше имя *</label>
                    <input
                      type="text"
                      placeholder="Иванова Мария Владимировна"
                      value={demoForm.name}
                      onChange={e => setDemoForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Организация *</label>
                    <input
                      type="text"
                      placeholder="ГБУЗ «Городская больница №1»"
                      value={demoForm.org}
                      onChange={e => setDemoForm(f => ({ ...f, org: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={demoForm.phone}
                      onChange={e => setDemoForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
                    <input
                      type="email"
                      placeholder="ivanova@hospital.ru"
                      value={demoForm.email}
                      onChange={e => setDemoForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] transition-all"
                    />
                  </div>
                </div>
                <button
                  className="w-full mt-6 bg-gradient-to-r from-[#0e7ea8] to-[#1a9e6e] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => { if (demoForm.name && demoForm.org && demoForm.phone) setDemoSent(true); }}
                  disabled={!demoForm.name || !demoForm.org || !demoForm.phone}
                >
                  Отправить заявку
                </button>
                <p className="text-gray-400 text-xs text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowLoginModal(false); setLoginError(""); }} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-fade-in-up">
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => { setShowLoginModal(false); setLoginError(""); }}
            >
              <Icon name="X" size={16} className="text-gray-600" />
            </button>
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center">
                <Icon name="Activity" size={28} className="text-white" />
              </div>
            </div>
            <h3 className="font-oswald text-2xl text-gray-900 font-bold text-center mb-1">Вход в систему</h3>
            <p className="text-gray-500 text-sm text-center mb-6">MedOrganizer Pro</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Логин</label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Введите логин"
                    value={loginForm.login}
                    onChange={e => { setLoginForm(f => ({ ...f, login: e.target.value })); setLoginError(""); }}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    value={loginForm.password}
                    onChange={e => { setLoginForm(f => ({ ...f, password: e.target.value })); setLoginError(""); }}
                    onKeyDown={e => { if (e.key === "Enter") setLoginError("Неверный логин или пароль"); }}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7ea8]/30 focus:border-[#0e7ea8] transition-all"
                  />
                </div>
              </div>
              {loginError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <Icon name="AlertCircle" size={16} className="text-red-500 shrink-0" />
                  <span className="text-red-600 text-sm">{loginError}</span>
                </div>
              )}
            </div>
            <button
              className="w-full mt-6 bg-gradient-to-r from-[#0e7ea8] to-[#1a9e6e] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (!loginForm.login || !loginForm.password) {
                  setLoginError("Введите логин и пароль");
                } else {
                  setLoginError("Неверный логин или пароль");
                }
              }}
              disabled={!loginForm.login || !loginForm.password}
            >
              Войти
            </button>
            <button className="w-full mt-3 text-[#0e7ea8] text-sm hover:underline">
              Забыли пароль?
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0d2b3e] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0e7ea8] to-[#1a9e6e] flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-white" />
                </div>
                <span className="font-oswald text-white text-xl font-semibold">MedOrganizer Pro</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Медицинская информационная система класса ERP для комплексной автоматизации здравоохранения.
              </p>
              <div className="flex gap-3 mt-5">
                {["Mail", "Phone", "MessageSquare"].map((icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                    <Icon name={icon} size={16} className="text-white/70" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Разделы</div>
              <div className="space-y-2">
                {NAV_LINKS.map(l => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-white/50 hover:text-white text-sm transition-colors">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Контакты</div>
              <div className="space-y-3">
                {[
                  { icon: "Phone", text: "+7 (800) 555-35-35" },
                  { icon: "Mail", text: "info@medorganizer.ru" },
                  { icon: "MapPin", text: "Москва, ул. Академика Пилюгина, 14" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Icon name={item.icon} size={15} className="text-[#0e7ea8] mt-0.5 shrink-0" />
                    <span className="text-white/50 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/30 text-sm">© 2024 MedOrganizer Pro. Все права защищены.</div>
            <div className="flex gap-6">
              {["Политика конфиденциальности", "Пользовательское соглашение"].map((t, i) => (
                <button key={i} className="text-white/30 hover:text-white/60 text-sm transition-colors">{t}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}