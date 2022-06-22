import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Avvvatars from "avvvatars-react";
import NotFoundImg from "../public/404.jpeg";
import { connect } from "../utils/connection";
import { useEffect, useState } from "react";

function NotFound() {
  return (
    <Layout>
      <section className="relative flex flex-col items-center w-full gap-6 p-0 pb-24 overflow-hidden text-center bg-white lg:h-screen">
        <Image src={NotFoundImg} alt="404" className="rounded-3xl" />
        <p className="text-3xl font-bold">Where you dey go comrade?</p>

        <Link href="/">
          <a className="text-xl font-bold rounded-md bg-primary p-8 py-3 hover:brightness-75">
            <span className="text-gray-200">Go back to </span>
            <span className="text-white">Home</span>
          </a>
        </Link>
      </section>
    </Layout>
  );
}
export default NotFound;
