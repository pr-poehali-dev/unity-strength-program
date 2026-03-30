import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, HeadingLevel, AlignmentType, WidthType, BorderStyle,
  ShadingType, TableLayoutType, PageBreak,
} from "docx";
import { saveAs } from "file-saver";
import { shifts, calendarData, eventTypeLabels } from "@/data/programData";

const NAVY = "1A2744";
const GOLD = "B8922A";
const LIGHT = "F4F6FB";
const WHITE = "FFFFFF";
const RED = "FDECEA";
const BLUE = "EBF2FB";
const GREEN = "EDFAF4";

function heading1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } },
  });
}

function heading2(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
  });
}

function para(text: string, bold = false, size = 22): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold, size, font: "Times New Roman" })],
    spacing: { after: 120 },
  });
}

function bulletPara(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `◆  ${text}`, size: 22, font: "Times New Roman" })],
    spacing: { after: 80 },
    indent: { left: 360 },
  });
}

function makeCell(text: string, isHeader = false, shade?: string): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: isHeader,
            color: isHeader ? WHITE : "000000",
            size: isHeader ? 20 : 18,
            font: "Times New Roman",
          }),
        ],
        spacing: { after: 40, before: 40 },
      }),
    ],
    shading: shade
      ? { fill: shade, type: ShadingType.CLEAR, color: "auto" }
      : isHeader
      ? { fill: NAVY, type: ShadingType.CLEAR, color: "auto" }
      : undefined,
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
  });
}

function calendarTable(shiftNum: number): Table {
  const data = calendarData.find((s) => s.shiftNum === shiftNum);
  if (!data) return new Table({ rows: [] });

  const headerRow = new TableRow({
    children: [
      makeCell("День", true),
      makeCell("Дата", true),
      makeCell("Мероприятие", true),
      makeCell("Направление", true),
      makeCell("Ответственный", true),
    ],
    tableHeader: true,
  });

  const rows = data.events.map((ev, idx) => {
    const typeInfo = eventTypeLabels[ev.type];
    const shade = idx % 2 === 0 ? WHITE : LIGHT;
    const dirShade = ev.type === "russia" ? RED : ev.type === "chelovek" ? BLUE : GREEN;
    return new TableRow({
      children: [
        makeCell(String(ev.day), false, shade),
        makeCell(ev.date, false, shade),
        makeCell(ev.event, false, shade),
        makeCell(typeInfo?.label?.replace(/^[^\s]+ /, "") || ev.type, false, dirShade),
        makeCell(ev.responsible, false, shade),
      ],
    });
  });

  return new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [800, 900, 4500, 1400, 2400],
    rows: [headerRow, ...rows],
  });
}

