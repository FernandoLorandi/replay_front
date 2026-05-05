export default function FooterSection() {
  return (
    <div className="m-20 flex justify-between">
      <p className="font-base leading-6 text-zinc-400">
        Todos os direitos reservados Produtora Replay
      </p>
      <div className="flex items-center gap-2">
        <p className="font-base leading-6 text-zinc-400">Powered by</p>
        <img src="/footerLogo.svg" alt="Logo LojasMM" />
      </div>
    </div>
  );
}
