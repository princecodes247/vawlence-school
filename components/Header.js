import Link from "next/link";
import Image from "next/image";
import NavMenu from "./NavMenu";
import { Fragment, useState } from "react";
import Logo from "../public/logo.webp";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="relative flex items-center justify-between p-2 px-8 bg-gray-100 sm:px-24 ">
      <Link href="/">
        <div className="cursor-pointer">
          <Image src={Logo} width={50} height={50} alt="Comrade" />
        </div>
      </Link>

      <ul className="hidden md:flex items-center gap-3">
        <li className="font-bold text-gray-800 hover:text-gray-500 cursor-pointer">
          Home
        </li>
        <li className="font-bold text-gray-800 hover:text-gray-500 cursor-pointer">
          My Github
        </li>
        <li className="font-bold text-gray-800 hover:text-gray-500 cursor-pointer">
          Contact
        </li>
      </ul>
      <Link href="/getCertified">
        <button className="hidden inline-block p-2 px-6 text-xl text-white rounded md:block bg-primary font-body hover:opacity-80">
          Get Certified
        </button>
      </Link>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block inline-block p-2 px-6 text-xl text-white md:hidden bg-primary font-body"
      >
        .
      </button>
      {isOpen ? <NavMenu setIsOpen={setIsOpen} /> : ""}
    </header>
  );
};

export default Header;