export async function exportToWord() {
  const sections: (Paragraph | Table)[] = [];

  // Титульный лист
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "Муниципальное бюджетное учреждение", size: 22, font: "Times New Roman" })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 600, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "«Загородный оздоровительный лагерь»", size: 22, font: "Times New Roman" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "ПРОГРАММА ВОСПИТАТЕЛЬНОЙ РАБОТЫ", bold: true, size: 28, font: "Times New Roman" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "«В единстве наша сила»", bold: true, size: 36, color: NAVY, font: "Times New Roman" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "5 оздоровительных смен · Летний сезон 2025 года", size: 22, font: "Times New Roman" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Разработчик: ____________________________", size: 22, font: "Times New Roman" })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Утверждена: приказ № ___ от ___.___.2025", size: 22, font: "Times New Roman" })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Начальник лагеря: _______________________", size: 22, font: "Times New Roman" })],
      spacing: { after: 1200 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  // Раздел 1
  sections.push(heading1("1. ПОЯСНИТЕЛЬНАЯ ЗАПИСКА"));
  sections.push(heading2("1.1. Актуальность программы"));
  sections.push(para("В современных условиях развития российского общества особую актуальность приобретают вопросы воспитания у подрастающего поколения гражданских, патриотических и общечеловеческих ценностей. Загородный оздоровительный лагерь является уникальным пространством для социализации детей, формирования навыков командной работы, развития лидерских качеств и оздоровления."));
  sections.push(para("Программа «В единстве наша сила» направлена на создание условий для всестороннего развития личности ребёнка через систему коллективно-творческих дел, спортивно-оздоровительных мероприятий, патриотического воспитания и развития самоуправления. Отряды формируются по видам спорта, что создаёт особую среду для профессиональной идентификации и межспортивного взаимодействия."));

  sections.push(heading2("1.2. Новизна программы"));
  sections.push(para("Новизна программы заключается в формировании отрядов по видам спорта и интеграции трёх воспитательных направлений: «Россия» (патриотика, гражданственность), «Человек» (личностный рост, здоровье), «Мир» (командность, экология, творчество). Особенностью является проведение инклюзивной 3 смены с полноценным участием детей с ОВЗ и паралимпийцев."));

  sections.push(heading2("1.3. Отличительные особенности программы"));
  [
    "Отряды формируются по видам спорта — каждый отряд представляет одну спортивную дисциплину",
    "Три направления воспитательной работы: «Россия», «Человек», «Мир»",
    "Тематическая направленность каждой смены с единой концепцией программы",
    "Инклюзивная 3 смена: участие детей с ОВЗ и паралимпийцев наравне со всеми",
    "Реализация принципа детского самоуправления на всех уровнях",
    "Применение современных технологий: квест, проект, тренинг, верёвочный курс",
    "Система стимулирования и мотивации на основе игрового взаимодействия",
  ].forEach((t) => sections.push(bulletPara(t)));

  sections.push(heading2("1.4. Направленность программы"));
  [
    "Социально-педагогическая — формирование навыков взаимодействия в коллективе",
    "Патриотическая — воспитание гражданственности, любви к Родине",
    "Экологическая — формирование экологического мышления",
    "Спортивно-оздоровительная — укрепление здоровья, приобщение к ЗОЖ",
  ].forEach((t) => sections.push(bulletPara(t)));

  sections.push(heading2("1.5. Адресат программы"));
  sections.push(para("Программа предназначена для детей в возрасте от 7 до 17 лет, посещающих загородный оздоровительный лагерь в летний сезон 2025 года. Наполняемость: до 200 детей в смену. Отряды формируются по видам спорта."));

  sections.push(heading2("1.6. Цель программы"));
  sections.push(para("Создание условий для разностороннего развития личности ребёнка-спортсмена, укрепления здоровья, формирования активной гражданской позиции и опыта коллективного взаимодействия в рамках временного детского коллектива, организованного по спортивному принципу.", true));

  sections.push(heading2("1.7. Задачи программы"));
  [
    "Организовать полноценный отдых и оздоровление детей в условиях загородного лагеря",
    "Создать условия для формирования навыков здорового образа жизни",
    "Развивать социальные компетенции: коммуникабельность, толерантность, командную работу",
    "Воспитывать патриотизм, гражданственность, любовь к Родине",
    "Формировать экологическую культуру, ответственное отношение к природе",
    "Создавать условия для творческой самореализации каждого ребёнка",
    "Развивать лидерские качества и навыки самоуправления",
    "Обеспечить психологическую безопасность каждого участника",
    "Реализовать инклюзивный подход в 3 смене для детей с ОВЗ и паралимпийцев",
  ].forEach((t, i) => sections.push(bulletPara(`${i + 1}. ${t}`)));

  sections.push(heading2("1.8. Ожидаемые результаты"));
  sections.push(para("Личностные: позитивная Я-концепция, сформированные ценностные ориентиры, опыт коллективной деятельности, навыки саморегуляции."));
  sections.push(para("Социальные: умение работать в команде, навыки лидерства и самоуправления, толерантность, активная гражданская позиция."));
  sections.push(para("Оздоровительные: укрепление физического здоровья, сформированные ЗОЖ-привычки, снижение психоэмоционального напряжения."));

  sections.push(heading2("1.9. Принципы реализации программы"));
  [
    "Принцип гуманизма — уважение к личности каждого ребёнка",
    "Принцип природосообразности — учёт возрастных и индивидуальных особенностей",
    "Принцип добровольности — участие основано на свободном выборе",
    "Принцип коллективности — развитие личности в процессе взаимодействия",
    "Принцип системности — целостность воспитательной работы",
    "Принцип творческой активности — условия для проявления способностей",
    "Принцип инклюзивности — равные возможности для всех участников",
  ].forEach((t) => sections.push(bulletPara(t)));

  sections.push(heading2("1.10. Технологии реализации программы"));
  [
    "Технология коллективного творческого дела (КТД)",
    "Игровые технологии (квест, ролевая игра, деловая игра)",
    "Проектные технологии",
    "Технологии активного обучения (тренинг, «верёвочный курс»)",
    "Здоровьесберегающие технологии",
    "Технологии самоуправления",
    "Инклюзивные педагогические технологии (3 смена)",
  ].forEach((t) => sections.push(bulletPara(t)));

  sections.push(heading2("1.11. Методы реализации программы"));
  sections.push(para("Методы формирования сознания: беседа, лекция, дискуссия, личный пример, разъяснение."));
  sections.push(para("Методы организации деятельности: поручение, упражнение, создание воспитывающих ситуаций, игра, труд."));
  sections.push(para("Методы стимулирования: поощрение, соревнование, награждение, создание ситуации успеха, общественное мнение."));

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 2
  sections.push(heading1("2. СОДЕРЖАНИЕ ПРОГРАММЫ"));

  sections.push(heading2("2.1. Этапы реализации программы"));
  sections.push(para("I этап — Организационный (1–3 день смены): заезд, знакомство, формирование отрядов, выборы самоуправления, анкета «Чемодан ожиданий»."));
  sections.push(para("II этап — Основной (4-й день — предпоследний): реализация мероприятий по направлениям «Россия», «Человек», «Мир»."));
  sections.push(para("III этап — Итоговый (последние 2 дня): подведение итогов, огонёк анализа, анкетирование, закрытие смены, награждение."));

  sections.push(heading2("2.2. Направления реализации программы"));
  [
    ["Россия", "Воспитание любви к Родине, уважения к государственной символике и памяти героев Отечества. Тематические мероприятия к памятным датам. Знакомство со спортивными достижениями России."],
    ["Человек", "Развитие личностных качеств: целеустремлённости, воли, самодисциплины. Психологические тренинги, работа с педагогом-психологом. Здоровый образ жизни спортсмена."],
    ["Мир", "Межотрядное взаимодействие, дружба, экологические акции, творчество. Открытые тренировки, обмен опытом между видами спорта. Инклюзивное взаимодействие."],
  ].forEach(([title, desc]) => {
    sections.push(para(`${title}: ${desc}`));
  });

  sections.push(heading2("2.3. Состав отрядов по сменам"));
  const squadHeaderRow = new TableRow({
    children: [
      makeCell("№ смены", true),
      makeCell("Даты", true),
      makeCell("Дней", true),
      makeCell("Тема смены", true),
      makeCell("Виды спорта (отряды)", true),
    ],
    tableHeader: true,
  });
  const squadRows = shifts.map((s, idx) =>
    new TableRow({
      children: [
        makeCell(`${s.num} смена${s.inclusive ? " ♿" : ""}`, false, idx % 2 === 0 ? WHITE : LIGHT),
        makeCell(s.dates, false, idx % 2 === 0 ? WHITE : LIGHT),
        makeCell(String(s.days), false, idx % 2 === 0 ? WHITE : LIGHT),
        makeCell(s.theme, false, idx % 2 === 0 ? WHITE : LIGHT),
        makeCell(s.squads.join(", "), false, idx % 2 === 0 ? WHITE : LIGHT),
      ],
    })
  );
  sections.push(
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [1200, 1200, 700, 2000, 4900],
      rows: [squadHeaderRow, ...squadRows],
    })
  );

  sections.push(heading2("2.4. Модель игрового взаимодействия «Республика Единства»"));
  sections.push(para("Весь лагерный коллектив является гражданами «Республики Единства». Каждый отряд-вид спорта — её районом. Органы самоуправления — «правительство республики»."));
  ["Название и девиз лагеря", "Гимн и флаг лагеря", "Законы и традиции республики", "Лагерная валюта (условная) — «искры»", "Отрядные названия и символика"].forEach((t) => sections.push(bulletPara(t)));

  sections.push(heading2("2.5. Система детского самоуправления"));
  sections.push(para("Структура самоуправления: Совет лагеря (высший орган) → Совет командиров, Совет дела, Редколлегия → Отряды."));
  sections.push(para("В инклюзивной 3 смене дети с ОВЗ включаются в органы самоуправления на равных правах."));

  sections.push(heading2("2.6. Система мотивации и стимулирования"));
  sections.push(para("Рейтинговая система «Экран соревнования»: ежедневно обновляется рейтинг отрядов. Отряды получают «искры» за активность, победы, чистоту в корпусе, культуру поведения."));
  ["Грамота лучшего участника смены", "Диплом за победу в конкурсах", "Значок «Активист лагеря»", "Кубок лучшего отряда смены", "Переходящее знамя победителя"].forEach((t) => sections.push(bulletPara(t)));

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Планы-сетки по сменам
  sections.push(heading1("2.7. КАЛЕНДАРНЫЕ ПЛАНЫ-СЕТКИ СМЕН"));
  for (const shift of shifts) {
    sections.push(heading2(`${shift.num} смена (${shift.dates}, ${shift.days} дней) — ${shift.theme}`));
    sections.push(para(`Отряды: ${shift.squads.join(", ")}${shift.inclusive ? " | ♿ Инклюзивная смена" : ""}`));
    sections.push(calendarTable(shift.num));
    sections.push(new Paragraph({ spacing: { after: 300 } }));
  }

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 3
  sections.push(heading1("3. ОРГАНИЗАЦИОННЫЕ УСЛОВИЯ РЕАЛИЗАЦИИ ПРОГРАММЫ"));

  sections.push(heading2("3.1. Партнёрское взаимодействие"));
  [
    "Российское движение детей и молодёжи «Движение первых» — патриотические мероприятия",
    "Волонтёрские организации района — добровольческие акции",
    "Местный краеведческий музей — экскурсии, лекции по истории",
    "Центр дополнительного образования — мастер-классы по творчеству",
    "Спортивные организации района — соревнования, мастер-классы тренеров",
  ].forEach((t) => sections.push(bulletPara(t)));

  sections.push(heading2("3.2. Взаимодействие с родительским сообществом"));
  sections.push(para("До начала смены: родительские собрания, знакомство с программой, анкетирование об интересах детей."));
  sections.push(para("Во время смены: регулярные онлайн-отчёты, фотоальбомы в чате, День открытых дверей (3 смена)."));
  sections.push(para("После смены: анкета удовлетворённости, отчётная презентация, предложения на следующий год."));

  sections.push(heading2("3.3. Кадровое обеспечение"));
  const staffHeader = new TableRow({
    children: [makeCell("Должность", true), makeCell("Кол-во", true), makeCell("Функции", true)],
    tableHeader: true,
  });
  const staff = [
    ["Начальник лагеря", "1", "Общее руководство, административная работа"],
    ["Старший вожатый", "1", "Координация воспитательной работы, самоуправление"],
    ["Воспитатели", "10", "Непосредственная работа с детьми, проведение мероприятий"],
    ["Педагог-организатор", "1–2", "Организация общелагерных мероприятий"],
    ["Педагог-психолог", "1", "Психологическое сопровождение, тренинги, диагностика"],
    ["Педагог доп. образования", "2–3", "Творческие кружки и мастер-классы"],
    ["Инструктор по физкультуре", "2", "Зарядка, спортивные секции и соревнования"],
    ["Медицинский работник", "2", "Медицинское обеспечение, оздоровительные процедуры"],
  ];
  sections.push(
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [3000, 1000, 6000],
      rows: [staffHeader, ...staff.map((r, i) => new TableRow({ children: r.map((c) => makeCell(c, false, i % 2 === 0 ? WHITE : LIGHT)) }))],
    })
  );

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 4
  sections.push(heading1("4. МЕХАНИЗМ ОЦЕНИВАНИЯ ЭФФЕКТИВНОСТИ"));
  sections.push(para("Оценка осуществляется на трёх уровнях: индивидуальном, групповом и программном."));
  sections.push(para("Индивидуальный уровень: анкета «Чемодан ожиданий» (1-й день), анкета «Итоги смены» (последний день), карта личностного роста, наблюдение педагогов."));
  sections.push(para("Групповой уровень: анализ участия в мероприятиях, рейтинг отрядов, анкета удовлетворённости, анализ самоуправления."));
  sections.push(para("Программный уровень: отчёт начальника лагеря, анкета родителей, мониторинг здоровья детей, педагогический совет."));
  sections.push(heading2("Критерии эффективности:"));
  [
    "Не менее 85% детей положительно оценивают смену",
    "Не менее 90% родителей удовлетворены качеством программы",
    "Все плановые мероприятия реализованы в полном объёме",
    "Активное участие не менее 80% детей в самоуправлении",
    "Инклюзивная смена: 100% участие детей с ОВЗ в общих мероприятиях",
  ].forEach((t) => sections.push(bulletPara(t)));

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 5
  sections.push(heading1("5. ФАКТОРЫ РИСКА"));
  const risks = [
    ["Неблагоприятные погодные условия", "Срыв уличных мероприятий", "Разработка запасных вариантов для помещений"],
    ["Конфликты между детьми", "Ухудшение психологического климата", "Тренинги, работа педагога-психолога"],
    ["Заболеваемость детей", "Снижение наполняемости лагеря", "Соблюдение СанПиН, регулярные медосмотры"],
    ["Недостаточная квалификация педагогов", "Снижение качества работы", "Предварительное обучение, наставничество"],
    ["Низкая мотивация детей", "Пассивное участие", "Гибкая система стимулирования"],
    ["Барьеры при инклюзии (3 смена)", "Сложности интеграции ОВЗ-детей", "Специальная подготовка педагогов, инструктаж"],
  ];
  const riskHeader = new TableRow({
    children: [makeCell("Фактор риска", true), makeCell("Последствия", true), makeCell("Меры предупреждения", true)],
    tableHeader: true,
  });
  sections.push(
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [3000, 3000, 4000],
      rows: [riskHeader, ...risks.map((r, i) => new TableRow({ children: r.map((c) => makeCell(c, false, i % 2 === 0 ? WHITE : LIGHT)) }))],
    })
  );

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 6
  sections.push(heading1("6. СИСТЕМА ОБРАТНОЙ СВЯЗИ"));
  sections.push(para("От детей: ежедневный огонёк анализа дня, анкеты «Чемодан ожиданий» и «Итоги», почтовый ящик «Доверие», встречи с психологом, совет командиров."));
  sections.push(para("От родителей: родительские чаты, ежедневные фотоотчёты, анкета удовлетворённости, телефон доверия, день открытых дверей."));
  sections.push(para("От педагогов: ежедневные планёрки, педагогический совет по итогам смены, педагогические дневники, методические обсуждения."));

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 7
  sections.push(heading1("7. СПИСОК ИСПОЛЬЗУЕМОЙ ЛИТЕРАТУРЫ"));
  [
    "Федеральный закон от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»",
    "СП 2.4.3648-20 «Санитарно-эпидемиологические требования к организациям воспитания и обучения»",
    "Примерная рабочая программа воспитания для общеобразовательных организаций. — М., 2022",
    "Иванов И.П. Энциклопедия коллективных творческих дел. — М.: Педагогика, 1989",
    "Байбородова Л.В., Рожков М.И. Воспитательная работа в детском загородном лагере. — Ярославль, 2013",
    "Поляков С.Д. Технологии воспитания. — М.: ВЛАДОС, 2002",
    "Фришман И.И. Методика работы педагога дополнительного образования. — М.: Академия, 2004",
    "Щуркова Н.Е. Воспитание: новый взгляд с позиции культуры. — М., 2012",
  ].forEach((t, i) => sections.push(para(`${i + 1}. ${t}`)));

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Раздел 8 — Приложения
  sections.push(heading1("8. ПРИЛОЖЕНИЯ"));

  sections.push(heading2("Приложение 1. Анкета «Чемодан ожиданий»"));
  [
    "1. Напиши своё имя и возраст: _______________________________________________",
    "2. Чем ты любишь заниматься в свободное время? ________________________________",
    "3. Чего ты ожидаешь от этой смены? ___________________________________________",
    "4. В каких мероприятиях хочешь принять участие? _______________________________",
    "5. Каким человеком хочешь стать за время смены? _______________________________",
    "6. Что ты можешь предложить своему отряду? ___________________________________",
  ].forEach((t) => sections.push(para(t)));

  sections.push(heading2("Приложение 2. Анкета «Итоги смены»"));
  [
    "1. Понравилась ли тебе смена? Оцени от 1 до 10: _______",
    "2. Что понравилось больше всего? _________________________________________",
    "3. Что ты узнал(а) нового о себе? ________________________________________",
    "4. Появились ли новые друзья? ___________________________________________",
    "5. Что бы ты хотел(а) изменить в программе? ______________________________",
    "6. Хотел(а) бы снова приехать в наш лагерь? _______________________________",
  ].forEach((t) => sections.push(para(t)));

  sections.push(heading2("Приложение 3. Экран соревнования отрядов"));
  const screenHeader = new TableRow({
    children: [
      makeCell("Критерий", true),
      ...["Отряд 1", "Отряд 2", "Отряд 3", "Отряд 4", "Отряд 5"].map((h) => makeCell(h, true)),
    ],
    tableHeader: true,
  });
  const screenRows = [
    "Участие в мероприятиях",
    "Дисциплина и культура",
    "Чистота в корпусе",
    "Спортивные достижения",
    "Творческие конкурсы",
    "Итого «искр»",
  ].map((cr, i) =>
    new TableRow({
      children: [
        makeCell(cr, false, i % 2 === 0 ? WHITE : LIGHT),
        ...Array(5).fill(makeCell("___", false, i % 2 === 0 ? WHITE : LIGHT)),
      ],
    })
  );
  sections.push(
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [4000, 1200, 1200, 1200, 1200, 1200],
      rows: [screenHeader, ...screenRows],
    })
  );

  // Сборка документа
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Times New Roman", size: 24 },
        },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          run: { bold: true, size: 28, color: NAVY, font: "Times New Roman" },
          paragraph: { spacing: { before: 400, after: 200 } },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          run: { bold: true, size: 24, color: "2C4A8C", font: "Times New Roman" },
          paragraph: { spacing: { before: 240, after: 120 } },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1701, right: 850 },
          },
        },
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Программа_В_единстве_наша_сила_2025.docx");
}
