import { eventTypeLabels } from "@/data/programData";

interface Event {
  date: string;
  day: number;
  event: string;
  type: string;
  responsible: string;
}

interface CalendarTableProps {
  events: Event[];
}

const CalendarTable = ({ events }: CalendarTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-doc-navy text-white">
          <th className="border border-doc-border px-3 py-2 text-left font-golos font-semibold w-16">День</th>
          <th className="border border-doc-border px-3 py-2 text-left font-golos font-semibold w-20">Дата</th>
          <th className="border border-doc-border px-3 py-2 text-left font-golos font-semibold">Мероприятие</th>
          <th className="border border-doc-border px-3 py-2 text-left font-golos font-semibold w-32">Тип</th>
          <th className="border border-doc-border px-3 py-2 text-left font-golos font-semibold w-56">Ответственный</th>
        </tr>
      </thead>
      <tbody>
        {events.map((ev, idx) => {
          const typeInfo = eventTypeLabels[ev.type] || { label: ev.type, color: "bg-gray-100 text-gray-700 border-gray-300" };
          return (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-doc-light"}>
              <td className="border border-doc-border px-3 py-2 text-center font-golos font-semibold text-doc-navy">{ev.day}</td>
              <td className="border border-doc-border px-3 py-2 font-golos font-medium text-doc-navy whitespace-nowrap">{ev.date}</td>
              <td className="border border-doc-border px-3 py-2 font-golos text-gray-800">{ev.event}</td>
              <td className="border border-doc-border px-3 py-2">
                <span className={`inline-block px-2 py-0.5 rounded border text-xs font-golos ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
              </td>
              <td className="border border-doc-border px-3 py-2 font-golos text-gray-700 text-xs">{ev.responsible}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default CalendarTable;
