import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <div className="hidden md:flex gap-2 items-center font-bold">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo with name"
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
          />
          <h2>DocSync</h2>
        </div>
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden w-[32px] h-[32px]"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
