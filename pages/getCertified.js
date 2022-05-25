import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from 'react'


import Layout from "../components/Layout";
import Select from "../components/Select";
import Footer from "../components/Footer";

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

export default function GetCertified() {
    const [selected, setSelected] = useState(people[0])
    const [name, setName] = useState("")
  return (
    <div className={styles.container}>
   

      <Layout>
        <section className="">
          <form>
              <label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Emeka Billions"/>
                <Select />
              </label>
              
          </form>
        </section>
        
      </Layout>

      <Footer/>
    </div>
  );
}

