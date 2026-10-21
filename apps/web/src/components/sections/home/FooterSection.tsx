export default function FooterSection() {
  return (
    <footer className="my-4A mx-4 flex flex-col gap-4 border-t border-zinc-800 pt-6 text-sm sm:mx-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-base lg:mx-20 lg:my-20">
      <p className="text-center leading-6 text-zinc-400 md:text-left">
        Todos os direitos reservados Produtora Replay
      </p>
      <div className="flex items-center justify-center gap-2">
        <p className="leading-6 text-zinc-400">Powered by</p>
        <img src="/footerLogo.svg" alt="Logo LojasMM" className="h-5 w-auto" />
      </div>
    </footer>
  );
}
