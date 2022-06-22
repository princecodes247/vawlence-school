import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Avvvatars from "avvvatars-react";
import heroImg from "../public/hero.svg";
import heroImg2 from "../public/hero2.jpeg";
import { connect } from "../utils/connection";
import { useEffect, useState } from "react";

function ComradeCard({ comrade }) {
  return (
    <div className="w-full p-4 sm:w-1/2" key={comrade._id}>
      <div className="flex flex-col p-4 rounded bg-gray-50">
        <div className="flex flex-row">
          <div className="">
            <Avvvatars value={comrade.name} size={50} />
          </div>
          <div className="flex flex-col flex-1 ml-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl capitalize">{comrade.name}</h3>
              <p className="text-sm">{comrade.gpa}</p>
            </div>
            <p className="text-sm italic">{comrade.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [comrades, setComrades] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // console.log(comrades);
  useEffect(() => {
    fetch("/api/comrades")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setComrades(res[0]);
        setCount(res[1]);
        setLoading(false);
      });
  }, []);
  return (
    <Layout>
      <section className="relative flex flex-col-reverse items-center w-full gap-6 p-0 pb-24 overflow-hidden text-center bg-white lg:flex-row lg:text-left lg:h-screen">
        <div className="relative z-10 flex flex-col items-center gap-6 px-12 lg:p-32 lg:px-24 lg:items-start">
          <h1 className="text-5xl font-bold lg:text-7xl font-header">
            Get your{" "}
            <span className="relative inline-block">
              vawulence
              <span className="absolute left-0 w-full h-full top-2/4">
                <Image src="/underline.svg" alt="underline" layout="fill" />
              </span>
            </span>{" "}
            certificate now
          </h1>
          <p className="text-center text-gray-600 text-md lg:text-2xl">
            Become a certified holder of vawulence today
          </p>

          <Link href="/getCertified">
            <button className="inline-block p-2 px-6 text-xl text-white rounded bg-primary font-body hover:opacity-80">
              Enroll here
            </button>
          </Link>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full text-gray-200 pointer-events-none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="block w-64 lg:w-96 lg:absolute lg:hidden -right-12">
          <Image src={heroImg} alt="hero" className="block lg:hidden" />
        </div>
        <div className="hidden w-64 lg:w-96 lg:absolute lg:block -right-12">
          <Image src={heroImg2} alt="hero" className="hidden lg:block" />
        </div>
      </section>
      <section className="flex flex-col items-center w-full p-4 py-6 bg-gray-200">
        <h2 className="text-2xl font-bold text-center">
          Current Holders of Vawulence
        </h2>
        {loading ? (
          <div className="text-center my-12 ">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full mb-8 sm:w-3/4 sm:flex-row-reverse sm:flex-wrap">
            {comrades.map((comrade) => (
              <ComradeCard key={comrade._id} comrade={comrade} />
            ))}
          </div>
        )}
        <p className="mb-12">And {count} other comrades</p>
        <Link href="/getCertified">
          <button className="inline-block p-2 px-6 text-xl text-white rounded bg-primary font-body hover:opacity-80">
            Enroll here
          </button>
        </Link>
      </section>
    </Layout>
  );
}

// export async function getStaticProps() {
//   // const res = await axios.get('/api/ip');
//   const { Comrade } = await connect();
//   // // console.log(s)
//   let comrades = await Comrade.find()
//     .sort([["date", -1]])
//     .limit(20) // get all comrades
//     .then((res) => {
//       // // console.log(res, "qwert");
//       // res.json(comrades);

//       return res.reverse();
//     }); // return comrades
//   let count = await Comrade.find().countDocuments();
//   // // console.log(comrades, "comrades")
//   // .catch((err) => console.log(err)); // catch errors
//   return {
//     props: {
//       comrades: JSON.parse(JSON.stringify(comrades)),
//       count,
//     },
//     revalidate: 20,
//   };
// }

// TODO: Create basic styling
// TODO: Fetch graduates from API

export default Home;
