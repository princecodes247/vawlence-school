
import Link from 'next/link';
import Image from 'next/image';
import NavMenu from './NavMenu';
import { Fragment, useState } from "react";
import Logo from "../public/logo.webp"
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
return (
    <header className="relative flex items-center justify-between p-2 px-8 bg-gray-100 sm:px-24 ">
     <Link href="/">
     <div className="cursor-pointer">
         <Image
            src={Logo}
            width={50}
            height={50}
            alt="Comrade"
            />
     </div>
            </Link>
         
            <ul className="flex items-center hidden gap-3">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <Link href="/getCertified">
            <button className="hidden inline-block p-2 px-6 text-xl text-white rounded sm:block bg-primary font-body">
                Get Certified
            </button>
            </Link>
            <button
            onClick={() => setIsOpen(!isOpen)}
             className="block inline-block p-2 px-6 text-xl text-white sm:hidden bg-primary font-body">
                .
            </button>
            { isOpen ? <NavMenu />:""}
    </header>
)}

export default Header