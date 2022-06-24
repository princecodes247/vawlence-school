import React, { ReactNode } from "react";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import Script from "next/script";

const variants = {
  hidden: { opacity: 0, x: 0, y: -5 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 10 },
};

const Layout = ({ children, title, description }) => (
  <div>
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title, description }}
    />
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      key="appBody"
      transition={{ type: "linear", default: { duration: 0.5 } }}
      className="
                    flex flex-col items-start w-full min-h-screen
                "
    >
      {children}
    </motion.main>
  </div>
);

export default Layout;
