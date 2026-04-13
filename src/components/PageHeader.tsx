import { useState } from "react";
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

interface PageHeaderProps {
  onExport: () => void;
  onPrint: () => void;
}

const PageHeader = ({ onExport, onPrint }: PageHeaderProps) => {
  const [navOpen, setNavOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => onExport()}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-doc-navy font-golos font-semibold text-sm px-4 py-2 rounded-lg transition-colors print:hidden border border-white/30"
          >
            <Icon name="FileDown" size={16} />
            <span className="hidden sm:inline">Word</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-doc-gold hover:bg-yellow-500 text-doc-navy font-golos font-semibold text-sm px-4 py-2 rounded-lg transition-colors print:hidden"
          >
            <Icon name="Printer" size={16} />
            <span className="hidden sm:inline">Печать / PDF</span>
          </button>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm print:hidden"
          >
            <Icon name="Menu" size={20} />
            <span className="hidden sm:inline">Разделы</span>
          </button>
        </div>
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
  );
};

export default PageHeader;
