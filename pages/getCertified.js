import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";

import Layout from "../components/Layout";
import Select from "../components/Select";
import Footer from "../components/Footer";
import Popup from '../components/Popup';

// const grades = [
//   { name: "First Class" },
//   { name: "Second Class Upper" },
//   { name: "Second Class Lower" },
//   { name: "Pass" },
//   { name: "Withdrawn" },
//   { name: "Peace" },
// ];
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
      // const [selectedGrades, setSelectedGrades] = useState(grades[0]);
      const [selectedCourse, setSelectedCourse] = useState(courses[0]);
      const [secondCourses, setSecondCourses] = useState([...courses]);
      const [selectedSecondCourse, setSelectedSecondCourse] = useState(secondCourses[0]);
      const handleSetFirstChoice = (value) => {
        setSelectedCourse(value)
        // Remove value from second courses
        const newList = [...courses].filter(item => item.name !== value.name)
        setSecondCourses(newList)
        setSelectedSecondCourse(newList[0])
      }
      const [name, setName] = useState("");

      const handleSubmit = e => {
        e.preventDefault();
        // Check if name is empty
        if (name.trim() === "") {
          console.log("Name is empty");
          openPopup();
          return;
        }
        console.log(selectedGrades, selectedCourse, name);
        openPopup();
      };

    //   Open Popup Modal
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupDetails, setPopupDetails] = useState({
        title: "",
        message: "",
        buttonText: "",
    });
    const openPopup = () => {
        let details = {
            title: "Text",
            message: "This is a drill",
            buttonText: "Okay",
        }
        setPopupDetails(details);
        setIsPopupOpen(true);
    };
  return (
    <div className=''>
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
            <Select list={courses} selected={selectedCourse} setSelected={handleSetFirstChoice} />
            </label>
            <label>
            <Select list={secondCourses} selected={selectedSecondCourse} setSelected={setSelectedSecondCourse} />
            {/* <Select list={secondCourses} selected={selectedSecondCourse} setSelected={setSecondCourses} /> */}
            </label>
            <button onClick={handleSubmit}>Get Certified</button>
          </form>
          <Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} details={popupDetails}/>
        </section>
      </Layout>

      <Footer />
    </div>
  );
}
