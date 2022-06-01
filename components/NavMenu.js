import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion'


const variants = {
    hidden: { opacity: 0, x: 0, y: -20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 20 },
}

const NavMenu = () => (
    <motion.div
            initial="hidden"
            animate="enter"
            exit={{ opacity: 0, x: 0, y: 20 }}
            variants={variants}
            transition={{ type: 'linear', default: { duration: 0.2 }, }}
            className="
                    flex absolute w-full top-full left-0 z-20 gap-8 flex-col items-center justify-between p-6 px-8 sm:px-24 bg-white shadow-md
                "
        >
        
      <Link href="/">
        <div className="cursor-pointer">
          <p className="font-bold text-gray-800 hover:text-gray-500">Home</p>
        </div>
      </Link>
      <a href="www.github.com/princecodes247">
        <div className="cursor-pointer">
          <p className="font-bold text-gray-800 hover:text-gray-500">My Github</p>
        </div>
      </a>
      
      <Link href="/getCertified">
        <button className="p-2 px-6 rounded text-xl inline-block bg-primary font-body text-white hover:opacity-80">
          Get Certified
        </button>
      </Link>
      </motion.div>
      
);

export default NavMenu;
