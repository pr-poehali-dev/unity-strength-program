import { useState } from "react";
import SectionCard from "@/components/SectionCard";
import CalendarTable from "@/components/CalendarTable";
import { shifts, calendarData, eventTypeLabels, squadIcons } from "@/data/programData";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "titlepage", label: "Титульный лист" },
  { id: "section1", label: "1. Пояснительная записка" },
  { id: "section2", label: "2. Содержание программы" },
  { id: "section3", label: "3. Организационные условия" },
  { id: "section4", label: "4. Оценка эффективности" },
  { id: "section5", label: "5. Факторы риска" },
  { id: "section6", label: "6. Обратная связь" },
  { id: "section7", label: "7. Литература" },
  { id: "section8", label: "8. Приложения" },
];

const Index = () => {
  const [activeShift, setActiveShift] = useState(1);
  const [navOpen, setNavOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const currentShiftData = calendarData.find((s) => s.shiftNum === activeShift);

  return (
    <div className="min-h-screen bg-doc-light font-golos">
      {/* Шапка */}
      <header className="bg-doc-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-doc-gold rounded flex items-center justify-center">
              <Icon name="Star" size={16} className="text-doc-gold" />
            </div>
            <div>
              <p className="text-doc-gold text-xs font-semibold uppercase tracking-widest">Программа воспитательной работы</p>
              <p className="text-white text-sm font-bold leading-tight">«В единстве наша сила»</p>
            </div>
          </div>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <Icon name="Menu" size={20} />
            <span className="hidden sm:inline">Разделы</span>
          </button>
        </div>
        {navOpen && (
          <div className="border-t border-white/10 bg-doc-navy">
            <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-white/70 hover:text-doc-gold hover:bg-white/5 px-3 py-2 rounded text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* Титульный лист */}
        <section id="titlepage" className="mb-16 scroll-mt-24">
          <div className="bg-white border-2 border-doc-navy rounded-lg p-10 text-center shadow-sm">
            <div className="border-b border-doc-border pb-4 mb-6">
              <p className="font-golos text-sm text-gray-500 uppercase tracking-widest">Муниципальное бюджетное учреждение</p>
              <p className="font-golos text-sm text-gray-500">«Загородный оздоровительный лагерь»</p>
            </div>
            <div className="py-8">
              <p className="font-cormorant text-lg text-doc-blue mb-2 italic">Программа воспитательной работы</p>
              <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-doc-navy leading-tight mb-2">
                «В единстве наша сила»
              </h1>
              <div className="w-24 h-1 bg-doc-gold mx-auto my-4" />
              <p className="font-golos text-gray-600 text-base mt-4">Загородный оздоровительный лагерь</p>
              <p className="font-golos text-gray-600 text-sm">5 оздоровительных смен · 2025 год</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-doc-border">
              {shifts.map((s) => (
                <div key={s.num} className={`rounded-lg p-3 border ${s.inclusive ? "border-purple-300 bg-purple-50" : "bg-doc-light border-doc-border"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-cormorant text-doc-gold text-2xl font-bold">{s.num}</p>
                    {s.inclusive && <span className="text-xs bg-purple-100 text-purple-700 border border-purple-300 px-1.5 py-0.5 rounded font-golos">♿ Инклюзив</span>}
                  </div>
                  <p className="font-golos text-xs font-semibold text-doc-navy">{s.dates}</p>
                  <p className="font-golos text-xs text-doc-blue mt-1">{s.days} дней</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.squads.map((sq, i) => (
                      <span key={i} className="text-xs">{squadIcons[sq] || "🏅"}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-doc-border text-left grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 font-golos text-xs uppercase tracking-wide mb-1">Разработчик программы</p>
                <p className="font-golos text-doc-navy">___________________________</p>
                <p className="font-golos text-gray-500 text-xs">(должность, Ф.И.О.)</p>
              </div>
              <div>
                <p className="text-gray-500 font-golos text-xs uppercase tracking-wide mb-1">Утверждена</p>
                <p className="font-golos text-doc-navy">Приказ № ___ от ___.___.2025</p>
                <p className="font-golos text-gray-500 text-xs">Начальник лагеря: _______________</p>
              </div>
            </div>
          </div>
        </section>

        {/* Раздел 1 */}
        <SectionCard id="section1" number="1" title="Пояснительная записка">
          <div className="bg-white rounded-lg border border-doc-border p-6 space-y-6">

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Актуальность программы
              </h3>
              <p className="font-golos text-gray-700 leading-relaxed text-sm">
                В современных условиях развития российского общества особую актуальность приобретают вопросы воспитания у подрастающего поколения гражданских, патриотических и общечеловеческих ценностей. Загородный оздоровительный лагерь является уникальным пространством для социализации детей, формирования навыков командной работы, развития лидерских качеств и оздоровления.
              </p>
              <p className="font-golos text-gray-700 leading-relaxed text-sm mt-2">
                Программа «В единстве наша сила» направлена на создание условий для всестороннего развития личности ребёнка через систему коллективно-творческих дел, спортивно-оздоровительных мероприятий, патриотического воспитания и развития самоуправления в условиях временного детского коллектива.
              </p>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Новизна программы
              </h3>
              <p className="font-golos text-gray-700 leading-relaxed text-sm">
                Новизна программы заключается в интеграции традиционных форм воспитательной работы с современными технологиями активного обучения: проектной деятельностью, квест-технологиями, тренингами командообразования, «верёвочным курсом». Каждая смена имеет собственную тематику и является самостоятельным законченным воспитательным циклом, при этом все смены объединены единой идеей — «В единстве наша сила».
              </p>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Отличительные особенности программы
              </h3>
              <ul className="space-y-2">
                {[
                  "Отряды формируются по видам спорта — каждый отряд представляет одну спортивную дисциплину",
                  "Три направления воспитательной работы: «Россия» (патриотика), «Человек» (личностный рост), «Мир» (командность, экология, творчество)",
                  "Тематическая направленность каждой смены с единой концепцией программы",
                  "Инклюзивная 3 смена: полноценное участие детей с ОВЗ и паралимпийцев наравне со всеми",
                  "Реализация принципа детского самоуправления на всех уровнях организации лагерной жизни",
                  "Применение современных педагогических технологий: квест, проект, тренинг, верёвочный курс",
                  "Система стимулирования и мотивации, основанная на игровом взаимодействии",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-golos text-sm text-gray-700">
                    <span className="text-doc-gold mt-1 flex-shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Направленность программы
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: "Heart", label: "Социально-педагогическая", desc: "Формирование навыков взаимодействия в коллективе, развитие коммуникативных компетенций" },
                  { icon: "Shield", label: "Патриотическая", desc: "Воспитание гражданственности, любви к Родине, уважения к истории и культуре России" },
                  { icon: "Leaf", label: "Экологическая", desc: "Формирование экологического мышления, бережного отношения к природе" },
                  { icon: "Dumbbell", label: "Спортивно-оздоровительная", desc: "Укрепление здоровья, приобщение к здоровому образу жизни, развитие физических качеств" },
                ].map((d, i) => (
                  <div key={i} className="bg-doc-light border border-doc-border rounded-lg p-4">
                    <p className="font-golos font-semibold text-doc-navy text-sm mb-1">{d.label}</p>
                    <p className="font-golos text-gray-600 text-xs leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Адресат программы
              </h3>
              <p className="font-golos text-gray-700 leading-relaxed text-sm">
                Программа предназначена для детей в возрасте от 7 до 17 лет, посещающих загородный оздоровительный лагерь. Программа учитывает возрастные особенности детей: младший школьный возраст (7–10 лет), средний школьный возраст (11–13 лет) и старший школьный возраст (14–17 лет). Наполняемость: до 200 детей в смену.
              </p>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Цель и задачи программы
              </h3>
              <div className="bg-doc-navy text-white rounded-lg p-4 mb-4">
                <p className="font-golos text-xs uppercase tracking-widest text-doc-gold mb-2">Цель программы</p>
                <p className="font-cormorant text-lg italic leading-relaxed">
                  Создание условий для разностороннего развития личности ребёнка, укрепления его здоровья, формирования активной гражданской позиции и опыта коллективного взаимодействия в рамках временного детского коллектива.
                </p>
              </div>
              <p className="font-golos font-semibold text-doc-navy text-sm mb-2">Задачи программы:</p>
              <ul className="space-y-2">
                {[
                  "Организовать полноценный отдых и оздоровление детей в условиях загородного лагеря",
                  "Создать благоприятные условия для формирования навыков здорового образа жизни",
                  "Развивать социальные компетенции: коммуникабельность, толерантность, умение работать в команде",
                  "Воспитывать патриотизм, гражданственность, любовь к Родине, уважение к отечественной истории",
                  "Формировать экологическую культуру, ответственное отношение к природе",
                  "Создавать условия для творческой самореализации каждого ребёнка",
                  "Развивать лидерские качества и навыки самоуправления",
                  "Обеспечить психологическую безопасность и эмоциональный комфорт каждого участника",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-golos text-sm text-gray-700">
                    <span className="text-doc-blue font-bold flex-shrink-0">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Ожидаемые результаты
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: "Личностные", items: ["Позитивная Я-концепция", "Сформированные ценностные ориентиры", "Опыт коллективной деятельности", "Навыки саморегуляции"] },
                  { title: "Социальные", items: ["Умение работать в команде", "Навыки лидерства и самоуправления", "Толерантность и уважение к другим", "Активная гражданская позиция"] },
                  { title: "Оздоровительные", items: ["Укрепление физического здоровья", "Сформированные ЗОЖ-привычки", "Снижение психоэмоционального напряжения", "Позитивный отдых"] },
                ].map((block, i) => (
                  <div key={i} className="border border-doc-border rounded-lg p-4">
                    <p className="font-cormorant text-lg font-bold text-doc-navy mb-3">{block.title}</p>
                    <ul className="space-y-1">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Принципы реализации программы
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Принцип гуманизма", desc: "Уважение к личности каждого ребёнка, признание его ценности и уникальности" },
                  { title: "Принцип природосообразности", desc: "Учёт возрастных и индивидуальных особенностей каждого воспитанника" },
                  { title: "Принцип добровольности", desc: "Участие в мероприятиях основано на свободном выборе и интересах детей" },
                  { title: "Принцип коллективности", desc: "Развитие личности в процессе коллективного взаимодействия и сотрудничества" },
                  { title: "Принцип системности", desc: "Целостность и последовательность воспитательной работы на протяжении всех смен" },
                  { title: "Принцип творческой активности", desc: "Создание условий для проявления творческих способностей каждого ребёнка" },
                ].map((p, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-doc-light rounded-lg border border-doc-border">
                    <span className="text-doc-gold text-lg flex-shrink-0">◆</span>
                    <div>
                      <p className="font-golos font-semibold text-doc-navy text-sm">{p.title}</p>
                      <p className="font-golos text-gray-600 text-xs mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Технологии реализации программы
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  "Технология коллективного творческого дела (КТД)",
                  "Игровые технологии (квест, ролевая игра, деловая игра)",
                  "Проектные технологии",
                  "Технологии активного обучения (тренинг, «верёвочный курс»)",
                  "Здоровьесберегающие технологии",
                  "Технологии самоуправления",
                ].map((t, i) => (
                  <div key={i} className="bg-white border border-doc-border rounded-lg p-3 text-center">
                    <p className="font-golos text-sm text-doc-navy">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Методы реализации программы
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { cat: "Методы формирования сознания", methods: ["Беседа", "Лекция", "Дискуссия", "Личный пример", "Разъяснение"] },
                  { cat: "Методы организации деятельности", methods: ["Поручение", "Упражнение", "Создание воспитывающих ситуаций", "Игра", "Труд"] },
                  { cat: "Методы стимулирования", methods: ["Поощрение", "Соревнование", "Награждение", "Создание ситуации успеха", "Общественное мнение"] },
                ].map((m, i) => (
                  <div key={i} className="border border-doc-border rounded-lg p-4">
                    <p className="font-golos font-semibold text-doc-navy text-xs mb-2 uppercase tracking-wide">{m.cat}</p>
                    <ul className="space-y-1">
                      {m.methods.map((item, j) => (
                        <li key={j} className="font-golos text-sm text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-doc-blue rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Раздел 2 */}
        <SectionCard id="section2" number="2" title="Содержание программы">
          <div className="bg-white rounded-lg border border-doc-border p-6 space-y-6">

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Этапы реализации программы
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { stage: "I этап", name: "Организационный", period: "1–3 день смены", content: "Заезд, знакомство, формирование отрядов и органов самоуправления, анкетирование «Чемодан ожиданий», огонёк знакомства, принятие законов лагерной жизни" },
                  { stage: "II этап", name: "Основной", period: "4–(n-2) день", content: "Реализация тематических мероприятий по всем направлениям: патриотическому, экологическому, спортивному, творческому, социальному. Работа органов самоуправления" },
                  { stage: "III этап", name: "Итоговый", period: "Последние 2 дня", content: "Подведение итогов, итоговый огонёк «Каким я стал», анкетирование, торжественное закрытие смены, награждение, прощальный концерт" },
                ].map((s, i) => (
                  <div key={i} className="border-2 border-doc-border rounded-lg p-4 relative">
                    <div className="absolute -top-3 left-4 bg-doc-navy text-doc-gold text-xs font-golos font-bold px-3 py-1 rounded">
                      {s.stage}
                    </div>
                    <p className="font-cormorant text-lg font-bold text-doc-navy mt-2 mb-1">{s.name}</p>
                    <p className="font-golos text-xs text-doc-blue mb-2">{s.period}</p>
                    <p className="font-golos text-sm text-gray-600 leading-relaxed">{s.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Направления реализации программы
              </h3>
              <div className="space-y-3">
                {[
                  { num: "01", title: "Гражданско-патриотическое", color: "bg-red-50 border-red-200", desc: "Воспитание любви к Родине, уважения к государственной символике, памяти героев Отечества. Проведение тематических мероприятий к памятным датам (22 июня, 12 июня, 2 августа)" },
                  { num: "02", title: "Спортивно-оздоровительное", color: "bg-green-50 border-green-200", desc: "Ежедневная утренняя зарядка, спортивные секции, соревнования, Олимпиада лагеря, плавание, пионербол, эстафеты. Формирование навыков ЗОЖ" },
                  { num: "03", title: "Творческое", color: "bg-purple-50 border-purple-200", desc: "КВН, концерты, театральные постановки, мастер-классы, художественное творчество, прикладные ремёсла, музыкальные и танцевальные мероприятия" },
                  { num: "04", title: "Социальное", color: "bg-blue-50 border-blue-200", desc: "Развитие коммуникативных навыков, толерантности, умения работать в команде. Волонтёрская деятельность, акции милосердия, помощь ветеранам" },
                  { num: "05", title: "Экологическое", color: "bg-emerald-50 border-emerald-200", desc: "Изучение природы, экологические акции «Чистый берег», посадка деревьев, наблюдения за природой, формирование ответственного отношения к окружающей среде" },
                  { num: "06", title: "Интеллектуальное", color: "bg-amber-50 border-amber-200", desc: "Квизы, брейн-ринги, интеллектуальные марафоны, игры «Что? Где? Когда?», познавательные беседы, развитие критического мышления" },
                ].map((d, i) => (
                  <div key={i} className={`flex gap-4 p-4 rounded-lg border ${d.color}`}>
                    <span className="font-cormorant text-3xl font-bold text-doc-gold/60 flex-shrink-0 leading-none">{d.num}</span>
                    <div>
                      <p className="font-golos font-bold text-doc-navy text-sm mb-1">{d.title}</p>
                      <p className="font-golos text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Модель игрового взаимодействия
              </h3>
              <p className="font-golos text-sm text-gray-700 mb-4">
                В основе программы лежит игровая модель «Республика Единства». Весь лагерный коллектив является гражданами республики, каждый отряд — её районом. Органы самоуправления — «правительство республики».
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-doc-light border border-doc-border rounded-lg p-4">
                  <p className="font-golos font-semibold text-doc-navy text-sm mb-2">Элементы игровой модели:</p>
                  <ul className="space-y-1">
                    {["Название и девиз лагеря", "Гимн и флаг лагеря", "Законы и традиции республики", "Лагерная валюта (условная) — «искры»", "Отрядные названия и символика", "Ежедневные «перекликания» на линейке"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                        <span className="text-doc-gold">◆</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-doc-light border border-doc-border rounded-lg p-4">
                  <p className="font-golos font-semibold text-doc-navy text-sm mb-2">Законы республики:</p>
                  <ul className="space-y-1">
                    {["Закон уважения: каждый достоин уважения", "Закон дружбы: один за всех и все за одного", "Закон территории: чистота и порядок — наша ответственность", "Закон правды: говори правду, даже если это трудно", "Закон добра: твори добро — не требуя ничего взамен"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                        <span className="text-doc-blue font-bold">{i + 1}.</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Система детского самоуправления
              </h3>
              <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-doc-navy text-white px-6 py-2 rounded-lg font-golos font-semibold text-sm">
                      Совет лагеря (высший орган)
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mb-4">
                    {["Совет командиров", "Совет дела", "Редколлегия"].map((item, i) => (
                      <div key={i} className="bg-doc-blue text-white px-4 py-2 rounded-lg font-golos text-xs text-center flex-1 max-w-[150px]">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    {["Отряд 1", "Отряд 2", "Отряд 3", "Отряд 4", "Отряд 5"].map((item, i) => (
                      <div key={i} className="bg-doc-light border border-doc-border px-3 py-2 rounded font-golos text-xs text-center flex-1 text-doc-navy">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  { role: "Командир отряда", duties: "Организует жизнь отряда, представляет интересы отряда в совете командиров" },
                  { role: "Совет командиров", duties: "Координирует межотрядное взаимодействие, принимает решения по вопросам лагерной жизни" },
                  { role: "Совет дела", duties: "Готовит и проводит общелагерные мероприятия, координирует коллективно-творческие дела" },
                  { role: "Редколлегия", duties: "Выпускает лагерную газету, ведёт летопись лагерной жизни, информирует о событиях" },
                ].map((r, i) => (
                  <div key={i} className="bg-doc-light border border-doc-border rounded-lg p-3">
                    <p className="font-golos font-semibold text-doc-navy text-sm">{r.role}</p>
                    <p className="font-golos text-xs text-gray-600 mt-1">{r.duties}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Система мотивации и стимулирования
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-golos font-semibold text-doc-navy text-sm mb-2">Индивидуальные поощрения:</p>
                  <ul className="space-y-1">
                    {["Грамота лучшего участника смены", "Диплом за победу в конкурсах", "Значок «Активист лагеря»", "Запись в «Книгу почёта»", "Публичная благодарность на линейке"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                        <span className="text-doc-gold">★</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-golos font-semibold text-doc-navy text-sm mb-2">Командные поощрения:</p>
                  <ul className="space-y-1">
                    {["Кубок лучшего отряда смены", "Переходящее знамя победителя", "Право выбора лучшего места в столовой", "Специальный отрядный вечер", "Дополнительное время на любимое занятие"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                        <span className="text-doc-blue">★</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-golos font-semibold text-amber-800 text-sm mb-1">Рейтинговая система «Экран соревнования»</p>
                <p className="font-golos text-xs text-amber-700">Ежедневно на общей доске обновляется рейтинг отрядов по итогам участия в мероприятиях. Отряды получают «искры» за активность, победы в соревнованиях, чистоту в корпусе, культуру поведения. Итоговый победитель определяется в последний день смены.</p>
              </div>
            </div>

            {/* План-сетка */}
            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Календарный план-сетка смен
              </h3>
              {/* Легенда направлений */}
              <div className="flex flex-wrap gap-3 mb-4 p-3 bg-doc-light rounded-lg border border-doc-border">
                <span className="font-golos text-xs text-gray-500 font-semibold uppercase tracking-wide self-center">Направления:</span>
                {Object.entries(eventTypeLabels).map(([key, val]) => (
                  <span key={key} className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-golos font-semibold ${val.color} ${val.bg}`}>
                    {val.label}
                  </span>
                ))}
              </div>

              {/* Кнопки смен */}
              <div className="flex flex-wrap gap-2 mb-4">
                {shifts.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveShift(s.num)}
                    className={`px-3 py-2 rounded-lg font-golos text-sm font-semibold transition-all border flex items-center gap-2 ${
                      activeShift === s.num
                        ? "bg-doc-navy text-white border-doc-navy"
                        : s.inclusive
                        ? "bg-purple-50 text-purple-800 border-purple-300 hover:border-purple-500"
                        : "bg-white text-doc-navy border-doc-border hover:border-doc-navy"
                    }`}
                  >
                    {s.inclusive && <span>♿</span>}
                    {s.num} смена · {s.dates}
                    <span className="text-xs opacity-60">({s.days} дн.)</span>
                  </button>
                ))}
              </div>

              {currentShiftData && (() => {
                const shift = shifts.find((s) => s.num === activeShift)!;
                return (
                  <div>
                    {/* Шапка смены */}
                    <div className={`rounded-lg p-4 mb-4 border ${shift.inclusive ? "bg-purple-50 border-purple-200" : "bg-doc-light border-doc-border"}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-doc-navy text-white px-3 py-1 rounded font-golos text-sm font-semibold">{shift.name}</span>
                            {shift.inclusive && <span className="bg-purple-600 text-white px-2 py-1 rounded font-golos text-xs">♿ Инклюзивная смена</span>}
                          </div>
                          <p className="font-golos text-sm text-gray-600 mt-1">
                            <span className="font-semibold text-doc-navy">{shift.dates}</span> · {shift.days} дней · Тема: <span className="italic text-doc-blue">{shift.theme}</span>
                          </p>
                        </div>
                        <div>
                          <p className="font-golos text-xs text-gray-500 uppercase tracking-wide mb-2">Отряды смены:</p>
                          <div className="flex flex-wrap gap-2">
                            {shift.squads.map((sq, i) => (
                              <span key={i} className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-golos font-medium ${
                                sq.includes("ОВЗ") || sq.includes("Парал")
                                  ? "bg-purple-50 border-purple-300 text-purple-800"
                                  : "bg-white border-doc-border text-doc-navy"
                              }`}>
                                {squadIcons[sq] || "🏅"} {sq}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CalendarTable events={currentShiftData.events} />
                  </div>
                );
              })()}
            </div>
          </div>
        </SectionCard>

        {/* Раздел 3 */}
        <SectionCard id="section3" number="3" title="Организационные условия реализации программы">
          <div className="bg-white rounded-lg border border-doc-border p-6 space-y-6">

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Партнёрское взаимодействие
              </h3>
              <p className="font-golos text-sm text-gray-700 mb-3">
                Реализация программы осуществляется в тесном взаимодействии с общественными и молодёжными организациями:
              </p>
              <div className="space-y-2">
                {[
                  { org: "Российское движение детей и молодёжи «Движение первых»", role: "Проведение патриотических мероприятий, квестов, акций" },
                  { org: "Волонтёрские организации района", role: "Участие в добровольческих акциях, мастер-классах по волонтёрству" },
                  { org: "Местный краеведческий музей", role: "Организация экскурсий, лекций по истории и культуре родного края" },
                  { org: "Центр дополнительного образования", role: "Мастер-классы по прикладному творчеству, организация творческих студий" },
                  { org: "Спортивные организации района", role: "Проведение спортивных соревнований, мастер-классов по видам спорта" },
                ].map((p, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-doc-light rounded-lg border border-doc-border">
                    <Icon name="Building2" size={16} className="text-doc-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-golos font-semibold text-doc-navy text-sm">{p.org}</p>
                      <p className="font-golos text-xs text-gray-500">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Взаимодействие с родительским сообществом
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "До начала смены", items: ["Родительские собрания", "Знакомство с программой смены", "Анкетирование об интересах детей"] },
                  { title: "Во время смены", items: ["Регулярные онлайн-отчёты", "Фотоальбомы и новости в чате", "День открытых дверей (3 смена)"] },
                  { title: "После смены", items: ["Анкета удовлетворённости", "Отчётная презентация", "Предложения на следующий год"] },
                  { title: "Форматы участия", items: ["Мастер-классы от родителей", "Профориентационные встречи", "Совместные мероприятия"] },
                ].map((b, i) => (
                  <div key={i} className="border border-doc-border rounded-lg p-4">
                    <p className="font-golos font-semibold text-doc-navy text-sm mb-2">{b.title}</p>
                    <ul className="space-y-1">
                      {b.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 font-golos text-xs text-gray-600">
                          <span className="text-doc-gold flex-shrink-0">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Кадровое обеспечение программы
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-doc-navy text-white">
                      <th className="border border-doc-border px-3 py-2 text-left font-golos">Должность</th>
                      <th className="border border-doc-border px-3 py-2 text-left font-golos">Кол-во</th>
                      <th className="border border-doc-border px-3 py-2 text-left font-golos">Функции</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pos: "Начальник лагеря", count: "1", func: "Общее руководство, административная работа, взаимодействие с партнёрами" },
                      { pos: "Старший вожатый", count: "1", func: "Координация воспитательной работы, организация самоуправления" },
                      { pos: "Воспитатели", count: "10", func: "Непосредственная работа с детьми, проведение мероприятий в отрядах" },
                      { pos: "Педагог-организатор", count: "1–2", func: "Организация и проведение общелагерных мероприятий" },
                      { pos: "Педагог-психолог", count: "1", func: "Психологическое сопровождение детей, тренинги, диагностика" },
                      { pos: "Педагог доп. образования", count: "2–3", func: "Ведение творческих кружков и мастер-классов" },
                      { pos: "Инструктор по физкультуре", count: "2", func: "Утренняя зарядка, спортивные секции и соревнования" },
                      { pos: "Медицинский работник", count: "2", func: "Медицинское обеспечение, оздоровительные процедуры" },
                    ].map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-doc-light"}>
                        <td className="border border-doc-border px-3 py-2 font-golos font-medium text-doc-navy">{r.pos}</td>
                        <td className="border border-doc-border px-3 py-2 font-golos text-center">{r.count}</td>
                        <td className="border border-doc-border px-3 py-2 font-golos text-gray-700 text-xs">{r.func}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Информационно-методическое обеспечение
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Программа воспитательной работы лагеря",
                  "Методические разработки мероприятий по каждой смене",
                  "Сборник игр и конкурсов для работы с детьми",
                  "Диагностические методики (анкеты, тесты)",
                  "Нормативно-правовая база (СанПиН, ФЗ об образовании)",
                  "Интерактивное оборудование (проектор, экран, колонки)",
                  "Лагерная газета «Искра единства»",
                  "Фотоархив и видеолетопись лагерной жизни",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-doc-light rounded border border-doc-border font-golos text-sm text-gray-700">
                    <Icon name="FileText" size={14} className="text-doc-blue flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Материально-техническое обеспечение
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { cat: "Спортивная база", items: ["Спортивная площадка", "Бассейн / водоём", "Спортивный инвентарь", "Тренажёрная зона"] },
                  { cat: "Творческие площадки", items: ["Актовый зал / сцена", "Мастерские творчества", "Музыкальная аппаратура", "Художественные материалы"] },
                  { cat: "Инфраструктура", items: ["Жилые корпуса", "Столовая", "Медицинский пункт", "Административные помещения"] },
                ].map((b, i) => (
                  <div key={i} className="border border-doc-border rounded-lg p-4">
                    <p className="font-golos font-semibold text-doc-navy text-sm mb-2">{b.cat}</p>
                    <ul className="space-y-1">
                      {b.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 font-golos text-xs text-gray-600">
                          <span className="text-doc-gold">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Раздел 4 */}
        <SectionCard id="section4" number="4" title="Механизм оценивания эффективности реализации программы">
          <div className="bg-white rounded-lg border border-doc-border p-6 space-y-4">
            <p className="font-golos text-sm text-gray-700">
              Оценка эффективности программы осуществляется на трёх уровнях: индивидуальном, групповом и программном.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  level: "Индивидуальный",
                  methods: [
                    "Анкета «Чемодан ожиданий» (1-й день)",
                    "Анкета «Итоги смены» (последний день)",
                    "Наблюдение педагогов",
                    "Портфолио достижений ребёнка",
                    "Карта личностного роста",
                  ],
                },
                {
                  level: "Групповой (отряд)",
                  methods: [
                    "Анализ участия в мероприятиях",
                    "Рейтинг отрядов (экран)",
                    "Анкета удовлетворённости отряда",
                    "Анализ самоуправления",
                    "Огонёк анализа дня",
                  ],
                },
                {
                  level: "Программный",
                  methods: [
                    "Отчёт начальника лагеря",
                    "Анализ выполнения плана",
                    "Анкета удовлетворённости родителей",
                    "Мониторинг здоровья детей",
                    "Педагогический совет по итогам смены",
                  ],
                },
              ].map((b, i) => (
                <div key={i} className="border border-doc-border rounded-lg p-4">
                  <p className="font-cormorant text-lg font-bold text-doc-navy mb-3">{b.level}</p>
                  <ul className="space-y-1">
                    {b.methods.map((m, j) => (
                      <li key={j} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                        <span className="text-doc-blue mt-0.5">→</span>{m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-doc-light border border-doc-border rounded-lg p-4">
              <p className="font-golos font-semibold text-doc-navy text-sm mb-2">Критерии эффективности программы:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Не менее 85% детей положительно оценивают смену",
                  "Не менее 90% родителей удовлетворены качеством программы",
                  "Все плановые мероприятия реализованы в полном объёме",
                  "Отсутствие серьёзных конфликтов между детьми",
                  "Активное участие не менее 80% детей в самоуправлении",
                  "Улучшение показателей физической активности детей",
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-2 font-golos text-xs text-gray-700">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>{c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Раздел 5 */}
        <SectionCard id="section5" number="5" title="Факторы риска">
          <div className="bg-white rounded-lg border border-doc-border p-6">
            <div className="space-y-3">
              {[
                {
                  risk: "Неблагоприятные погодные условия",
                  impact: "Срыв уличных мероприятий, снижение двигательной активности",
                  prevention: "Разработка запасных вариантов мероприятий для помещений, крытые площадки для активных игр",
                },
                {
                  risk: "Конфликты между детьми",
                  impact: "Ухудшение психологического климата, снижение эффективности работы",
                  prevention: "Регулярные тренинги по конфликтологии, работа педагога-психолога, мониторинг отношений в отряде",
                },
                {
                  risk: "Заболеваемость детей",
                  impact: "Снижение наполняемости лагеря, возможность эпидемии",
                  prevention: "Соблюдение СанПиН, регулярные медосмотры, карантинные мероприятия при необходимости",
                },
                {
                  risk: "Недостаточная квалификация педагогов",
                  impact: "Снижение качества воспитательной работы",
                  prevention: "Предварительное обучение педагогического состава, методические консультации, наставничество",
                },
                {
                  risk: "Низкая мотивация детей",
                  impact: "Пассивное участие, невыполнение программных задач",
                  prevention: "Гибкая система стимулирования, учёт интересов детей, разнообразие форм деятельности",
                },
                {
                  risk: "Технические неисправности оборудования",
                  impact: "Срыв концертных и спортивных мероприятий",
                  prevention: "Предварительная проверка оборудования, наличие резервного оборудования",
                },
              ].map((r, i) => (
                <div key={i} className="border border-doc-border rounded-lg overflow-hidden">
                  <div className="bg-red-50 border-b border-red-100 px-4 py-2">
                    <p className="font-golos font-semibold text-red-800 text-sm">⚠ {r.risk}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-doc-border">
                    <div className="px-4 py-2">
                      <p className="font-golos text-xs text-gray-500 uppercase tracking-wide mb-1">Возможные последствия</p>
                      <p className="font-golos text-sm text-gray-700">{r.impact}</p>
                    </div>
                    <div className="px-4 py-2 bg-green-50">
                      <p className="font-golos text-xs text-gray-500 uppercase tracking-wide mb-1">Меры предупреждения</p>
                      <p className="font-golos text-sm text-gray-700">{r.prevention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Раздел 6 */}
        <SectionCard id="section6" number="6" title="Система обратной связи">
          <div className="bg-white rounded-lg border border-doc-border p-6 space-y-4">
            <p className="font-golos text-sm text-gray-700">
              Система обратной связи обеспечивает своевременное получение информации о качестве реализации программы от всех участников образовательного процесса.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "От детей",
                  icon: "Users",
                  channels: [
                    "Ежедневный огонёк анализа дня",
                    "Анкета «Чемодан ожиданий» и «Итоги»",
                    "Почтовый ящик «Доверие»",
                    "Встречи с педагогом-психологом",
                    "Совет командиров",
                  ],
                },
                {
                  title: "От родителей",
                  icon: "Home",
                  channels: [
                    "Родительские чаты (мессенджеры)",
                    "Ежедневные фотоотчёты",
                    "Анкета удовлетворённости (конец смены)",
                    "Телефон доверия лагеря",
                    "День открытых дверей (3 смена)",
                  ],
                },
                {
                  title: "От педагогов",
                  icon: "BookOpen",
                  channels: [
                    "Ежедневные планёрки",
                    "Педагогический совет (конец смены)",
                    "Педагогические дневники",
                    "Анализ выполнения плана",
                    "Методические обсуждения",
                  ],
                },
              ].map((b, i) => (
                <div key={i} className="border border-doc-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name={b.icon as "Users"} size={18} className="text-doc-blue" />
                    <p className="font-golos font-semibold text-doc-navy text-sm">{b.title}</p>
                  </div>
                  <ul className="space-y-1">
                    {b.channels.map((c, j) => (
                      <li key={j} className="flex items-start gap-2 font-golos text-xs text-gray-600">
                        <span className="text-doc-gold">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Раздел 7 */}
        <SectionCard id="section7" number="7" title="Список используемой литературы">
          <div className="bg-white rounded-lg border border-doc-border p-6">
            <ol className="space-y-3">
              {[
                "Федеральный закон от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»",
                "СП 2.4.3648-20 «Санитарно-эпидемиологические требования к организациям воспитания и обучения, отдыха и оздоровления детей и молодёжи»",
                "Примерная рабочая программа воспитания для общеобразовательных организаций. — М.: ФГБНУ «Институт стратегии развития образования», 2022",
                "Иванов И.П. Энциклопедия коллективных творческих дел. — М.: Педагогика, 1989",
                "Байбородова Л.В., Рожков М.И. Воспитательная работа в детском загородном лагере. — Ярославль: Академия развития, 2013",
                "Поляков С.Д. Технологии воспитания. — М.: ВЛАДОС, 2002",
                "Кан-Калик В.А. Учителю о педагогическом общении. — М.: Просвещение, 1987",
                "Буйлова Л.Н., Кленова Н.В. Как организовать дополнительное образование детей в школе. — М.: АРКТИ, 2005",
                "Сборник нормативно-правовых документов для специалистов детских загородных лагерей. — М.: Педагогика, 2020",
                "Маслоу А. Мотивация и личность. — СПб.: Питер, 2009",
                "Фришман И.И. Методика работы педагога дополнительного образования. — М.: Академия, 2004",
                "Щуркова Н.Е. Воспитание: новый взгляд с позиции культуры. — М.: Педагогический поиск, 2012",
              ].map((ref, i) => (
                <li key={i} className="flex gap-3 font-golos text-sm text-gray-700">
                  <span className="text-doc-navy font-semibold flex-shrink-0 w-6">{i + 1}.</span>
                  <span className="leading-relaxed">{ref}</span>
                </li>
              ))}
            </ol>
          </div>
        </SectionCard>

        {/* Раздел 8 */}
        <SectionCard id="section8" number="8" title="Приложения">
          <div className="bg-white rounded-lg border border-doc-border p-6 space-y-6">

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Приложение 1. Сводная таблица смен
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-doc-navy text-white">
                      <th className="border border-white/10 px-3 py-2 font-golos text-left">№ смены</th>
                      <th className="border border-white/10 px-3 py-2 font-golos text-left">Даты</th>
                      <th className="border border-white/10 px-3 py-2 font-golos text-left w-16">Дней</th>
                      <th className="border border-white/10 px-3 py-2 font-golos text-left">Тема смены</th>
                      <th className="border border-white/10 px-3 py-2 font-golos text-left">Виды спорта (отряды)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((s, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-doc-light"} ${s.inclusive ? "border-l-4 border-l-purple-400" : ""}`}>
                        <td className="border border-doc-border px-3 py-2 font-golos font-semibold text-doc-navy">
                          {s.num} смена
                          {s.inclusive && <span className="ml-1 text-purple-600 text-xs">♿</span>}
                        </td>
                        <td className="border border-doc-border px-3 py-2 font-golos whitespace-nowrap">{s.dates}</td>
                        <td className="border border-doc-border px-3 py-2 font-golos text-center">{s.days}</td>
                        <td className="border border-doc-border px-3 py-2 font-golos text-doc-blue italic">{s.theme}</td>
                        <td className="border border-doc-border px-3 py-2">
                          <div className="flex flex-wrap gap-1">
                            {s.squads.map((sq, j) => (
                              <span key={j} className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded font-golos ${
                                sq.includes("ОВЗ") || sq.includes("Парал") ? "bg-purple-100 text-purple-800" : "bg-doc-light text-doc-navy"
                              }`}>
                                {squadIcons[sq] || "🏅"} {sq}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Приложение 2. Анкета «Чемодан ожиданий» (образец)
              </h3>
              <div className="bg-doc-light border border-doc-border rounded-lg p-5">
                <p className="font-cormorant text-lg font-bold text-doc-navy text-center mb-1">Анкета «Чемодан ожиданий»</p>
                <p className="font-golos text-xs text-center text-gray-500 mb-4">Заполняется в первый день смены</p>
                <div className="space-y-4">
                  {[
                    "1. Напиши своё имя и возраст: _______________________________________________",
                    "2. Чем ты любишь заниматься в свободное время? ________________________________",
                    "3. Что тебе больше всего нравится в лагере (если бывал)? ______________________",
                    "4. Чего ты ожидаешь от этой смены? Что хочешь попробовать? ____________________",
                    "5. В каких мероприятиях ты хотел бы принять участие? _________________________",
                    "6. Каким человеком ты хочешь стать за время смены? __________________________",
                    "7. Что ты можешь предложить своему отряду? __________________________________",
                  ].map((q, i) => (
                    <p key={i} className="font-golos text-sm text-gray-700">{q}</p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Приложение 3. Анкета «Итоги смены» (образец)
              </h3>
              <div className="bg-doc-light border border-doc-border rounded-lg p-5">
                <p className="font-cormorant text-lg font-bold text-doc-navy text-center mb-1">Анкета «Итоги смены»</p>
                <p className="font-golos text-xs text-center text-gray-500 mb-4">Заполняется в последний день смены</p>
                <div className="space-y-4">
                  {[
                    "1. Понравилась ли тебе смена? Оцени по шкале от 1 до 10: ________",
                    "2. Что тебе понравилось больше всего? ___________________________________",
                    "3. Что ты узнал(а) нового о себе? ______________________________________",
                    "4. Появились ли у тебя новые друзья? ___________________________________",
                    "5. Что бы ты хотел(а) изменить в программе смены? ______________________",
                    "6. Что ты возьмёшь с собой из лагеря (умения, знания, воспоминания)? _____",
                    "7. Хотел(а) бы ты снова приехать в наш лагерь? _________________________",
                  ].map((q, i) => (
                    <p key={i} className="font-golos text-sm text-gray-700">{q}</p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-cormorant text-xl font-bold text-doc-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-doc-gold inline-block rounded" />
                Приложение 4. Экран соревнования отрядов (образец)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-doc-navy text-white">
                      <th className="border border-doc-border px-3 py-2 font-golos text-left">Критерий</th>
                      <th className="border border-doc-border px-3 py-2 font-golos text-center">Отряд 1</th>
                      <th className="border border-doc-border px-3 py-2 font-golos text-center">Отряд 2</th>
                      <th className="border border-doc-border px-3 py-2 font-golos text-center">Отряд 3</th>
                      <th className="border border-doc-border px-3 py-2 font-golos text-center">Отряд 4</th>
                      <th className="border border-doc-border px-3 py-2 font-golos text-center">Отряд 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Участие в мероприятиях",
                      "Дисциплина и культура поведения",
                      "Чистота в корпусе",
                      "Спортивные достижения",
                      "Творческие конкурсы",
                      "Итого «искр»",
                    ].map((crit, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-doc-light"}>
                        <td className="border border-doc-border px-3 py-2 font-golos text-gray-700">{crit}</td>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <td key={n} className="border border-doc-border px-3 py-2 font-golos text-center text-gray-400 text-xs">___</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </SectionCard>

      </main>

      {/* Футер */}
      <footer className="bg-doc-navy text-white mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-cormorant text-doc-gold text-xl font-bold">«В единстве наша сила»</p>
              <p className="font-golos text-white/60 text-sm">Программа воспитательной работы загородного лагеря · 2025</p>
            </div>
            <div className="text-right">
              <p className="font-golos text-white/60 text-xs">5 оздоровительных смен</p>
              <p className="font-golos text-white/60 text-xs">04.06.2025 — 23.08.2025</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;