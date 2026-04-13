import { eventTypeLabels } from "@/data/programData";

interface Event {
  date: string;
  day: number;
  event: string;
  type: string;
  responsible: string;
  modules?: string;
}

interface CalendarTableProps {
  events: Event[];
}

const CalendarTable = ({ events }: CalendarTableProps) => (
  <div className="overflow-x-auto rounded-lg border border-doc-border">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-doc-navy text-white">
          <th className="border border-white/10 px-3 py-2 text-left font-golos font-semibold w-12">День</th>
          <th className="border border-white/10 px-3 py-2 text-left font-golos font-semibold w-20">Дата</th>
          <th className="border border-white/10 px-3 py-2 text-left font-golos font-semibold">Мероприятие</th>
          <th className="border border-white/10 px-3 py-2 text-left font-golos font-semibold w-28">Направление</th>
          <th className="border border-white/10 px-3 py-2 text-left font-golos font-semibold w-56">Модули</th>
          <th className="border border-white/10 px-3 py-2 text-left font-golos font-semibold w-52">Ответственный</th>
        </tr>
      </thead>
      <tbody>
        {events.map((ev, idx) => {
          const typeInfo = eventTypeLabels[ev.type] || { label: ev.type, color: "text-gray-700 border-gray-300", bg: "bg-gray-50" };
          return (
            <tr
              key={idx}
              className={`border-l-4 ${
                ev.type === "russia" ? "border-l-red-400" :
                ev.type === "chelovek" ? "border-l-blue-400" :
                "border-l-emerald-400"
              } ${idx % 2 === 0 ? "bg-white" : "bg-doc-light"}`}
            >
              <td className="border border-doc-border px-3 py-2 text-center font-golos font-bold text-doc-navy">{ev.day}</td>
              <td className="border border-doc-border px-3 py-2 font-golos font-medium text-doc-navy whitespace-nowrap">{ev.date}</td>
              <td className="border border-doc-border px-3 py-2 font-golos text-gray-800 text-xs leading-relaxed">{ev.event}</td>
              <td className="border border-doc-border px-3 py-2">
                <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-golos font-semibold ${typeInfo.color} ${typeInfo.bg}`}>
                  {typeInfo.label}
                </span>
              </td>
              <td className="border border-doc-border px-3 py-2 font-golos text-xs leading-relaxed">
                {ev.modules ? (
                  <div className="space-y-0.5">
                    {ev.modules.split(";").map((m, i) => (
                      <div key={i} className={`text-xs ${m.trim().startsWith("И:") ? "text-doc-navy font-medium" : "text-doc-blue"}`}>{m.trim()}</div>
                    ))}
                  </div>
                ) : <span className="text-gray-400">—</span>}
              </td>
              <td className="border border-doc-border px-3 py-2 font-golos text-gray-600 text-xs leading-relaxed">{ev.responsible}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default CalendarTable;