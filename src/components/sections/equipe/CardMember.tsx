import Image from 'next/image';
import type { MemberProps } from '@/types/member';

export default function CardMember({
  src,
  alt,
  memberName,
  position,
}: MemberProps) {
  return (
    <div className="flex flex-col gap-6">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="rounded-lg bg-zinc-800"
      ></Image>
      <div>
        <h4 className="text-3xl leading-8 font-medium tracking-tighter text-zinc-300">
          {memberName}
        </h4>
        <p className="text-base leading-6 font-normal tracking-normal text-zinc-400">
          {position}
        </p>
      </div>
    </div>
  );
}
