import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";

import Layout from "../components/Layout";
import Select from "../components/Select";
import Footer from "../components/Footer";

const grades = [
  { name: "First Class" },
  { name: "Second Class Upper" },
  { name: "Second Class Lower" },
  { name: "Pass" },
  { name: "Withdrawn" },
  { name: "Peace" },
];
const courses = [
    { name: "Pure and Applied Vawulence" },
    { name: "Vawulence & Communication" },
    { name: "Political Vawulence" },
    { name: "Industrial Vawulence" },
    { name: "Vawulence & Finance" },
    { name: "Vawulence Engineering" },
    { name: "International Vawulence" },
    { name: "Mass Vawulence" },
    { name: "Vawulence Studies" },
    { name: "Vawulence Education" },
    { name: "Advanced Vawulence" },
    { name: "Vawulence Arts" },
    { name: "Medical Vawulence" },

  ];

export default function GetCertified() {
  const [selectedGrades, setSelectedGrades] = useState(grades[0]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [name, setName] = useState("");
  return (
    <div className={styles.container}>
      <Layout>
        <section className="">
          <form>
            <label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Emeka Billions"
              />
            </label>
            <label>
              <Select list={grades} selected={selectedGrades} setSelected={setSelectedGrades} />
            </label>
            <label>
            <Select list={courses} selected={selectedCourse} setSelected={setSelectedCourse} />
            </label>
            <button>Get Certified</button>
          </form>
        </section>
      </Layout>

      <Footer />
    </div>
  );
}
