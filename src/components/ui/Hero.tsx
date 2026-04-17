import Image from 'next/image';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <div className="relative h-lvh w-lvw">
      <div className="absolute inset-x-0 top-8 z-10 px-20">
        <Navbar />
      </div>

      <div className="relative h-full w-full bg-zinc-950 p-8">
        <div className="relative h-full w-full bg-zinc-900 rounded-4xl overflow-hidden">
          <Image
            src="/continental.png"
            alt="Imagem de apoio"
            fill
            className="object-cover "
          />
        </div>
      </div>
    </div>
  );
}
