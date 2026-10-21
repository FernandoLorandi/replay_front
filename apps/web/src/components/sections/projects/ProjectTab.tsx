type ProjectTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function ProjectTab({
  label,
  isActive,
  onClick,
}: ProjectTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`h-fit w-fit rounded-full px-3 py-3 transition-all sm:px-5 sm:py-4 ${
        isActive
          ? 'border-replay-primary border bg-zinc-900/50'
          : 'border-transparent hover:bg-zinc-900/50'
      }`}
    >
      <span className="text-sm leading-5 font-medium tracking-tight text-white sm:text-lg">
        {label}
      </span>
    </button>
  );
}
