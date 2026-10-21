import Image from "next/image";

export default function LogoImg() {
  return (
    <Image 
      src='/logo.png' 
      height={80}
      width={80}
      alt="Logomarca produtora replay"
      loading='eager'/>
  );
}
