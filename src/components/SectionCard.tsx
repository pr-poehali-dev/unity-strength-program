interface SectionCardProps {
  number: string;
  title: string;
  children: React.ReactNode;
  id: string;
}

const SectionCard = ({ number, title, children, id }: SectionCardProps) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <div className="flex items-start gap-4 mb-6 pb-4 border-b-2 border-doc-gold">
      <div className="flex-shrink-0 w-12 h-12 bg-doc-navy rounded flex items-center justify-center">
        <span className="font-cormorant text-doc-gold text-xl font-bold">{number}</span>
      </div>
      <h2 className="font-cormorant text-2xl font-bold text-doc-navy leading-tight pt-2">{title}</h2>
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

export default SectionCard;
