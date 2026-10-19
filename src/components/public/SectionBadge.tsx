interface SectionBadgeProps {
  section: string;
}

export default function SectionBadge({ section }: SectionBadgeProps) {
  const getBadgeColor = (sec: string) => {
    const normalized = sec.toLowerCase();
    switch (normalized) {
      case 'local':
      case 'jauja':
        return 'bg-[#1e40af]'; // blue-800 equivalent for local
      case 'nacional':
        return 'bg-[#1d4ed8]'; // blue-700
      case 'internacional':
        return 'bg-[#047857]'; // emerald-700
      case 'opinion':
        return 'bg-[#b45309]'; // amber-700
      case 'deportes':
        return 'bg-[#b91c1c]'; // red-700
      case 'cultura':
        return 'bg-[#7e22ce]'; // purple-700
      default:
        return 'bg-[#0a192f]'; // default navy
    }
  };

  return (
    <span className={`${getBadgeColor(section)} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm`}>
      {section}
    </span>
  );
}
