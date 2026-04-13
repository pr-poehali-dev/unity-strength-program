import { shifts, squadIcons } from "@/data/programData";

const TitlePage = () => {
  return (
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
  );
};

export default TitlePage;
