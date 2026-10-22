import Image from 'next/image';
import type { TeamMember } from '@/types/member';

export default function CardMember({
  src,
  alt,
  memberName,
  position,
}: TeamMember) {
  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="h-auto w-full rounded-lg bg-zinc-800"
      ></Image>
      <div>
        <h4 className="text-2xl leading-7 font-medium tracking-tighter text-zinc-300 sm:text-3xl sm:leading-8">
          {memberName}
        </h4>
        <p className="text-sm leading-6 font-normal tracking-normal text-zinc-400 sm:text-base">
          {position}
        </p>
      </div>
    </div>
  );
}
