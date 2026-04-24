'use client';

import Button from '@/components/ui/Button';

export default function ContactSection() {
  return (
    <div className="mx-20 mt-10">
      <div className="flex flex-row gap-6">
        <article className="w-fill relative flex flex-col justify-end gap-10 rounded-2xl bg-zinc-900 bg-[url(/contactImage.png)] bg-cover bg-center bg-no-repeat px-20 pt-20 pb-10">
          <h1 className="z-10 text-5xl font-semibold tracking-tight text-white">
            Histórias que merecem replay
          </h1>
          <div className="z-10 flex flex-col gap-4 text-xl font-normal tracking-normal text-pretty text-zinc-300">
            <div>
              Desde 2007, a Replay combina o rigor técnico do audiovisual com a
              sensibilidade humana para criar conteúdos que conectam marcas e
              pessoas.
            </div>
            <div>
              Para nós, a produção técnica é apenas o ponto de partida. O que
              realmente nos move são as pessoas. É a parceria criativa, o olhar
              atento ao detalhe e a busca incessante pela trilha perfeita, pela
              luz certa e pela locução que emociona.
            </div>
            <div>
              Publicidade, institucional ou documental. Não importa o formato:
              se tem uma história, nós sabemos como contá-la.
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/90 via-black/35 to-transparent"></div>
        </article>
        <div className="flex w-auto flex-col gap-6">
          <div className="flex flex-col gap-6 rounded-2xl bg-zinc-900 p-10">
            <h2 className="text-4xl font-semibold text-white">
              Vamos tirar sua ideia do papel?
            </h2>
            <Button
              label="Vamos iniciar um projeto"
              onClick={() => {}}
              className="bg-zinc-50 text-xl text-zinc-950 hover:bg-zinc-100"
            />

            <div className="flex flex-col gap-2">
              <p className="text-xl font-normal text-zinc-400">
                ou envie um e-mail para:
              </p>
              <span className="text-2xl font-semibold text-white">
                contato@produtorareplay.com.br
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-2xl bg-zinc-900 p-10">
            <h2 className="text-4xl font-semibold text-white">Endereço</h2>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-normal text-nowrap text-zinc-400">
                R. Dr. Leopoldo Guimarães da Cunha, 760 - Oficinas
              </p>
              <p className="text-xl font-normal text-zinc-400">
                Ponta Grossa - PR
              </p>
              <p className="text-xl font-normal text-zinc-400">84035-310</p>
              <a
                href="/"
                className="text-xl font-normal text-zinc-400 decoration-1"
              >
                Ver no mapa
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
