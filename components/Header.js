
import Link from 'next/link';
import Image from 'next/image';
import NavMenu from './NavMenu';
import { Fragment, useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
return (
    <header className="p-2 relative px-8 sm:px-24 bg-white flex items-center justify-between ">
     <Link href="/">
     <div className="cursor-pointer">
         <Image
            src="/logo.webp"
            width={50}
            height={50}
            alt="Comrade"
            />
     </div>
            </Link>
         
            <ul className="flex gap-3 items-center hidden">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <Link href="/getCertified">
            <button className="p-2 px-6 hidden sm:block rounded text-xl inline-block bg-primary font-body text-white">
                Get Certified
            </button>
            </Link>
            <button
            onClick={() => setIsOpen(!isOpen)}
             className="p-2 px-6 block sm:hidden text-xl inline-block bg-primary font-body text-white">
                .
            </button>
            { isOpen ? <NavMenu />:""}
    </header>
)}

export default Header