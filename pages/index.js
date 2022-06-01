import Head from "next/head";
import Image from "next/image";
import Link from "next/link"
import styles from "../styles/Home.module.css";
import Header from '../components/Header'
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Avvvatars from 'avvvatars-react'
import heroImg from "../public/hero.svg";
import heroImg2 from "../public/hero2.jpeg";
import { connect } from "../utils/connection";

function ComradeCard({ comrade }) {
  return (<div className="w-full sm:w-1/2 p-4" key={comrade._id}>
  <div className="flex flex-col bg-gray-50 rounded p-4">
    <div className="flex flex-row">
    <div className="">
    <Avvvatars value={comrade.name} size={50} />
    </div>
      <div className="flex flex-col ml-4">
        <div className="flex justify-between items-center">
        <h3 className="text-xl capitalize">{comrade.name}</h3>
        <p className="text-sm">{comrade.gpa}</p>
        </div>
        <p className="text-sm italic">{comrade.department}</p>
      </div>
    </div>
  </div>
</div>
)
}

function Home({comrades}) {
  console.log(comrades)
  return (
   
      <Layout>
        <section className="p-0 overflow-hidden flex flex-col-reverse lg:flex-row bg-white items-center gap-6 text-center lg:text-left  w-full lg:h-screen relative pb-24">
        <div className="flex px-12 lg:p-32 lg:px-24 flex-col items-center lg:items-start gap-6 relative z-10">
        <h1 className="text-5xl lg:text-7xl font-header font-bold">Get your  {" "}
        <span className="relative inline-block">
        vawulence
        <span className="absolute top-2/4 w-full h-full left-0">
        <Image
          src="/underline.svg"
          alt="underline"
          layout="fill"
          />
        </span>
        </span>
        {" "}
         certificate now</h1>
          <p className="text-md text-gray-600 text-center lg:text-2xl">Become a certified holder of vawulence today</p>

          <Link href="/getCertified">
          <button className="p-2 px-6 rounded text-xl inline-block bg-primary font-body text-white hover:opacity-80">
            Enroll here
            </button>
            </Link>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute bottom-0 w-full text-gray-100" viewBox="0 0 1440 320"><path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
       <div className=" w-64 lg:w-96 lg:absolute block lg:hidden -right-12">
       <Image
        src={heroImg}
        alt="hero"
        className="block lg:hidden"
        />
        </div>
        <div className=" w-64 lg:w-96 lg:absolute hidden lg:block -right-12">
        <Image
        src={heroImg2}
        alt="hero"
        className="hidden lg:block"
        />
       </div>
        </section>
        <section className="flex bg-gray-100 flex-col items-center w-full p-4 py-6">
          <h2 className="text-2xl text-center font-bold">Current Holders of Vawulence</h2>
          <div className="flex flex-col w-full mb-8 sm:w-3/4 items-center sm:flex-row-reverse sm:flex-wrap">
            {comrades.map((comrade) => (
            <ComradeCard key={comrade.id} comrade={comrade} />
            ))}
          </div>
                      
          <Link href="/getCertified">
          <button className="p-2 px-6 rounded text-xl inline-block bg-primary font-body text-white hover:opacity-80">Enroll here</button>
            </Link>
        </section>
      </Layout>
  );
}

export async function getStaticProps() {
  // const res = await axios.get('/api/ip');
  const { Comrade } = await connect();
  // console.log(s)
  const comrades = await Comrade.find() // get all comrades
        .then((res) => {
          console.log(res, "qwert")
          // res.json(comrades);
          return res;
        }) // return comrades
        console.log(comrades, "comrades")
        // .catch((err) => console.log(err)); // catch errors
  return {

    props: {
      comrades: JSON.parse(JSON.stringify(comrades))
    },
    revalidate: 20,
  };
};


// TODO: Create basic styling
// TODO: Fetch graduates from API

export default Home;