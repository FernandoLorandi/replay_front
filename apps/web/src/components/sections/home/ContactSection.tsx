'use client';

import Button from '@/components/ui/Button';

export default function ContactSection() {
  return (
    <section
      className="mx-4 mt-10 sm:mx-8 lg:mx-20"
      aria-labelledby="contact-title"
    >
      <div className="flex flex-col gap-6 xl:flex-row">
        <article className="relative min-h-112 flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 bg-[url(/contactImage.png)] bg-cover bg-center bg-no-repeat px-6 py-8 sm:px-10 sm:py-10 lg:px-20 lg:pt-20 lg:pb-10">
          <div className="relative z-10 flex h-full flex-col justify-end gap-10">
            <div className="max-w-3xl space-y-4">
              <h2
                id="contact-title"
                className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              >
                Histórias que merecem replay
              </h2>

              <div className="space-y-4 text-lg font-normal tracking-normal text-pretty text-zinc-300 sm:text-xl">
                <p>
                  Desde 2007, a Replay combina o rigor técnico do audiovisual
                  com a sensibilidade humana para criar conteúdos que conectam
                  marcas e pessoas.
                </p>
                <p>
                  Para nós, a produção técnica é apenas o ponto de partida. O
                  que realmente nos move são as pessoas. É a parceria criativa,
                  o olhar atento ao detalhe e a busca incessante pela trilha
                  perfeita, pela luz certa e pela locução que emociona.
                </p>
                <p>
                  Publicidade, institucional ou documental. Não importa o
                  formato: se tem uma história, nós sabemos como contá-la.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/90 via-black/35 to-transparent" />
        </article>

        <div className="flex w-full flex-col gap-6 xl:max-w-lg">
          <div
            className={
              'flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-10'
            }
          >
            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Vamos tirar sua ideia do papel?
            </h3>

            <Button
              label="Vamos iniciar um projeto"
              onClick={() => {}}
              className="w-full bg-zinc-50 text-lg text-zinc-950 hover:bg-zinc-100 sm:w-fit sm:text-xl"
            />

            <div className="flex flex-col gap-2">
              <p className="text-lg font-normal text-zinc-400 sm:text-xl">
                ou envie um e-mail para:
              </p>
              <span className="text-xl font-semibold break-all text-white sm:text-2xl">
                contato@produtorareplay.com.br
              </span>
            </div>
          </div>

          <address
            className={
              'rounded-2xl border border-zinc-800 bg-zinc-900 p-6 not-italic sm:p-10'
            }
          >
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Endereço
              </h3>

              <div className="space-y-2">
                <p className="text-lg font-normal text-zinc-400 sm:text-xl">
                  R. Dr. Leopoldo Guimarães da Cunha, 760 - Oficinas
                </p>
                <p className="text-lg font-normal text-zinc-400 sm:text-xl">
                  Ponta Grossa - PR
                </p>
                <p className="text-lg font-normal text-zinc-400 sm:text-xl">
                  84035-310
                </p>
                <a
                  href="/"
                  className="inline-flex text-lg font-normal text-zinc-400 underline decoration-1 underline-offset-4 transition-colors hover:text-zinc-200 sm:text-xl"
                >
                  Ver no mapa
                </a>
              </div>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
