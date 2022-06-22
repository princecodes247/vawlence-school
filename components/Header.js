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

      <div className="flex items-center gap-12">
        <ul className="hidden md:flex items-center gap-12">
          <li className="font-bold text-gray-800 hover:text-gray-500 cursor-pointer">
            Home
          </li>
          <a href="https://www.github.com/princecodes247">
            <li className="font-bold text-gray-800 hover:text-gray-500 cursor-pointer">
              My Github
            </li>
          </a>
          <a href="https://chat.whatsapp.com/Bifc4xrNAAh0TDZp57MTVH">
            <li className="font-bold text-gray-800 hover:text-gray-500 cursor-pointer">
              Join Group
            </li>
          </a>
        </ul>
        <Link href="/getCertified">
          <button className="hidden inline-block p-2 px-6 text-xl text-white rounded md:block bg-primary font-body hover:opacity-80">
            Get Certified
          </button>
        </Link>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`block inline-block p-2 px-6 text-xl md:hidden font-body ${
          !isOpen ? "text-primary" : "text-white bg-primary"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </button>
      {isOpen ? <NavMenu setIsOpen={setIsOpen} /> : ""}
    </header>
  );
};

export default Header;
