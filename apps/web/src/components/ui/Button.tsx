type ButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
};

export default function Button({ label, className, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} h-fit w-fit rounded-full border-transparent px-5 py-4 leading-5 font-medium tracking-tight text-white transition-all *:text-lg hover:bg-zinc-900/50 focus:outline-2 focus:outline-offset-2 focus:outline-white`}
    >
      {label}
    </button>
  );
}
