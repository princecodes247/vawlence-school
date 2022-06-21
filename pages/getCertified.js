import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";

import Layout from "../components/Layout";
import Select from "../components/Select";
import Footer from "../components/Footer";
import Popup from "../components/Popup";

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
  { name: "Vawulence & Law" },
  { name: "Vawulence & Science" },
  { name: "Bio-Vawulence" },
  { name: "Geo-Vawulence" },
  { name: "Enviromental Vawulence" },
  { name: "Marine Vawulence" },
  { name: "Vawutronics" },
];
export default function GetCertified() {
  // const [selectedGrades, setSelectedGrades] = useState(grades[0]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [secondCourses, setSecondCourses] = useState([...courses]);
  const [selectedSecondCourse, setSelectedSecondCourse] = useState(
    secondCourses[1]
  );
  const handleSetFirstChoice = (value) => {
    setSelectedCourse(value);
    // Remove value from second courses
    const newList = [...courses].filter((item) => item.name !== value.name);
    setSecondCourses(newList);
    setSelectedSecondCourse(newList[0]);
  };
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if name is empty
    if (name.trim() === "") {
      console.log("Name is empty");

      openPopup("Name is empty", "Please enter a valid name", "OK", true);
      return;
    }
    console.log(selectedCourse, selectedSecondCourse, name);
    setLoading(true);
    fetch("/api/comrades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        tag: name.toLowerCase(),
        choice: selectedCourse.name,
        secondChoice: selectedSecondCourse.name,
      }),
    }).then((res) => {
      console.log(res);
      setLoading(false);
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          // setComrades(data);
          openPopup(
            "Success",
            "You have graduated COMRADE!",
            "Zazu!",
            false,
            "/comrade/" + data.tag
          );
        });
      } else if (res.status === 500) {
        // console.log("Server error");
        openPopup();
      } else if (res.status === 409) {
        // console.log(res);
        // setComrades(data);
        openPopup(
          "Ah ah...",
          name + ", You have already graduated!",
          "Nawa...",
          true
        );
      }
    });
  };

  //   Open Popup Modal
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupDetails, setPopupDetails] = useState({
    title: "",
    message: "",
    buttonText: "",
  });
  const openPopup = (title, message, buttonText, error, target = "") => {
    let details = {
      title,
      message,
      buttonText,
      error,
      target,
    };
    setPopupDetails(details);
    setIsPopupOpen(true);
  };
  return (
    <Layout>
      <h2 className="text-center font-bold self-center text-2xl px-8 sm:px-0 sm:text-4xl">
        Vawulence Enrollment Form
      </h2>
      <section className="w-full flex item-center justify-center h-full pt-8 sm:pt-16">
        <form className="sm:w-2/5 sm:border sm:border-gray-300 rounded p-8 flex flex-col gap-2">
          <label className="">
            <p className="text-gray-600 text-sm">Your name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Emeka Billions"
              className="border border-gray-200 p-2 w-full rounded"
            />
          </label>
          <label className="">
            <p className="text-gray-600 text-sm">First choice of Study</p>
            <Select
              list={courses}
              selected={selectedCourse}
              setSelected={handleSetFirstChoice}
            />
          </label>
          <label className="">
            <p className="text-gray-600 text-sm">Second choice of Study</p>
            <Select
              list={secondCourses}
              selected={selectedSecondCourse}
              setSelected={setSelectedSecondCourse}
            />
            {/* <Select list={secondCourses} selected={selectedSecondCourse} setSelected={setSecondCourses} /> */}
          </label>
          <button
            className="mt-6 p-2 px-4 text-white rounded bg-primary"
            onClick={handleSubmit}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-4 h-4 border-t animate-spin duration-75 border-white rounded-full mr-5"></div>
                Loading...
              </span>
            ) : (
              "Get Certified"
            )}
          </button>
        </form>
        <Popup
          isOpen={isPopupOpen}
          setIsOpen={setIsPopupOpen}
          details={popupDetails}
        />
      </section>
    </Layout>
  );
}
